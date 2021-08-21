window.addEventListener('DOMContentLoaded', main);

function main() {
    fetch('http://localhost:3000/get')
        .then(response => response.json())
        .then((data) => {
            // const array = Object.values(data);
            // for(var i = 0; i < data.length; i++)
            // {
            //     console.log('data loop: ', data[i]);
            // }
            // console.log('data index 0: ', data[0]);
            // console.log('array: ', array);
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
            const element1 = document.getElementById('jslistParent');
            // element.innerText = JSON.stringify(data, null, 2);          // Debug.
            const itemName = document.createElement('div');
            itemName.className = 'child';
            itemName.id = element.id;
            itemName.innerText = element.id + ' ' + element.name + ' ' + element.amount;
            // btn.innerText = 'test';
            element1.appendChild(itemName);
            const element2 = document.getElementById(element.id);
            const buttonEdit = document.createElement('button');
            buttonEdit.innerText = 'Edit';
            element2.appendChild(buttonEdit);
            const buttonDelete = document.createElement('button');
            buttonDelete.innerText = 'Delete';
            element2.appendChild(buttonDelete);
        });
    };

    function AddColumn(element) {
    }

    /**
     * @param {Object[]} data
     */
    function CreateRow(data) {
    }
}
