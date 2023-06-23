// prepare table row element
const prepareTableRow = (rowTag, cellTag, data) => {
    let row = document.createElement(rowTag);
    for (const element of data) {
        let cell = document.createElement(cellTag);
        cell.innerHTML = element;
        row.appendChild(cell);
    }
    return row;

}

// prepare data for UI
const prepareData = (data) => {

    console.log(data);
    let table = document.createElement('table');
    if (data !== undefined && data.sentence_list !== undefined) {
        let table_head = document.createElement('thead');
        let head_row = prepareTableRow('tr', 'th', ['Level', 'Text', 'Score tag', 'Agreement', 'Confidence']);
        table_head.appendChild(head_row);
        table.appendChild(table_head);
        let table_body = document.createElement('tbody');
        let first_row = prepareTableRow('tr', 'td', ['Global', data.irony, data.score_tag, data.agreement, data.confidence])
        table_body.appendChild(first_row);
        for (const sentence of data.sentence_list) {
            let table_row = prepareTableRow('tr', 'td', ['Sentence', sentence.text, sentence.score_tag, sentence.agreement, sentence.confidence])
            table_body.appendChild(table_row);
            for (const segment of sentence.segment_list) {
                let table_row = prepareTableRow('tr', 'td', ['Segment', segment.text, segment.score_tag, segment.agreement, segment.confidence])
                table_body.appendChild(table_row)
            }
        }
        table.appendChild(table_body)
    } else {
        let table_body = document.createElement('tbody');
        let table_row = prepareTableRow('tr', 'td', ['nothing found to analyze']);
        table_body.appendChild(table_row);
        table.appendChild(table_body);
        console.log(data);
    }
    return table;
}

export {
    prepareData,
    prepareTableRow
}