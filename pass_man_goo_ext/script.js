const EMAIL_STATE = document.querySelector('#email')
const PASSWORD_STATE = document.querySelector('#pass')
let PASSWORD_LIST_STATE = null

const LOGIN_SECTION = document.querySelector('#login')
const PASSWORD_LIST = document.querySelector('#password-list')
const LOGIN_BUTTON = document.querySelector('#submit')



const logIn = async () => {
    console.log('Trying to log in...')
    try {
        const response = await fetch('http://localhost:3000/signin', {
            method: 'POST',
            body: JSON.stringify({
                email: EMAIL_STATE.value,
                password: PASSWORD_STATE.value
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json()
        if (data.loggedIn) {
            PASSWORD_LIST_STATE = [...data.passwordsOrErrors]
        }
        console.log(data.loggedIn)
        displayPasswordList()
        EMAIL_STATE.value = ''
        PASSWORD_STATE.value = ''
    } catch (error) {
        console.error(error)
    }
}

const displayPasswordList = () => {
    LOGIN_SECTION.style.display = 'none'

    PASSWORD_LIST_STATE.forEach(password => {
        const item = document.createElement('div')
        PASSWORD_LIST.appendChild(item)

        const accountName = document.createElement('h3')
        accountName.innerText = password.accountFor
        item.appendChild(accountName)

        const passwordContainer = document.createElement('div')
        passwordContainer.classList.add('.flex-container')
        item.appendChild(passwordContainer)

        const emailField = document.createElement('div')
        emailField.innerText = password.usernameUsed
        passwordContainer.appendChild(emailField)

        const passwordField = document.createElement('div')
        passwordField.innerText = password.password
        passwordContainer.appendChild(passwordField)
    });
}

LOGIN_BUTTON.addEventListener('click', logIn)
