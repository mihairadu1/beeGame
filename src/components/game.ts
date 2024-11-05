import { LocalStorageManager } from "../utils/localstorage-manager";
import { Swarm } from "../models/swarm";
import { eventEmitter } from "../utils/event-emitter";

class Game {
    private swarm: Swarm;

    constructor() {
        const savedSwarmData = LocalStorageManager.load("swarmData");
        if (savedSwarmData) {
            this.swarm = new Swarm(savedSwarmData);
        } else {
            this.swarm = new Swarm();
        }
        this.bindEvents();
        this.updateHiveHealth();
        this.updateAliveBeesList();
    }

    private bindEvents() {
        document.getElementById("action-button")?.addEventListener("click", () => this.hitBee());
        document.getElementById("reset-button")?.addEventListener("click", () => this.resetGame());
    }

    private hitBee() {
        const bee = this.swarm.getRandomBee();
        if (bee) {
            bee.takeDamage(bee.damage);
            eventEmitter.emit("beeHit", bee);
            this.updateHiveHealth();
            this.updateAliveBeesList();
            this.checkGameOver();

            this.saveGameState();
            
        } else {
            alert("No alive bees left to hit!");
        }
    }

    private resetGame() {

        this.swarm = new Swarm();
        this.updateHiveHealth();
        this.updateAliveBeesList();
        eventEmitter.emit("gameReset");
        LocalStorageManager.remove("swarmData");
    
    }

    private updateHiveHealth() {
        const currentHealth = this.swarm.getCurrentHealth();
        const initialHealth = this.swarm.getInitialHealth();
        const healthPercentage = (currentHealth / initialHealth) * 100;
        eventEmitter.emit("updateHiveHealth", { currentHealth, initialHealth, healthPercentage });
    }

    private updateAliveBeesList() {
        const aliveBees = this.swarm.getAliveBee();
        eventEmitter.emit("updateAliveBeesList", aliveBees);
    }

    private checkGameOver() {
        if (this.swarm.allBeesDead()) {
            eventEmitter.emit("gameOver", { message: "All bees are dead!" });
        }
    }

    private saveGameState() {
        const swarmData = {
            bees: this.swarm.getSwarmData(),
            currentHealth: this.swarm.getCurrentHealth(),
            initialHealth: this.swarm.getInitialHealth(),
        };
        LocalStorageManager.save("swarmData", swarmData);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new Game();
});