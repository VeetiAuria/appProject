
document.addEventListener('DOMContentLoaded', async () => {
    // Retrieve the stored answers
    const answer1 = localStorage.getItem('answer1');
    const answer2 = localStorage.getItem('answer2');
    const answer3 = localStorage.getItem('answer3');
    const answer4 = localStorage.getItem('answer4');

   // Yhdistä vihjeet yhdeksi merkkijonoksi tai käsittele tarvittaessa
    const combinedPrompt = `${answer1}\n${answer2}\n${answer3}\n${answer4}`;

    // Tarkista, onko käsiteltävää vihjettä
    if (combinedPrompt.trim() !== '') {
         // Tee pyyntö backendiin vihjeen käsittelyä varten
        try {
            const response = await fetch('http://localhost:5000', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: combinedPrompt })
            });

            if (response.ok) {
                const responseData = await response.json();
                const answer = responseData.bot.trim(); 
                // Näytä vastaus sivulla
                document.getElementById('aiResponse').innerText = answer;
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
