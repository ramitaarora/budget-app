import { OpenAI } from "openai";
import cookie from 'cookie';

export default async function chatHandler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { message } = req.body;

    try {
        const { auth_token } = cookie.parse(req.headers.cookie || '');
        if (!auth_token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const initialPrompt = {
            role: "assistant",
            content: "I am here to be your financial advisor. I will help with budget planning, tracking and managing expenses, and reaching savings goals."
        }

        const userMessage = {
            role: "user",
            content: message
        }

        const gptResponse = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [initialPrompt, userMessage],
            max_tokens: 200,
        });

        res.status(200).json({ response: gptResponse.choices[0].message.content });
    } catch (error) {
        console.error('Error handling the request:', error);
        console.error('Error Details:', error.response?.data || error.message);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}
