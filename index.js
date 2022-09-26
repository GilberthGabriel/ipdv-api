import dotenv from 'dotenv';
import app from './src/app';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

app.listen(3001, () => {
  console.log('Server is running on port 3000');
});
