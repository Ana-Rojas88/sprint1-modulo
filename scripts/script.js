const URL_API = 'https://back-chat-production.up.railway.app/'

class UI {
    constructor(targetID) {
        this.target = document.getElementById(targetID);
    }

    getValue() {
        return this.target.value;
    }
}

const cellphone = new UI('cellphone');
const password = new UI('password');

const form = document.getElementById('form__login');

const handleSubmit = async (e) => {
    e.preventDefault();
    //new object from values
    const users = {
        cellphone: cellphone.getValue(),
        password: password.getValue(),
    }
    //validations
    for (const key in users) {
        const element = users[key];
        if (element === '') {
            alert(`Falta llenar el campo ${key}`)
            return;
        }
    }
    //send to back
    try {
        let response = await axios.get(`${URL_API}users?cellphone=${users.cellphone}&password=${users.password}`);
        if (response.status === 200) {
            if (response.data.length) {
                //save localStorage session
                localStorage.setItem('users', JSON.stringify(response.data[0]))

                location.href = 'http://127.0.0.1:5500/pages/home.html'
            }else {
                Swal.fire(
                    'Oops!',
                    'Usuario o contraseña incorrecta!',
                    'error'
                )
            }
        }
    } catch (error) {
        console.log(error);
        Swal.fire(
            'Oops!',
            'Se ha presentado un error!',
            'error'
        )
    }
}

const validationSession = () => {
    const users = localStorage.getItem('users');
    if (users) {
        location.href = 'http://127.0.0.1:5500/pages/home.html'
    }
}

validationSession()

form.addEventListener('submit', (e) => { handleSubmit(e) })