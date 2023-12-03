document.addEventListener('DOMContentLoaded', async () => {
    // Hae tallennetut vastaukset
    const answer1 = localStorage.getItem('answer1');
    const answer2 = localStorage.getItem('answer2');
    const answer3 = localStorage.getItem('answer3');
    const answer4 = localStorage.getItem('answer4');

    // Yhdistä vastaukset yhdeksi merkkijonoksi
    const combinedPrompt = `${answer1}\n${answer2}\n${answer3}\n${answer4}`;

    if (combinedPrompt.trim() !== '') {
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
                const aiResponseElement = document.getElementById('aiResponse');
                
            } else {
                console.error('Error from server:', await response.text());
            }
        } catch (error) {
            console.error('Error:', error);
        }
    } else {
        document.getElementById('aiResponse').innerText = 'No prompt provided.';
    }
});

// Reset-napin logiikka
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('resetButton').addEventListener('click', () => {
        window.location.href = 'testi.html'; // Palaa takaisin testi.html-sivulle
    });
});
