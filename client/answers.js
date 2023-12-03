document.addEventListener('DOMContentLoaded', async () => {
    const loadingIndicator = document.getElementById('loadingIndicator');
    const aiResponseElement = document.getElementById('aiResponse');

    // Hae tallennetut vastaukset
    const answer1 = localStorage.getItem('answer1');
    const answer2 = localStorage.getItem('answer2');
    const answer3 = localStorage.getItem('answer3');
    const answer4 = localStorage.getItem('answer4');

    // Yhdistä vastaukset yhdeksi merkkijonoksi
    const combinedPrompt = `${answer1}\n${answer2}\n${answer3}\n${answer4}`;

    if (combinedPrompt.trim() !== '') {
        // Näytä loading-indikaattori
        loadingIndicator.style.display = 'block';

        // Lähetä pyyntö backendiin
        try {
            const response = await fetch('http://localhost:5000', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: combinedPrompt })
            });

            if (response.ok) {
                const responseData = await response.json();
                const answer = responseData.bot.trim();
                // Näytä vastaus kirjain kerrallaan
                aiResponseElement.innerText = answer;
                 // Show the button after displaying the response
                document.getElementById('resetButton').style.display = 'block';
                // Piilota loading-indikaattori
                loadingIndicator.style.display = 'none';
            } else {
                console.error('Error from server:', await response.text());
            }
        } catch (error) {
            console.error('Error:', error);
            // Piilota loading-indikaattori myös virhetilanteessa
            loadingIndicator.style.display = 'none';
        }
    } else {
        // Piilota loading-indikaattori, koska ei ole promptia
        loadingIndicator.style.display = 'none';
        aiResponseElement.innerText = 'No prompt provided.';
    }
});

// Reset-napin logiikka
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('resetButton').addEventListener('click', () => {
        window.location.href = 'testi.html'; // Palaa takaisin testi.html-sivulle
    });
});