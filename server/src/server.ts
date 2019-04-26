import mongoose from 'mongoose';
import app from './app';

const mongoURI: string = `mongodb+srv://${process.env.MONGO_USER}:${
  process.env.MONGO_PASSWORD
}@cluster0-zmcyw.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true`;

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(result => {
    app.listen(8080);
  })
  .catch(err => console.log(err));
