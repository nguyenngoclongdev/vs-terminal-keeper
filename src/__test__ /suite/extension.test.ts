import { skip } from 'node:test';

suite('Extension Test Suite', () => {
    test.skip(`test`, async () => {
        skip;
    });
});