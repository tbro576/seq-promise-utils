import delay from "./delay";
import flow from "./flow";

const delayedFlow = async <T>(delayMs: number, ...promises: Promise<T>[]) => {
    return flow(
        ...promises.map(promise => () => delay<T>(promise, delayMs))
    );
};

export default delayedFlow;
