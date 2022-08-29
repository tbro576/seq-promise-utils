const flow = async <T>(...promises: (Promise<T> | (() => Promise<T>))[]) => {
    const result: any[] = [];

    return promises.reduce<Promise<T | null>>((chain, promise) => {
        chain = chain.then(value => {
            result.push(value);

            if (typeof promise === 'function') {
                return promise();
            }

            return promise;
        }).catch(error => {
            result.push(error);

            if (typeof promise === 'function') {
                return promise();
            }

            return promise;
        });

        return chain;
    }, new Promise((resolve, reject) => resolve(null))).then(value => [...result.slice(1), value]);
};

export default flow;