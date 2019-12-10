const MongoDB = require('mongodb');

const uri = process.env.MONGO_CONNECTION_STRING;

const client = new MongoDB.MongoClient(uri, {
  useNewUrlParser: true,
});

client.connect(err => {
  const collection = client.db('belay_test').collection('belay_test');
  // perform actions on the collection object
  client.close();
});
module.exports = client;
