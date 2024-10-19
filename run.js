// File: run.js
require('dotenv').config();
const { runtime } = require('./handler');

async function testSkill() {
    const mockContext = {
        runtimeArgs: {
            GOOGLE_PLACES_API_KEY: process.env.GOOGLE_PLACES_API_KEY
        },
        introspect: console.log,
        logger: console.error,
        config: {
            name: "Nearby Businesses Skill",
            version: "1.2.0"
        }
    };

    const testQueries = [
        {
            description: "Basic query",
            params: { query: "Italian restaurants near Times Square, New York" }
        },
        {
            description: "Query with radius and current location",
            params: {
                query: "coffee shops",
                location: "current",
                radius: 1000
            }
        },
        {
            description: "Query for open businesses",
            params: {
                query: "pharmacies in Chicago",
                open_now: true
            }
        },
        {
            description: "Query with operating hours",
            params: {
                query: "Eiffel Tower",
                details: ["operating_hours"]
            }
        },
        {
            description: "Query with reviews",
            params: {
                query: "Museum of Modern Art New York",
                details: ["reviews"]
            }
        },
        {
            description: "Query for specific place type",
            params: {
                query: "tourist attractions in London",
                type: "tourist_attraction"
            }
        }
    ];

    for (const test of testQueries) {
        console.log(`\nTesting: ${test.description}`);
        console.log(`Parameters: ${JSON.stringify(test.params)}`);
        try {
            const result = await runtime.handler.call(mockContext, test.params);
            console.log("Result:");
            console.log(result);
        } catch (error) {
            console.error(`Error testing query:`, error);
        }
        console.log('\n---\n');
    }
}

if (require.main === module) {
    testSkill();
}

module.exports = { testSkill };