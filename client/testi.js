// Loaderille toiminnot
window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");
    loader.classList.add("loader--hidden");
    loader.addEventListener("transitioned", () => {
        document.body.removeChild(loader);
    });
});

function closeModal() {
    document.getElementById('customModal').style.display = 'none';
}

// Liitä eventlister sen jälkeen kun DOM on ladannut.
document.addEventListener('DOMContentLoaded', () => {
    // Lisää eventlistener close buttoniin
    const closeButton = document.querySelector('.close-button');
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }
    // Painaessa moduulin ulkopuolelta sulkeutuu
    window.onclick = function (event) {
        const modal = document.getElementById('customModal');
        if (event.target === modal) {
            closeModal();
        }
    };
});
function submitAnswers() {
    // Hae arvot lomakkeesta
    const answer1 = document.getElementById('answer1').value;
    const answer2 = document.getElementById('answer2').value;
    const answer3 = document.getElementById('answer3').value;
    const answer4 = document.getElementById('answer4').value;
    // Pakotetaan käyttäjä täyttämään kaikki kohdat
    if (!answer1 || !answer2 || !answer3 || !answer4) {
        document.getElementById('customModal').style.display = 'block';
        return;
    }
    // Tallenna arvot paikalliseen varastoon
    localStorage.setItem('answer1', answer1);
    localStorage.setItem('answer2', answer2);
    localStorage.setItem('answer3', answer3);
    localStorage.setItem('answer4', answer4);

    // Ohjaa käyttäjä index.html-sivulle
    window.location.href = 'index.html';
}
