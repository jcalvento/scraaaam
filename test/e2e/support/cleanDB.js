import mongoose from 'mongoose'

export function cleanDB() {
  afterEach(() => {
    mongoose.connect(process.env.DATABASE_URL, () => mongoose.connection.db.dropDatabase())
  });
}

