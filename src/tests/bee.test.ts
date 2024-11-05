import { Bee } from '../models/bee';
import { BeeType } from '../models/bee-type';

describe('Bee Class', () => {
    it('should initialize with correct health and type', () => {
        const queenBee = new Bee(BeeType.Queen, 100, 8);
        expect(queenBee.health).toBe(100);
        expect(queenBee.type).toBe(BeeType.Queen);
    });

    it('should take damage and reduce health', () => {
        const droneBee = new Bee(BeeType.Drone, 50, 12);
        droneBee.takeDamage(12);
        expect(droneBee.health).toBe(38);
    });

    it('should die when health reaches zero', () => {
        const workerBee = new Bee(BeeType.Worker, 10, 10);
        workerBee.takeDamage(10);
        expect(workerBee.isAlive()).toBe(false);
    });
    
});
