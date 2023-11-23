function submitAnswers() {
    // Hae arvot lomakkeesta
    const answer1 = document.getElementById('answer1').value;
    const answer2 = document.getElementById('answer2').value;
    const answer3 = document.getElementById('answer3').value;
    const answer4 = document.getElementById('answer4').value;

    // Tallenna arvot paikalliseen varastoon
    localStorage.setItem('answer1', answer1);
    localStorage.setItem('answer2', answer2);
    localStorage.setItem('answer3', answer3);
    localStorage.setItem('answer4', answer4);

    // Ohjaa käyttäjä index.html-sivulle
    window.location.href = 'index.html';
}

