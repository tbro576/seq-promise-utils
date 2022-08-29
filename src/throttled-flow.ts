import delay from "./delay";
import flow from "./flow";

const throttledFlow = async <T>(minMsBetween: number = 500, ...promises: Promise<T>[]) => {
    let startTime: number;

    const wrapPromise = async (promise: Promise<T>) => {
        const now = new Date().getTime();

        if (!startTime) {
            startTime = now;

            return promise;
        }

        const difference = minMsBetween - (now - startTime);

        if (difference > 0) {
            startTime += difference;

            return delay<T>(promise, difference);
        }

        startTime = now;

        return promise;
    };

    return flow(
        ...promises.map(wrapPromise)
    );
};

export default throttledFlow;
