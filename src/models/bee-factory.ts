import { Bee } from "./bee";
import { BeeType } from "./bee-type";
import { BEE_ATTRIBUTES } from "./bee-attributes";

export class BeeFactory {
    static createBee(type: BeeType): Bee {
        const attributes = BEE_ATTRIBUTES[type];
        return new Bee(type, attributes.health, attributes.damage);
    }
}