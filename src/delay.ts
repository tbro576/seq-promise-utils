const delay = async <T>(promise: Promise<T>, delayMs: number) => {
    return new Promise<T>((resolve, reject) => {
        setTimeout(async () => {
            try {
                resolve((await promise));
            } catch (error) {
                reject(error);
            }
        }, delayMs);
    });
};

export default delay;
