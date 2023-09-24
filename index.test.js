const { testExecute } = require('./index.js');

describe('testExecute', () => {
    test('should reject', async () => {
        await expect(testExecute(10)).rejects.toBe(10);
    });
    test('should resolve', async () => {
        await expect(testExecute(11)).resolves.toBe(11);
    });
});
