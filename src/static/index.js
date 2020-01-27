window.addEventListener('DOMContentLoaded', () => {
    const requestElem = document.createElement('div');
    requestElem.classList.add('request');

    const responseElem = document.createElement('div');
    responseElem.classList.add('response');

    const responseValue = document.createElement('div');
    responseValue.classList.add('response__value');

    const form = document.querySelector('.form');
    const output = document.querySelector('.output');
    const input = document.querySelector('.input');
    const submit = document.querySelector('.submit');

    function doRequest(value, ignoreEmptyValue = false) {
        if (!ignoreEmptyValue && !value) {
            return;
        }

        if (value) {
            const reqElem = requestElem.cloneNode(true);
            reqElem.innerText = value;
            input.value = '';

            output.appendChild(reqElem);
        }

        output.classList.add('loading');

        fetch('/rest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                version: '1',
                session: '1',
                request: {
                    command: value.toLowerCase().replace(/[^A-Za-zА-Яа-яёЁ !.,]/ig, ''),
                    original_utterance: value
                }
            })
        })
            .then(e => e.json())
            .then(res => {
                output.classList.remove('loading');

                const respElem = responseElem.cloneNode(true);
                const respValue = responseValue.cloneNode(true);

                respValue.innerText = res.response.text;
                respElem.appendChild(respValue);
                output.appendChild(respElem);

                output.scrollTo({
                    left: 0,
                    top: output.scrollHeight
                });
            })
            .catch(() => {

            });
    }

    form.addEventListener('submit', event => {
        event.preventDefault();

        const value = input.value;
        doRequest(value);
    });

    submit.addEventListener('click', () => {
        doRequest('', true);
        input.removeAttribute('disabled');
        form.querySelector('.controls').removeChild(submit);
    });
});
