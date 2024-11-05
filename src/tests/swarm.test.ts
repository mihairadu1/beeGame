import { Swarm } from '../models/swarm';

describe('Swarm Class', () => {
    let swarm: Swarm;

    beforeEach(() => {
        swarm = new Swarm();
    });

    it('should initialize with the correct number of bees', () => {
        expect(swarm.bees.length).toBe(14);
    });

    it('should return a random alive bee', () => {
        const bee = swarm.getRandomBee();
        expect(bee).not.toBeNull();
        expect(bee?.isAlive()).toBe(true);
    });

    it('should consider all bees dead if the Queen dies', () => {
        const queen = swarm.bees.find(b => b.type === 'Queen');
        if (queen) queen.takeDamage(queen.health);
        expect(swarm.isQueenAlive()).toBe(false);
        expect(swarm.allBeesDead()).toBe(true);
    });

    it('should calculate total health of the swarm', () => {
        const totalHealth = swarm.calculateTotalHealth();
        const expectedHealth = swarm.getAliveBee().reduce((total, bee) => total + bee.health, 0);
        expect(totalHealth).toBe(expectedHealth);
    });

    it('should reduce total health when bees take damage', () => {
        const initialHealth = swarm.calculateTotalHealth();
        const bee = swarm.getAliveBee()[0];
        bee.takeDamage(20);
        const newHealth = swarm.calculateTotalHealth();
        expect(newHealth).toBeLessThan(initialHealth);
    });
    
});
