import mongoose from 'mongoose'

export function cleanDB() {
  afterEach(() => {
    mongoose.connect("mongodb://localhost/scram", () => mongoose.connection.db.dropDatabase())
  });
}

