/**
 * @jest-environment jsdom
 */
import { performAction, updateUI, getTextDiv } from "../client/js/application";


describe("Testing application functionality", () => {
    test("Testing the performAction() function", () => {
        expect(performAction).toBeDefined();
    })
})

describe("Testing application functionality", () => {
    test("Testing the updateUI function", () => {
        expect(updateUI).toBeDefined();
    })
})

describe("Testing application functionality", () => {
    test("Testing the getTextDiv function", () => {
        expect(getTextDiv('foo bar')).not.toBeNull();
    })
})