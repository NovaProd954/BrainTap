import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY;
if (!apiKey) {
    // In a real app, you might want to show a more user-friendly error
    // or disable functionality instead of throwing an error.
    console.error("API_KEY environment variable not set. Please set it in your environment.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || '' });
const model = "gemini-2.5-flash";

export const getExplanation = async (topic: string): Promise<string> => {
    if (!apiKey) return "API Key is missing. Please configure it to use the app.";

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
            model,
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error fetching explanation:", error);
        return "Sorry, I had trouble explaining that. There might be an issue with the API configuration. Please try again later!";
    }
};

export const getBrainBoost = async (): Promise<string> => {
    if (!apiKey) return "API Key is missing. Please configure it to use the app.";
    
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
            model,
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error fetching brain boost:", error);
        return "Sorry, my brain is taking a little break. There might be an issue with the API configuration. Please try again!";
    }
};
