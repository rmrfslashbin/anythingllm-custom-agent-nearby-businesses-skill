const axios = require('axios');

module.exports.runtime = {
    handler: async function ({ query }) {
        const apiKey = this.runtimeArgs["GOOGLE_PLACES_API_KEY"];
        if (!apiKey) {
            return "Error: Google Places API key is not set.";
        }

        try {
            this.introspect(`Processing query: ${query}`);

            // Use the Places API Text Search to handle the query
            const textSearchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${apiKey}`;
            const textSearchResponse = await axios.get(textSearchUrl);

            const results = textSearchResponse.data.results.slice(0, 5); // Limit to top 5 results

            if (results.length === 0) {
                return "I couldn't find any businesses matching your query. Could you please try a different search or provide more details?";
            }

            let responseText = `Here are some businesses matching your query "${query}":\n\n`;
            results.forEach((place, index) => {
                responseText += `${index + 1}. ${place.name}\n`;
                responseText += `   Address: ${place.formatted_address}\n`;
                if (place.rating) {
                    responseText += `   Rating: ${place.rating} (${place.user_ratings_total} reviews)\n`;
                }
                responseText += '\n';
            });

            return responseText;
        } catch (error) {
            this.logger(`Error in nearby businesses search: ${error.message}`);
            return `I encountered an error while searching for businesses: ${error.message}. Could you please try rephrasing your query?`;
        }
    }
};
