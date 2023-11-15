// Import-kuvakkeet botille ja käyttäjälle
import bot from './assets/bot.svg'
import user from './assets/user.svg'

// Hae lomake- ja keskusteluelementit
const form = document.querySelector('form')
const chatContainer = document.querySelector('#chat_container')

// Muuttuja latausvälinnettä varten
let loadInterval

// Funktio, joka näyttää pisteitä latauksen aikana
function loader(element) {
    element.textContent = ''

    loadInterval = setInterval(() => {
        // Päivitä latausindikaattorin tekstisisältöä
        element.textContent += '.';

        // Jos latausindikaattori on saavuttanut kolme pistettä, nollaa se
        if (element.textContent === '....') {
            element.textContent = '';
        }
    }, 300);
}

// Tekstityksen animointifunktio
function typeText(element, text) {
    let index = 0

    let interval = setInterval(() => {
        if (index < text.length) {
            element.innerHTML += text.charAt(index)
            index++
        } else {
            clearInterval(interval)
        }
    }, 20)
}

// Generoi uniikin ID jokaiselle bottivastauksen viestielementille
// Tarpeellinen tekstitysefektin kannalta kyseisen vastauksen kohdalla, ilman uniikkia ID:ta tekstitys toimisi jokaisessa elementissä
function generateUniqueId() {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);

    return `id-${timestamp}-${hexadecimalString}`;
}

// Luo HTML-rakenteen keskustelukuplalle (chat stripe)
function chatStripe(isAi, value, uniqueId) {
    return (
        `
        <div class="wrapper ${isAi && 'ai'}">
            <div class="chat">
                <div class="profile">
                    <img 
                      src=${isAi ? bot : user} 
                      alt="${isAi ? 'bot' : 'user'}" 
                    />
                </div>
                <div class="message" id=${uniqueId}>${value}</div>
            </div>
        </div>
    `
    )
}

// Käsittele lomakkeen lähettäminen
const handleSubmit = async (e) => {
    e.preventDefault();

    // Hae lomakkeen tiedot
    const formData = new FormData(form);

    // Näytä käyttäjän keskustelukupla
    chatContainer.innerHTML += chatStripe(false, formData.get('prompt'));

    // Tyhjennä tekstikenttä
    form.reset();

    // Näytä bottivastauksen keskustelukupla
    const uniqueId = generateUniqueId();
    chatContainer.innerHTML += chatStripe(true, " ", uniqueId);

    // Aseta keskustelukontainerin vieritys alareunaan
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // Etsi viestielementti uniikin ID:n avulla
    const messageDiv = document.getElementById(uniqueId);

    // Näytä latausindikaattori
    loader(messageDiv);

    try {
        // Lähetä HTTP POST -pyyntö backendille
        const response = await fetch('http://localhost:5000', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: formData.get('prompt')
            })
        }); 

        // Tarkista onko pyyntö onnistunut
        if (response.ok) {
            // Hae ja käsittele backendin vastaus
            const responseData = await response.json();
            const parsedData = responseData.bot.trim(); // Poista mahdolliset välilyönnit tai '\n'

            // Tyhjennä latausindikaattori ja näytä vastaus tekstityksenä
            clearInterval(loadInterval);
            messageDiv.textContent = '';
            typeText(messageDiv, parsedData);
        } else {
            // Käsittele virheellinen HTTP-statuskoodi ja näytä virheviesti
            const err = await response.text();
            messageDiv.textContent = "Jokin meni vikaan";
            alert(err);
        }
    } catch (error) {
        messageDiv.textContent = "Jokin meni vikaan";
        alert(error.message);
    }
};

// Lisää tapahtumakuuntelija lomakkeen lähettämiselle
form.addEventListener('submit', handleSubmit);

// Lisää tapahtumakuuntelija näppäimistön Enter-painikkeelle
form.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault(); // Estä lomakkeen lähettäminen
        handleSubmit(e);
    }
});
