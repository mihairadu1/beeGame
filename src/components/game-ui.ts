import { eventEmitter } from "../utils/event-emitter";
import { Bee } from "../models/bee";
import { BeeType } from "../models/bee-type";
import { LocalStorageManager } from "../utils/localstorage-manager";

class GameUi {
    constructor() {
        this.bindEvents();

    }

    private bindEvents() {
        eventEmitter.on("beeHit", (bee: Bee) => this.updateBeeInfo(bee));
        eventEmitter.on("gameReset", () => this.resetGameUI());
        eventEmitter.on("gameOver", (data: { message: string }) => this.showGameOver(data.message));
        eventEmitter.on("updateHiveHealth", (data: { currentHealth: number; initialHealth: number; healthPercentage: number }) => this.updateHiveHealthUI(data));
        eventEmitter.on("updateAliveBeesList", (aliveBees: Bee[]) => this.updateAliveBeesListUI(aliveBees));
        this.initializeUI();
    }

    private initializeUI() {

        const playerName = LocalStorageManager.load("playerName") || "Unknown Player";
        this.updatePlayerNameUI(playerName);


        const swarmData = LocalStorageManager.load("swarmData");
        if (swarmData) {
            const currentHealth = swarmData.currentHealth;
            const initialHealth = swarmData.initialHealth;
            const healthPercentage = (currentHealth / initialHealth) * 100;
            this.updateHiveHealthUI({ currentHealth, initialHealth, healthPercentage });
            this.updateAliveBeesListUI(swarmData.bees);
        }
    }


    private updatePlayerNameUI(playerName: string) {
        const playerNameElement = document.getElementById('player-name-value') as HTMLElement;
        playerNameElement.textContent = playerName;
    }

    private updateBeeInfo(bee: Bee) {
        const beeInfoWrapper = document.getElementById('bee-info-wrapper') as HTMLElement; // Get the wrapper
        const welcomeMessageElement = document.getElementById('welcome-message') as HTMLElement;
        welcomeMessageElement.style.display = 'none';
        beeInfoWrapper.style.display = 'block';

        const beeTypeElement = document.getElementById('bee-type') as HTMLElement;
        const beeHealthElement = document.getElementById('bee-health') as HTMLElement;
        const beeDamageElement = document.getElementById('bee-damage') as HTMLElement;
        const beeImgElement = document.getElementById('bee-img') as HTMLImageElement;

        beeTypeElement.textContent = `Bee Type: ${bee.type}`;
        beeHealthElement.textContent = `Health: ${bee.health} HP`;
        beeDamageElement.textContent = `Damage: -${bee.damage} HP`;

        switch (bee.type) {
            case BeeType.Queen:
                beeImgElement.src = 'assets/queen.svg';
                break;
            case BeeType.Worker:
                beeImgElement.src = 'assets/worker.svg';
                break;
            case BeeType.Drone:
                beeImgElement.src = 'assets/drone.svg';
                break;
            default:
                beeImgElement.src = "";
        }

        beeImgElement.alt = `${bee.type} Image`;
    }

    private resetGameUI() {
        const beeInfoWrapper = document.getElementById('bee-info-wrapper') as HTMLElement;
        const welcomeMessageElement = document.getElementById('welcome-message') as HTMLElement;

        welcomeMessageElement.style.display = 'block';
        beeInfoWrapper.style.display = 'none';

        const beeTypeElement = document.getElementById('bee-type') as HTMLElement;
        const beeHealthElement = document.getElementById('bee-health') as HTMLElement;
        const beeDamageElement = document.getElementById('bee-damage') as HTMLElement;
        const beeImgElement = document.getElementById('bee-img') as HTMLImageElement;

        beeTypeElement.textContent = "Bee Type: -";
        beeHealthElement.textContent = "Health: -";
        beeDamageElement.textContent = "Damage: -";
        beeImgElement.src = "";
    }

    private showGameOver(message: string) {
        alert(message);
        this.resetGameUI();
    }

    private updateHiveHealthUI({ currentHealth, initialHealth, healthPercentage }: { currentHealth: number; initialHealth: number; healthPercentage: number }) {
        const hiveHealthLabel = document.getElementById('hive-health-label') as HTMLElement;
        const hiveHealthBar = document.getElementById('hive-health-bar') as HTMLElement;

        hiveHealthLabel.textContent = `Hive Health: ${healthPercentage.toFixed(0)}%`;
        hiveHealthBar.style.height = `${healthPercentage}%`;
    }

    private updateAliveBeesListUI(aliveBees: Bee[]) {
        const aliveBeesCount: { [key: string]: number } = {};

        aliveBees.forEach((bee) => {
            if (aliveBeesCount[bee.type]) {
                aliveBeesCount[bee.type]++;
            } else {
                aliveBeesCount[bee.type] = 1;
            }
        });

        const summary = Object.entries(aliveBeesCount)
            .map(([type, count]) => `${count} ${type}${count > 1 ? 's' : ''}`)
            .join(', ');

        const aliveBeesList = document.getElementById('alive-bees-list') as HTMLElement;
        aliveBeesList.textContent = summary;
    
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new GameUi();
});
