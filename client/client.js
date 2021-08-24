window.addEventListener('DOMContentLoaded', main);
const url = 'http://localhost:3000/';

function main() {
    const form = document.getElementById('createForm');
    const deleteAllButton = document.getElementById('deleteAllButton');
    const deleteIdButtons = document.querySelectorAll('.deleteByIdButton');
    // createButton.addEventListener('click', createNew);
    form.addEventListener('submit', createNew);
    deleteAllButton.addEventListener('click', deleteAll);
    fetch(url+'get')
        .then(response => response.json())
        .then((data) => {
            // const array = Object.values(data);
            // for(var i = 0; i < data.length; i++)
            // {
            //     console.log('data loop: ', data[i]);
            // }
            // console.log('data index 0: ', data[0]);
            // console.log('array: ', array);
            // CreateHeader(data);
            PrintGet(data);
            // console.log('data: ', data);          // Debug.
            }
        )
        .catch(err => console.error('error: ', err))


    /**
     * @param {Object[]} data
     */
    function PrintGet(data) {
        data.forEach((element) => {
            console.log('element: ', element);         // Debug.
            const containerElement = document.getElementById('parentContainer');
            // element.innerText = JSON.stringify(data, null, 2);          // Debug.

            const row = document.createElement('div');
            row.className = 'child';
            row.id = 'row'+element.id;
            containerElement.appendChild(row);

            const rowElement = document.getElementById('row'+element.id);
            const itemName = document.createElement('div');
            const itemAmount = document.createElement('div');
            itemName.innerText = element.name;
            itemAmount.innerText = element.amount;
            rowElement.appendChild(itemName);
            rowElement.appendChild(itemAmount);

            // const rowElement = document.getElementById(element.id);
            const buttonEdit = document.createElement('button');
            buttonEdit.innerText = 'Edit';
            rowElement.appendChild(buttonEdit);
            const buttonDelete = document.createElement('button');
            buttonDelete.innerText = 'Delete';
            buttonDelete.setAttribute('class', 'deleteByIdButton');
            buttonDelete.dataset['deleteId'] = element.id;
            // buttonDelete.id = 'deleteAllButton'+element.id;
            rowElement.appendChild(buttonDelete);
        });
    };

    /**
     * @param {Event} event
     */
    function createNew(event) {
        console.log('create new');          // Debug.
        const formInputName = document.getElementById('inputName');
        const formInputAmount = document.getElementById('inputAmount');
        const req = { 'name' : formInputName.value, 'amount' : formInputAmount.value };
        console.log('req: ', req);
        console.log('form name: ', formInputName.value);            // Debug.
        console.log('form amount: ', formInputAmount.value);        // Debug.
        fetch(url+'post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req)
        });
        event.preventDefault();
    }

    function deleteAll() {
        console.log('delete all');          // Debug.
        fetch(url+'delete', { method: 'DELETE' });
        // PrintGet();
    }

    function deleteId() {
        console.log('delete all');          // Debug.
        fetch(url+'delete', { method: 'DELETE' });
        // PrintGet();
    }

    function AddColumn(element) {
    }

    /**
     * @param {Object[]} data
     */
    function CreateRow(data) {
    }

    /**
     * @param {Object[]} data
     */
    function CreateHeader(data) {
        const containerElement = document.getElementById('parentContainerHeader');
        const keys = Object.keys(data[0]);
        keys.forEach(element => {
            console.log(element);
        }
        )
    }
}
