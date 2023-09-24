class myPromise {
    constructor(executor) {
        this.callbacks = []
        this.errorCallbacks = []
        this.state = 'pending'

        const resolve = (value) => {
            if (this.state !== 'pending') return;
            this.state = 'fulfilled';
            this.value = value;
            this.callbacks.forEach(cb => cb(value));
            this.callbacks = []
        }

        const reject = (error) => {
            if (this.state !== 'pending') return;
            this.state = 'rejected';
            this.error = error;
            this.errorCallbacks.forEach(cb => cb(error));
            this.errorCallbacks = []
        }

        try {
            executor(resolve, reject)
        } catch (err) {
            reject(err)
        }
    }

    then(callback) {
        return new myPromise((resolve, reject) => {
            if (this.state === 'fulfilled') {
                try {
                    const result = callback(this.value);
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            } else if (this.state === 'pending') {
                this.callbacks.push((value) => {
                    try {
                        const result = callback(value);
                        resolve(result);
                    } catch (error) {
                        reject(error);
                    }
                });
            } else {
                resolve(this.value); // Pass on the value if rejected, to be caught in subsequent `.catch()`
            }
        });
    }

    catch(errorCallback) {
        return new myPromise((resolve, reject) => {
            if (this.state === 'rejected') {
                try {
                    errorCallback(this.error);
                    resolve(); // Typically, a `.catch()` will resolve unless you throw in it
                } catch (error) {
                    reject(error);
                }
            } else if (this.state === 'pending') {
                this.errorCallbacks.push((error) => {
                    try {
                        errorCallback(error);
                        resolve();
                    } catch (err) {
                        reject(err);
                    }
                });
            } else {
                resolve(this.value); // Pass on the value if resolved
            }
        });
    }
}

module.exports = myPromise
