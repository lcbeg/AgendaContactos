
import { User } from "./usersClass.js"

/**
 * Al hacer click en el botón "ver", busca en el almacenamiento local la información,
 * si la encuentra y está dentro del tiempo de vida la muestra, de lo contrario la trae
 * de la base de datos.
 */
const handleClick = () => {
    const data = JSON.parse(localStorage.getItem("usersData"));
    const time = localStorage.getItem("usersTime");
    (data && (time > Date.now())) ? getFromLocalStorage() : getFromDatabase();
}

/** Obtiene datos con la API fetch.
*/
function getFromDatabase() {
    document.getElementById("spinner").className = "spinner-border";
    console.log(document.getElementById("spinner").className);
    fetch("https://reqres.in/api/users?delay=3")
        .then(info => info.json())
        .then(
            convertedData => {
                let objectArray = convertedData.data; // Traer información data
                console.log(convertedData.data);
                let users = Object.keys(objectArray);
                users.forEach(user => {
                    let userToShow = new User(objectArray[user]);
                    userToShow.showData();
                });
                localStorage.setItem("usersData", JSON.stringify( objectArray ));
                localStorage.setItem("usersTime", Date.now() + 60000);
                document.getElementById("spinner").className = "spinner-border invisible";
            })
            .finally()
};

/** Obtiene los datos del almacenamiento local.
*/
function getFromLocalStorage(){
    const users = JSON.parse(localStorage.getItem("usersData"));
    users.forEach(user => {
        let userToShow = new User(user);
        userToShow.showData();
    });
};

// ------ Button Event Listener ------ //
const button = document.getElementById("start");
button.addEventListener("click", handleClick)