import flow from "./flow";
import throttledFlow from "./throttled-flow";

describe('throttled flow promise', () => {
    const chainOne = jest.fn(() => true);
    const chainTwo = jest.fn(() => true);

    const chainPromiseOne = new Promise((resolve, reject) => (resolve(chainOne())));
    const chainPromiseTwo = new Promise((resolve, reject) => (resolve(chainTwo())));

    let time: number;

    beforeEach(() => {
        time = new Date().getTime();
    });

    it('promises should execute sequentially', async () => {
        await expect(throttledFlow(200, chainPromiseOne, chainPromiseTwo)).resolves.toStrictEqual([true, true]);
    });

    it('should take the correct amount of time', async () => {
        await expect(throttledFlow(200, chainPromiseOne, chainPromiseTwo)).resolves.toStrictEqual([true, true]);

        const timeTaken = new Date().getTime() - time;

        expect(timeTaken).toBeGreaterThanOrEqual(200);
    });

});