import flow from "./flow";

describe('flow promise', () => {
    const chainOne = jest.fn(() => true);
    const chainTwo = jest.fn(() => true);

    const chainPromiseOne = new Promise((resolve, reject) => (resolve(chainOne())));
    const chainPromiseTwo = new Promise((resolve, reject) => (resolve(chainTwo())));

    it('promises should execute sequentially', async () => {
        await expect(flow(chainPromiseOne, chainPromiseTwo)).resolves.toStrictEqual([true, true]);
    });

});