import delayedFlow from "./delayed-flow";
import flow from "./flow";

describe('delayed flow promise', () => {
    const chainOne = jest.fn(() => true);
    const chainTwo = jest.fn(() => true);

    const chainPromiseOne = new Promise((resolve, reject) => (resolve(chainOne())));
    const chainPromiseTwo = new Promise((resolve, reject) => (resolve(chainTwo())));
    const chainPromiseThree = new Promise((resolve, reject) => (resolve(chainTwo())));

    it('promises should execute and be delayed', async () => {
        const then = new Date().getTime();

        await expect(delayedFlow(100, chainPromiseOne, chainPromiseTwo, chainPromiseThree)).resolves.toStrictEqual([true, true, true]);

        const now = new Date().getTime();

        expect(now - then).toBeGreaterThanOrEqual(300);
    });

});