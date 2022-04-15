let messagesData;
let username;
const chat = document.querySelector(".chats")

function calltoActionBtn (){
    const entrarBtn = document.querySelector(".entrarBtn")

    if (username !== undefined){
        entrarBtn.classList.add("actionBtn")
    } else {
        setInterval(calltoActionBtn,3000)
    }
}


function consultUsers(){

    const promisseUsers = axios.get("https://mock-api.driven.com.br/api/v6/uol/participants")

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

}
 consultData()


function dataReceive (message) {
    
    messagesData = message.data

printMessage(messagesData)
}


function sendMessage (){
    const inputMessage = document.querySelector(".sendMessage")

    

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
    scroll()
    /* setInterval(consultData,3000) */
}


function scroll (){
    chat.scrollIntoView()
}