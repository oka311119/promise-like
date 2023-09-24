const myPromise = require('./promise')

function samplePromise(num) {
    return new myPromise((resolve, reject) => {
        if (num > 10) {
            resolve(num)
        } else {
            reject(num)
        }
    })
}

function testExecute(num) {
    return samplePromise(num)
}

module.exports = { testExecute }