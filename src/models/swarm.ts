import { Bee } from "./bee";
import { BeeFactory } from "./bee-factory";
import { BeeType } from "./bee-type";

export class Swarm {
    bees: Bee[] = [];
    private initialHealth: number;

    constructor(loadedBeesData?: { type: BeeType; health: number; damage: number }[]) {
        
        this.bees = loadedBeesData && loadedBeesData.length > 0
            ? loadedBeesData.map(beeData => new Bee(beeData.type, beeData.health, beeData.damage))
            : this.initBees();

            this.initialHealth = this.calculateTotalHealth();
    }

    initBees(): Bee[] {
        return [
            BeeFactory.createBee(BeeType.Queen),
            ...Array.from({ length: 5 }, () => BeeFactory.createBee(BeeType.Worker)),
            ...Array.from({ length: 8 }, () => BeeFactory.createBee(BeeType.Drone)),
        ];
    }

    getInitialHealth(): number {
        return this.initialHealth;
    }

    calculateTotalHealth(): number {
        return this.bees.reduce((sum, bee) => sum + bee.health, 0);
    }

    getCurrentHealth(): number {
        return this.bees.reduce((sum, bee) => sum + (bee.isAlive() ? bee.health : 0), 0);
    }

    getRandomBee(): Bee | null {
        
        const aliveBees = this.bees.filter(bee => bee.isAlive());
        if(aliveBees.length === 0) {
            return null
        } else {
            const randomIndex = Math.floor(Math.random() * aliveBees.length);
            return aliveBees[randomIndex];
        }
    }

    allBeesDead(): boolean {
        if (!this.isQueenAlive()) {
            return true;
        }
        return this.bees.every(bee => !bee.isAlive());
    }

    isQueenAlive(): boolean {
        return this.bees.some(bee => bee.type === BeeType.Queen && bee.isAlive());
    }

    getAliveBee(): Bee[] {
        return this.bees.filter(bee => bee.isAlive());
    }

    getSwarmData(): { type: BeeType; health: number; damage: number }[] {
        return this.bees.map(bee => ({ type: bee.type, health: bee.health, damage: bee.damage }));
    }
}