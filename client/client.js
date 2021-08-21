window.addEventListener('DOMContentLoaded', main);

function main() {
    fetch('http://localhost:3000/get')
        .then(response => response.json())
        .then((data) => {
            PrintGet(data);
            console.log(data);          // Debug.
            }
        )
        .catch(err => console.error('error: ', err))

    function PrintGet(data) {
        const element = document.getElementById('jslist');
        element.innerText = JSON.stringify(data, null, 2);          // Debug.
    }
}
