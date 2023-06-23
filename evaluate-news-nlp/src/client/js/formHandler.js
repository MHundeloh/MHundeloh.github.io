import { prepareData, prepareTableRow } from "./prepareData";

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


/* Update UI  */
const updateUI = async (formText, formUrl) => {
    const results = document.querySelector('#results');
    results.innerHTML = '';
    try {
        const request = await postData('http://localhost:8080/analyze', {'text':formText, 'url':formUrl});
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

    // check what text or URL was put into the form field
    let formText = document.getElementById('input_text').value;
    let formUrl = document.getElementById('input_url').value;
    if (formText === '' && formUrl === '') {
        alert("At least the text field or the url field should not be empty")
    }
    updateUI(formText, formUrl)
}

export { handleSubmit }
