import { BeeType } from "./bee-type";

export class Bee {
    constructor(
        public type: BeeType, 
        public health: number, 
        public damage: number
    ) {}

    takeDamage(amount: number) {
        this.health -= amount;
        if (this.health < 0) {
            this.health = 0;
        }
    }

    isAlive(): boolean {
        return this.health > 0;
    }
}