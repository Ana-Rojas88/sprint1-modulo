const URL_API = 'https://back-chat-production.up.railway.app/'
const URL_messages = 'https://back-chat-production.up.railway.app/messages'
const URL_users = 'https://back-chat-production.up.railway.app/users'
const userRaw = localStorage.getItem('users');
const image = document.getElementById('image');
const user = document.getElementById('user');
const chat = document.getElementById('chat');
const search = document.getElementById('form_id');

let DateTime = luxon.DateTime;
const dt = DateTime.now();

//formato 12horas con am o pm
const hour =DateTime.fromISO(dt).toFormat('h:mm a') //hora y minutos
console.log(hour);

const day = DateTime.fromISO(dt).toFormat('cccc'); //dia
console.log(day)

let users;

const validationSession = () => {
    if (!userRaw) {
        location.href = 'http://127.0.0.1:5500/index.html'

    } else {
        users = JSON.parse(userRaw)
    }
}

validationSession();
console.log(users);

const printPerfil = () => {
    image.innerHTML += `
    <img src="${users.image}" alt="image">
        `
};
printPerfil();

const getApi = async () => {
    const { data } = await axios.get(`${URL_API}users`);
    // console.log(data);
    return data;
};
getApi();


const renderUserChat = async (id) => {
    let { data } = await axios.get(`${URL_API}users`);
    let { data : conversation } = await axios.get(`${URL_API}messages`);
    // console.log(message);
    const idSesion = users.id;
    // console.log(idSesion);
    user.innerHTML = "";
    // console.log(data)
    data.forEach(element => {
        id = element.id;
        console.log(id);
        if (id != idSesion) {
            user.innerHTML += `
            <div class="text">
            <figure>
            <img name="${id}"  src="${element.image}" alt="image">
        </figure>
        <span name="${id}" >${element.name}</span>
            </div>
            <p>Amet minim mollit non deserunt ullamco est sit aliqua</p>
               
          `;
        }
    });
};
renderUserChat();

const renderCoversation = async (e) => {
    let { data : message } = await axios.get(`${URL_API}messages`);
    message.forEach(element => {
        const idUser1 = element.idUser1;
        const idUser2 = element.idUser2;
        const { conversation } = element;
        conversation.forEach(item => {
           const sendBy = item.sendBy;
            console.log(sendBy);
            chat.innerHTML = '';
          
            for (let i = 0; i < conversation.length; i++) {
            
                chat.innerHTML += `
                         <div  class="chat__message">
                        <p name="sendBy">${conversation[i].message}</p>
                        <span name="sendBy">${conversation[i].hour}</span>
                        <span name="sendBy">${conversation[i].date}</span> 
                         </div>
                    ` 
            }
            
        })

    })

};


const handleCloseSession = () => {
    localStorage.clear();
    location.href = 'http://127.0.0.1:5500/index.html';
}

const btnCloseSession = document.getElementById('btnCloseSession');

btnCloseSession.addEventListener('click', handleCloseSession);
//

const getData= async(url)=>{
    const {data}= await axios.get(url)
    return data
    }

const renderMessage = document.getElementById("messages");

renderMessage.addEventListener('click', renderCoversation);
