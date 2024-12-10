const { Configuration, OpenAIApi } = require('openai'); // Import OpenAI library

// Initialize OpenAI API with your API key
const configuration = new Configuration({
    apiKey: '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', 
});
const openai = new OpenAIApi(configuration);

// Define the generate function
const generate = async (prompt) => {
    try {
        // Call OpenAI's ChatGPT model
        const response = await openai.createChatCompletion({
            model: 'gpt-4o-mini', // Specify the model
            messages: [
                { role: 'user', content: prompt },
            ],
        });

        // Return the assistant's response
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error generating response:', error.message);
        throw new Error('Failed to generate response');
    }
};

// Export the generate function
module.exports = generate;
