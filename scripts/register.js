const URL_API = 'https://back-chat-production.up.railway.app/'

class UI {
    constructor(targetID) {
        this.target = document.getElementById(targetID);
    }

    getValue() {
        return this.target.value;
    }
}

const name = new UI('name');
const cellphone = new UI('cellphone');
const password = new UI('password');
const url = new UI('url');
const phrase = new UI('phrase');

const form = document.getElementById('form__login');

const handleSubmit = async (e) => {
    e.preventDefault();
    //new object from values
    const newUser = {
        name: name.getValue(),
        cellphone: cellphone.getValue(),
        password: password.getValue(),
        image: url.getValue(),
        info: phrase.getValue(),

    }
    //validations
    for (const key in newUser) {
        const element = newUser[key];
        if (element === '') {
            alert(`Falta llenar el campo ${key}`)
            return;
        }
    }
    //send to back
    try {
        let response = await axios.post(`${URL_API}users`, newUser);
        if (response.status === 201) {
            Swal.fire(
                'Excelente!',
                'Usuario creado con éxito!',
                'success'
            )
        }
    } catch (error) {
        Swal.fire(
            'Oops!',
            'Se ha presentado un error!',
            'error'
        )
    }
}

form.addEventListener('submit', (e) => { handleSubmit(e) })