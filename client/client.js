window.addEventListener('DOMContentLoaded', main);
const url = 'http://localhost:3000/';

const state = {
    lastEditId : undefined
}

function main() {
    const form = document.getElementById('createForm');
    const formEdit = document.getElementById('editForm');
    const deleteAllButton = document.getElementById('deleteAllButton');
    form.addEventListener('submit', createNew);
    formEdit.addEventListener('submit', submitEdit);
    deleteAllButton.addEventListener('click', deleteAll);
    UpdateUserInterface();
}

function UpdateUserInterface() {
    fetch(url+'get')
        .then(response => response.json())
        .then((data) => {
            PrintGet(data);
        });
        // .catch(err => console.error('error: ', err))
}

/**
 * @param {Object[]} data
 */
function PrintGet(data) {
    document.getElementById('parentContainer').innerHTML = "";
    data.forEach((element) => {
        console.log('element: ', element);         // Debug.
        const containerElement = document.getElementById('parentContainer');
        // element.innerText = JSON.stringify(data, null, 2);          // Debug.

        const row = document.createElement('div');
        row.className = 'child';
        // row.id = 'row'+element.id;
        row.dataset['rowId'] = element.id;
        containerElement.appendChild(row);

        // const rowElement = document.getElementById('row'+element.id);
        const rowElement = document.querySelector('div[data-row-id="'+element.id+'"]');
        const itemName = document.createElement('div');
        const itemAmount = document.createElement('div');
        itemName.innerText = element.name;
        itemAmount.innerText = element.amount;
        rowElement.appendChild(itemName);
        rowElement.appendChild(itemAmount);

        // const rowElement = document.getElementById(element.id);
        const buttonEdit = document.createElement('button');
        buttonEdit.innerText = 'Edit';
        buttonEdit.setAttribute('class', 'editByIdButton');
        buttonEdit.dataset['editId'] = element.id;
        rowElement.appendChild(buttonEdit);

        const buttonDelete = document.createElement('button');
        buttonDelete.innerText = 'Delete';
        buttonDelete.setAttribute('class', 'deleteByIdButton');
        buttonDelete.dataset['deleteId'] = element.id;
        rowElement.appendChild(buttonDelete);
    });
    AddEventEditButtons();
    AddEventDeleteButtons();
}

function AddEventEditButtons() {
    const deleteIdButtons = document.querySelectorAll('.editByIdButton');
    for (let value of deleteIdButtons) {
        value.addEventListener('click', editId);
    }
}

function AddEventDeleteButtons() {
    const deleteIdButtons = document.querySelectorAll('.deleteByIdButton');
    // console.log(deleteIdButtons);
    for (let value of deleteIdButtons) {
        // console.log('value: ', value);
        value.addEventListener('click', deleteId);
    }
}

function editId() {
    console.log('editId');
    const editForm = document.getElementById('editForm');
    const rowElement = document.querySelector('div[data-row-id="'+this.dataset['editId']+'"]');
    const inputName = document.getElementById('inputNameEdit');
    const inputAmount = document.getElementById('inputAmountEdit');
    inputName.value = rowElement.childNodes[0].innerText;
    inputAmount.value = rowElement.childNodes[1].innerText;
    editForm.style.display = 'block';
    state.lastEditId = this.dataset['editId'];
}

/**
 * @param {Event} event
 */
function submitEdit(event) {
    console.log('submitEdit');              // Debug.
    const editForm = document.getElementById('editForm');
    const inputName = document.getElementById('inputNameEdit');
    const inputAmount = document.getElementById('inputAmountEdit');

    const req = { 'id' : state.lastEditId, 'name' : inputName.value, 'amount' : inputAmount.value };
    console.log('req: ', req);
    fetch(url+'put', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(req)
    });

    editForm.style.display = 'none';
    event.preventDefault();
}

/**
 * @param {Event} event
 */
function createNew(event) {
    console.log('create new');          // Debug.
    const formInputName = document.getElementById('inputNameCreate');
    const formInputAmount = document.getElementById('inputAmountCreate');
    const req = { 'name' : formInputName.value, 'amount' : formInputAmount.value };
    // console.log('req: ', req);                                  // Debug.
    // console.log('form name: ', formInputName.value);            // Debug.
    // console.log('form amount: ', formInputAmount.value);        // Debug.
    fetch(url+'post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req)
    });
    event.preventDefault();
    UpdateUserInterface();
}

function deleteAll() {
    console.log('delete all');          // Debug.
    fetch(url+'delete', { method: 'DELETE' });
    UpdateUserInterface();
}

function deleteId() {
    console.log('deleteId');            // Debug.
    // const url2 = url+'delete/'+this.dataset['deleteId'];
    // console.log('delete id: ', this.dataset['deleteId'], url2);          // Debug.
    fetch(url+'delete/'+this.dataset['deleteId'], { method: 'DELETE' });
    UpdateUserInterface();
}

// function AddColumn(element) {
// }

// function CreateRow(data) {
// }

// function CreateHeader(data) {
//     const containerElement = document.getElementById('parentContainerHeader');
//     const keys = Object.keys(data[0]);
//     keys.forEach(element => {
//         console.log(element);
//     }
//     )
// }
