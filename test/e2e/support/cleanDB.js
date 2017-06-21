import mongoose from 'mongoose'

export function cleanDB() {
  afterEach(() => {
    // TODO: FIX with docker
    mongoose.connect(process.env.DATABASE_URL, () => mongoose.connection.db.dropDatabase())
  });
}

