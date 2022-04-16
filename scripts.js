let messagesData;
let username;
let userTo = "Todos"
let usersTo;
let teste = []

const chat = document.querySelector(".chats")
    
function calltoActionBtn (){
    const entrarBtn = document.querySelector(".entrarBtn")

    if (username !== undefined){
        entrarBtn.classList.add("actionBtn")
    } else {
        setInterval(calltoActionBtn,3000)
    }
}



function validUser (){

    username = document.querySelector(".username").value
    const user = {
        name: `${username}`
    }

    const promisseValidUser = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants ", user);

    promisseValidUser.then(validatedUser);
    promisseValidUser.catch(errorValidUser);
}

function validatedUser (){
    const loginScreen = document.querySelector(".loginScr")
    loginScreen.classList.add("hidden")
    consultData()
    
}

function errorValidUser(){
    alert("Este username já está em uso, escolha outro")
}



function consultData (){

const promisseMessage = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
promisseMessage.then(dataReceive)

const usersPromisse = axios.get("https://mock-api.driven.com.br/api/v6/uol/participants")
    usersPromisse.then(usersReceiveData)
}
 consultData()


function dataReceive (message) {
    
    messagesData = message.data

printMessage(messagesData)
}

function usersReceiveData (usersPromisse){

    usersTo = usersPromisse.data


printUsers(usersTo)    
}

function sendMessage (){
    const inputMessage = document.querySelector(".sendMessage")

    

}

function checkStatus(){ 

    
    const sendStatus = {
        name: `${username}`
      }
    const status = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", sendStatus)
    
    status.then(setInterval(checkStatus,5000))
}

function printMessage(messagesData){
    
    
    chat.innerHTML = "";

    for (let i = 0; i < messagesData.length ; i++ ) {
        if(messagesData[i].type === "status"){
            chat.innerHTML += `<div class="message statusMessage">

            <p class="time">(${messagesData[i].time })&#160;</p>
            <p class="user from">${messagesData[i].from } &#160; </p>
            <p class="text">${messagesData[i].text}</p>

        </div><!-- chat -->  `
        
        } else if(messagesData[i].type === "message" && (messagesData[i].to === "Todos" || messagesData[i].to === "todos" )){

            chat.innerHTML += `<div class="message">

            <p class="time">(${messagesData[i].time })&#160;</p>
            <p class="user from">${messagesData[i].from } &#160; </p>
            <p class="user" >para &#160; </p>
            <p class="user to">${messagesData[i].to } &#160; </p>
            <p class="text">${messagesData[i].text}</p>

        </div><!-- chat --> `
        
        } else {

            chat.innerHTML += `<div class="message">

            <p class="time">(${messagesData[i].time })&#160;</p>
            <p class="user from">${messagesData[i].from } &#160; </p>
            <p class="user" >para &#160; </p>
            <p class="user to">${messagesData[i].to } &#160; </p>
            <p class="text">${messagesData[i].text}</p>

        </div><!-- chat --> `
        
        } 
    } 
    /* setInterval(consultData,3000) */
}


function printUsers (usersTo){

    let usersBtn = document.querySelector(".specificUser")
    usersBtn.innerHTML = ""
    
    checkStatus()

    for (let i = 0; i < usersTo.length ; i++ ) {

        usersBtn.innerHTML = usersBtn.innerHTML + `
            <button class="userBtn">
            <ion-icon class="ionicon" name="person-circle"></ion-icon>
            <p>${usersTo[i].name}</p>
            <ion-icon class="check hidden" name="checkmark"></ion-icon>
        </button>
        `
    
    }
}


function quitSidebar (){

    const sidebar = document.querySelector(".sidebar")

    sidebar.classList.add("hidden")
  
}


function sidebarShow(){

    const sidebar = document.querySelector(".sidebar")

    sidebar.classList.remove("hidden")

}


function sendMessage (){
    
  

}


function messageTo (){

    const lineMessageTo = document.querySelector(".messageTo")


    lineMessageTo.innerHTML = `<p>Enviando para ${userTo} (Reservadamente)</p>`
}
messageTo()



function deuBom(){

    setInterval(checkStatus, 5000)

}


