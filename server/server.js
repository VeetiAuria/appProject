//tuodaan käyttöön tarvittavat moduulit.
import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import OpenAI from 'openai';

dotenv.config();

//Luodaan uusi OpenAI-olio ja annetaan sille OpenAI:n API-avain
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

//Express-sovellus, otetaan käyttöön CORS ja määritetään, että sovellus käsittelee JSON-muotoista dataa.
const app = express();
app.use(cors());
app.use(express.json());


//Määritellään GET-reitti juureen (/). Palautetaan vastauksena "Hello World!" -viesti.
app.get('/', async (req, res) => {
    res.status(200).send({
        message: 'Hello World!',
    })
});

app.post('/', async (req, res) => {
    try {
        const prompt = req.body.prompt;
        const instruction = `
        Your job is to find a good job for the user based on their answers. Provide 8 job descriptions in your answer, ranking them so that the first is the most relevant, and the eighth is the least relevant. If the user provides inappropriate, self-harm, drug-related, sexual, racist, slurs, or any non-job-related answers, DO NOT respond to them. Guide the users to answer properly if the answers are not valid. Answer in the same language what user has inserted in the answer.
        `;

        const chatCompletion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: instruction },
                { role: "user", content: prompt }],
            model: "gpt-3.5-turbo",
            max_tokens: 250,
        });

        if (chatCompletion.choices && chatCompletion.choices.length > 0 && chatCompletion.choices[0].message.content) {
            res.status(200).send({
                bot: chatCompletion.choices[0].message.content
            });
        } else {
            console.error('Unexpected response structure from OpenAI:', chatCompletion);
            res.status(500).send('Received an unexpected response structure from the AI.');
        }
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        res.status(500).send('Something went wrong with processing your request.');
    }
    console.log('Received prompt:', req.body.prompt);
});

// Sovellus laitetaan kuuntelemaan määriteltyä porttia. Jos PORT-ympäristömuuttujaa ei ole asetettu, käytetään oletusarvoa 5000.
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port http://localhost:${port}`));

