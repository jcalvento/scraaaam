import mongoose from 'mongoose'
import app from './app'

mongoose.connect('mongodb://localhost/scram');

const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});