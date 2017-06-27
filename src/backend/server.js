import mongoose from 'mongoose'
import app from './app'

mongoose.connect(process.env.DATABASE_URL);

const port = process.env.SERVER_PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});