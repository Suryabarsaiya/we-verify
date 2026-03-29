const axios = require('axios');
require('dotenv').config();

const apiKey = process.env.GEMINI_API_KEY;

axios.post('https://generativelanguage.googleapis.com/v1beta/openai/chat/completions', {
  model: 'gemini-2.5-flash',
  messages: [{ role: 'user', content: 'hello' }],
  temperature: 0.2,
  max_tokens: 4096
}, {
  headers: {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json'
  }
}).then(res => {
  console.log('SUCCESS:', res.data);
}).catch(err => {
  console.error('ERROR RESPONSE:', err.response?.data);
});
