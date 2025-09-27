// A simple Node.js backend for the AI agent
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// IMPORTANT: Replace this with your actual Gemini API key.
// Never expose this key in client-side code.
const GEMINI_API_KEY = "AIzaSyCeil1RRuySImAxPOO6bxh31VDRXms4JSc"; // <--- REPLACE WITH YOUR API KEY

if (!GEMINI_API_KEY) {
    console.error("Error: GEMINI_API_KEY is not set. Please add your API key to aiagent.js.");
    process.exit(1);
}

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=" + AIzaSyCeil1RRuySImAxPOO6bxh31VDRXms4JSc;

// Middleware setup
// Use bodyParser to parse JSON requests
app.use(bodyParser.json());
// Enable CORS for all origins to allow your frontend to connect
app.use(cors());

// A route to handle AI requests from the frontend
app.post('/ask-ai', async (req, res) => {
    try {
        // Extract the user's question from the request body
        const userQuestion = req.body.contents[0].parts[0].text;

        console.log(`Received question from frontend: "${userQuestion}"`);

        // Prepare the payload for the Gemini API call
        const payload = {
            contents: [{
                parts: [{
                    text: userQuestion
                }]
            }],
            tools: [{
                "google_search": {}
            }],
            systemInstruction: {
                parts: [{
                    text: "You are JARVIS, an expert agricultural AI assistant. Please provide helpful, accurate information about farming, crops, agriculture, and rural development. Keep responses concise and focused."
                }]
            },
        };

        // Make the POST request to the Gemini API
        const response = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        // Check for HTTP errors from the Gemini API
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Gemini API HTTP error! Status: ${response.status}, Message: ${errorText}`);
        }

        const data = await response.json();
        console.log("Successfully received response from Gemini API.");

        // Send the AI's response back to the frontend
        res.status(200).json(data);

    } catch (error) {
        console.error("Error processing AI request:", error);
        // Send a detailed error message back to the frontend
        res.status(500).json({
            error: "An error occurred while communicating with the AI.",
            details: error.message
        });
    }
});

// Serve the index.html file to test the backend directly
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`AI Agent backend listening at http://localhost:${port}`);
    console.log(`To use, update your frontend's GEMINI_URL to 'http://localhost:${port}/ask-ai'`);
});
