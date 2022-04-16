let messagesData;
let username;
let userTo = "Todos"
let usersTo;
let userFrom;
let visibility = "Público"
let visibilityApi = "message"
let teste;

const chat = document.querySelector(".chats")

function validUser() {

    userFrom = document.querySelector(".username").value
    username = {
        name: userFrom
    }

    const promisseValidUser = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants ", username);

    promisseValidUser.then(validatedUser);
    promisseValidUser.catch(errorValidUser);
    
}

function validatedUser() {
    const loginScreen = document.querySelector(".loginScr")
    loginScreen.classList.add("hidden")


    setInterval(consultData,3000)
    setInterval(consultUsers, 10000)
    setInterval(checkStatus,5000)
}

function errorValidUser() {
    alert("Este username já está em uso, escolha outro")
}



function consultData() {

    const promisseMessage = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
    promisseMessage.then(dataReceive)

}

function consultUsers() {
    const usersPromisse = axios.get("https://mock-api.driven.com.br/api/v6/uol/participants")
    usersPromisse.then(usersReceiveData)

}


function dataReceive(message) {

    messagesData = message.data

    printMessage(messagesData)
}

function usersReceiveData(usersPromisse) {

    usersTo = usersPromisse.data


    printUsers(usersTo)
    messageTo()

}

function sendMessage() {

    let inputMessage = document.querySelector(".writeMessage")
    const messagem = {
        from: userFrom,
        to: userTo,
        text: inputMessage.value,
        type: visibilityApi,
    }
    console.log(messagem)
    const sendMessage = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", messagem)
    sendMessage.then(consultData)
    sendMessage.catch(error => console.log(error))
    inputMessage.value = ""
}

function checkStatus() {


    console.log(username)
    const status = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", username)

}


function validandoConexão (){
 
    setInterval(checkStatus,5000)
}

function printMessage(messagesData) {


    chat.innerHTML = "";

    for (let i = 0; i < messagesData.length; i++) {
        if (messagesData[i].type === "status") {
            chat.innerHTML += `<div class="message statusMessage">

            <p class="time">(${messagesData[i].time})&#160;</p>
            <p class="user from">${messagesData[i].from} &#160; </p>
            <p class="text">${messagesData[i].text}</p>

        </div><!-- chat -->  `

        } else if (messagesData[i].type === "message" && (messagesData[i].to === "Todos" || messagesData[i].to === "todos")) {

            chat.innerHTML += `<div class="message">

            <p class="time">(${messagesData[i].time})&#160;</p>
            <p class="user from">${messagesData[i].from} &#160; </p>
            <p class="user" >para &#160; </p>
            <p class="user to">${messagesData[i].to} &#160; </p>
            <p class="text">${messagesData[i].text}</p>

        </div><!-- chat --> `

        } else if (messagesData[i].to === userFrom || messagesData[i].from === userFrom) {

            chat.innerHTML += `<div class="message reservedMessage">

            <p class="time">(${messagesData[i].time})&#160;</p>
            <p class="user from">${messagesData[i].from} &#160; </p>
            <p class="user" >para &#160; </p>
            <p class="user to">${messagesData[i].to} &#160; </p>
            <p class="text">${messagesData[i].text}</p>

        </div><!-- chat --> `

        }
    }

}


function printUsers() {

    let usersBtn = document.querySelector(".specificUser")
    usersBtn.innerHTML = ""


    for (let i = 0; i < usersTo.length; i++) {

        usersBtn.innerHTML = usersBtn.innerHTML + `
            <button onclick="selectUserTo(this)" class="userBtn">
            <ion-icon class="ionicon" name="person-circle"></ion-icon>
            <p class="nameUser">${usersTo[i].name}</p>
            <ion-icon class="check" name="checkmark"></ion-icon>
        </button>
        `

    } 
}


function quitSidebar() {

    const sidebar = document.querySelector(".sidebar")

    sidebar.classList.add("hidden")

}


function sidebarShow() {

    const sidebar = document.querySelector(".sidebar")

    sidebar.classList.remove("hidden")

}

function messageTo() {

    const lineMessageTo = document.querySelector(".messageTo")


    lineMessageTo.innerHTML = `<p>Enviando para ${userTo} (${visibility})</p>`
}

function visibilitySelect(element) {

    const checkSelect = document.querySelector(".visibilitySelect")

    if (checkSelect === null) {
        element.children[2].classList.add("visibilitySelect")
        visibility = element.children[1].innerHTML
        messageType()
        errorMsg()
    } else {
        checkSelect.classList.remove("visibilitySelect")
        element.children[2].classList.add("visibilitySelect")
        visibility = element.children[1].innerHTML
        messageType()
        errorMsg()
    }
}

function messageType() {


    if (visibility === "Público") {
        visibilityApi = "message"
        messageTo()
    } else {
        visibilityApi = "private_message"
        messageTo()
    }
}

function selectUserTo(element) {

    const checkSelect = document.querySelector(".checkSelect")

    if (checkSelect === null) {
        element.children[2].classList.add("checkSelect")
        userTo = element.children[1].innerHTML
        messageTo()
        errorMsg()
    } else {
        checkSelect.classList.remove("checkSelect")
        element.children[2].classList.add("checkSelect")
        userTo = element.children[1].innerHTML
        messageTo()
        errorMsg()
    }
}


function errorMsg() {


    if (userTo === "Todos" && visibility === "Reservadamente") {
        const checkSelect = document.querySelector(".checkSelect")
        checkSelect.classList.remove("checkSelect")
        const visibilitySelect = document.querySelector(".visibilitySelect")
        visibilitySelect.classList.remove("visibilitySelect")
        userTo = "Todos"
        visibility = "Público"
        alert("Escolha um usuário especifico para enviar uma mensagem reservada")
        messageTo()
    }
}

