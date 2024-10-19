# Nearby Businesses Custom Agent Skill for AnythingLLM

This custom agent skill allows users to find nearby businesses based on their queries using the Google Places API. It now supports more detailed information, reviews, and various search parameters.

## Features

- Searches for businesses based on user queries
- Provides business names, addresses, and ratings
- Supports searching within a specific radius
- Can filter for businesses open now
- Retrieves operating hours and reviews when requested
- Handles various types of queries including nearby locations and categorical searches

## Prerequisites

- Node.js 18+
- Yarn package manager
- AnythingLLM running in a supported environment
- Google Places API key with the following APIs enabled:
  - Places API
  - Place Details API

## Installation

1. Create a new folder named `nearby-businesses-skill` in your AnythingLLM storage directory under `plugins/agent-skills/`.

2. Copy the following files into this folder:
   - `plugin.json`
   - `handler.js`
   - `run.js` (for local testing)

3. Install required packages:
   ```
   yarn init -y
   yarn add axios dotenv
   ```

4. Create a `.env` file in the same folder and add your Google Places API key:
   ```
   GOOGLE_PLACES_API_KEY=your_api_key_here
   ```

## Configuration

1. Obtain a Google Places API key from the Google Cloud Console.
2. Enable the Places API and Place Details API for your project.
3. Add the API key to the skill's configuration in the AnythingLLM UI.

## Usage

You can use this skill by asking questions like:

- "Find Italian restaurants near Times Square, New York"
- "What are some coffee shops in downtown Seattle?"
- "Show me the top-rated bars within 2 km of my current location"
- "What are the operating hours of the Eiffel Tower?"
- "Find pharmacies open now in Chicago"
- "Show me reviews for the Museum of Modern Art in New York"
- "What are some popular tourist attractions in London?"

The skill will process these queries and return a list of relevant businesses with their details.

## Local Testing

To test the skill locally:

1. Ensure you have set up the `.env` file with your API key.
2. Run the following command in the skill's directory:
   ```
   yarn run test
   ```

This will run a series of test queries and display the results.

## Troubleshooting

- If you encounter any errors related to the API key, make sure it's correctly set in both the `.env` file (for local testing) and the AnythingLLM UI configuration.
- Ensure that your Google Places API key has the necessary permissions and quota for Text Search and Place Details requests.
- If you encounter any package-related issues, try deleting the `yarn.lock` file and `node_modules` directory, then run `yarn install` again.

## License

This custom agent skill is released under the MIT License.