
import { GoogleGenAI } from "@google/genai";

// As per the project guidelines, the API key must be read directly from the environment variable.
// We assume `process.env.API_KEY` is always available in the execution environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getExplanation = async (topic: string): Promise<string> => {
    const prompt = `
        Explain the following topic or question in the simplest way possible, as if you are a friendly and encouraging teacher explaining it to a 14-year-old student.
        - Use short, easy-to-understand sentences.
        - Break down complex ideas into clear, numbered or bulleted steps.
        - Use real-life, relatable examples or analogies.
        - If it's a math or science problem, show the step-by-step reasoning clearly.
        - Maintain a positive and patient tone.
        - At the very end, provide a single, concise summary sentence labeled exactly like this:

        **Key Idea:** [Your one-sentence summary here]

        Topic/Question: "${topic}"
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error fetching explanation:", error);
        return "Sorry, I had trouble explaining that. There might be an issue with the API configuration. Please try again later!";
    }
};

export const getBrainBoost = async (): Promise<string> => {
    const prompt = `
        Generate a single, short, and interesting "Brain Boost".
        This can be a random educational fact, a practical life skill, or a quick study tip.
        - It must be under 60 words.
        - Write it in a fun, motivating, and encouraging tone.
        - Make it something a student would find genuinely cool or useful.
        - Do not include any preamble or labels, just the text of the brain boost itself.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error fetching brain boost:", error);
        return "Sorry, my brain is taking a little break. There might be an issue with the API configuration. Please try again!";
    }
};
