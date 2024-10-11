// File: run.js
require('dotenv').config();
const { runtime } = require('./handler');

async function testSkill() {
    const mockContext = {
        runtimeArgs: {
            GOOGLE_PLACES_API_KEY: process.env.GOOGLE_PLACES_API_KEY
        },
        introspect: console.log,
        logger: console.error
    };

    const testQueries = [
        "Italian restaurants near Times Square, New York",
        "Coffee shops in downtown Seattle",
        "24-hour pharmacies in Chicago"
    ];

    for (const query of testQueries) {
        console.log(`Testing query: "${query}"`);
        try {
            const result = await runtime.handler.call(mockContext, { query });
            console.log(result);
        } catch (error) {
            console.error(`Error testing query "${query}":`, error);
        }
        console.log('\n---\n');
    }
}

if (require.main === module) {
    testSkill();
}

module.exports = { testSkill };