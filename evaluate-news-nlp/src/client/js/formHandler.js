// async postData function
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try {
        return await response;
    } catch(error) {
        console.log('Error', error);
    }
}

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

    let table = document.createElement('table');
    if (data.sentence_list !== undefined) {
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
    }
    return table;
}

/* Update UI  */
const updateUI = async (formText) => {
    const results = document.querySelector('#results');
    results.innerHTML = '';
    try {
        const request = await postData('http://localhost:8080/analyze', {formText});
        const data = await request.json();
        if (data !== undefined) {
            results.appendChild(prepareData(data));
        } else {
            results.innerHTML = 'Nothing here!';
        }
    } catch(error) {
        console.log('Error', error);
    }
}

function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('input_text').value
    updateUI(formText)
}

export { handleSubmit }
