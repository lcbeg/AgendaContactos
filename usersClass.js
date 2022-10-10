/** Clase para la información de cada usuario
*/
class User {

    constructor({id, email, first_name, last_name, avatar}) {
        this.id = id;
        this.avatar = avatar;
        this.email = email;
        this.firstName = first_name;
        this.lastName = last_name;
        this.avatar = avatar;
    }

/** Presenta los datos en la tabla de la página
*/
    showData() {
        let myTable = document.getElementById("tableData");
        let newRow = myTable.insertRow();
        Object.entries(this).forEach(entry => {
            let newCol = newRow.insertCell();
            if (entry[0] !== "avatar") newCol.innerText = entry[1]
            else {
                let userAvatar = document.createElement("img");
                userAvatar.src = entry[1];
                userAvatar.className = "rounded-circle img-fluid"
                newCol.appendChild(userAvatar);
            }
        }
        )
    }

    printData(){
        Object.entries(this).forEach(entry => console.log(entry));
    }
}

export {User};