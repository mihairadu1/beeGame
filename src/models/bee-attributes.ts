import { BeeType } from "./bee-type";

export type BeeAttributes = {
    health: number;
    damage: number;
};

export const BEE_ATTRIBUTES: { [type: string]: BeeAttributes } = {
    [BeeType.Queen]: { health: 100, damage: 8 },
    [BeeType.Worker]: { health: 75, damage: 10 },
    [BeeType.Drone]: { health: 50, damage: 12 },
};