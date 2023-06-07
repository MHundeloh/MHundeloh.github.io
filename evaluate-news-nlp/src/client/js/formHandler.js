// async postData function
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
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
const updateUI = async (formText) => {
    const results = document.querySelector('#results');

    const request = await postData('http://localhost:8080/analyze', {formText})
        .then(res => res.json())
        .then(function(res) {
            console.log('Response from analyze', JSON.stringify(res))
            return res.message;
        });
    try {
        const allData = await request;
        if (allData !== undefined) {
            results.innerHTML = JSON.stringify(allData);
        } else {
            results.innerHTML = 'Nothing here!';
        }
    } catch(error) {
        console.log('Error', error);
    }
}


function handleSubmit(event) {
    event.preventDefault()

    console.log("::: Form Submitted :::")

    // check what text was put into the form field
    let formText = document.getElementById('input_text').value
    console.log(formText)
    updateUI(formText)
    // postData('http://localhost:8080/analyze', {formText})
    //     .then(res => res.json())
    //     .then(function(res) {
    //         document.getElementById('results').innerHTML = JSON.stringify(res.message)
    //     })
}

export { handleSubmit }
