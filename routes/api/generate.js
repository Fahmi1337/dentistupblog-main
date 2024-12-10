const { Configuration, OpenAIApi } = require('openai'); // Import OpenAI library

// Initialize OpenAI API with your API key
const configuration = new Configuration({
    apiKey: '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', // Replace with your OpenAI API key
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
