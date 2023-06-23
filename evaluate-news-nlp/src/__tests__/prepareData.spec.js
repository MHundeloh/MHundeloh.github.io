/**
 * @jest-environment jsdom
 */

import { prepareData, prepareTableRow } from "../client/js/prepareData";

describe("Testing data preparation functionality", () => {
    test("Testing the prepareData() function to be defined", () => {
        expect(prepareData).toBeDefined();
    });
    test("Testing the prepareData function", () => {
        const data = prepareData();
        expect(data.nodeName).toBe('TABLE');
    });
    test("Testing the prepareTableRow function", () => {
        const data = prepareTableRow('tr', 'td', ['test']);
        expect(data.nodeName).toBe('TR');
        expect(data.innerHTML).toBe('<td>test</td>');
    })
})