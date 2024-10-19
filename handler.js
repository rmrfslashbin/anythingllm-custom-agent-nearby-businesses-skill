const axios = require('axios');

module.exports.runtime = {
    handler: async function ({ query, location, radius, details, open_now, type }) {
        const callerId = `${this.config.name}-v${this.config.version}`;
        const apiKey = this.runtimeArgs["GOOGLE_PLACES_API_KEY"];
        if (!apiKey) {
            return "Error: Google Places API key is not set.";
        }

        try {
            this.introspect(`Processing query: ${query}`);

            let url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${apiKey}`;

            if (location === 'current') {
                // In a real implementation, you'd get the user's location
                // For this example, we'll use a default location
                url += '&location=40.7128,-74.0060';
            }

            if (radius) {
                url += `&radius=${radius}`;
            }

            if (open_now) {
                url += '&opennow';
            }

            if (type) {
                url += `&type=${type}`;
            }

            const response = await axios.get(url);
            const results = response.data.results.slice(0, 5);

            if (results.length === 0) {
                return "I couldn't find any businesses matching your query. Could you please try a different search or provide more details?";
            }

            let responseText = `Here are some businesses matching your query "${query}":\n\n`;

            for (let i = 0; i < results.length; i++) {
                const place = results[i];
                responseText += `${i + 1}. ${place.name}\n`;
                responseText += `   Address: ${place.formatted_address}\n`;

                if (place.rating) {
                    responseText += `   Rating: ${place.rating} (${place.user_ratings_total} reviews)\n`;
                }

                if (details && details.includes('operating_hours')) {
                    const detailsResponse = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=opening_hours&key=${apiKey}`);
                    const hours = detailsResponse.data.result.opening_hours;
                    if (hours && hours.weekday_text) {
                        responseText += '   Operating Hours:\n';
                        hours.weekday_text.forEach(day => {
                            responseText += `     ${day}\n`;
                        });
                    }
                }

                if (details && details.includes('reviews')) {
                    const detailsResponse = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=reviews&key=${apiKey}`);
                    const reviews = detailsResponse.data.result.reviews;
                    if (reviews && reviews.length > 0) {
                        responseText += '   Top Review:\n';
                        responseText += `     "${reviews[0].text.substring(0, 100)}..."\n`;
                        responseText += `     Rating: ${reviews[0].rating}/5\n`;
                    }
                }

                responseText += '\n';
            }

            return responseText;
        } catch (error) {
            this.logger(`Error in nearby businesses search: ${error.message}`);
            return `I encountered an error while searching for businesses: ${error.message}. Could you please try rephrasing your query?`;
        }
    }
};