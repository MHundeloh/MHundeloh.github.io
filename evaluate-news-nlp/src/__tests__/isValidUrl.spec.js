import { isValidUrl } from '../client/js/isValidUrl';

describe("Testing url validation functionality", () => {
    test("Check if url is valid", () => {
        const url = 'https://any.address.com';
        const isValid = isValidUrl(url);
        expect(isValid).toBe(true);
    });
    test("Check if url is invalid", () => {
        const url = 'undefined';
        const isValid = isValidUrl(url);
        expect(isValid).toBe(false);
    });
})