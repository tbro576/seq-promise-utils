import delay from "./delay";

describe('delay promise', () => { 

    it('promises should be delayed', async () => {
        const then = new Date().getTime();

        await expect(delay(Promise.resolve(true), 500)).resolves.toBe(true);

        const now = new Date().getTime(); 

        expect(now - then).toBeGreaterThanOrEqual(500);
    });

});