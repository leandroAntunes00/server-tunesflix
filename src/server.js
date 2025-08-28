import dotenv from 'dotenv';

// Load environment variables FIRST
dotenv.config();

import app from './app.js';

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
