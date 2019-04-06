export function serverResponse() {
    const MongoClient = require('mongodb').MongoClient;
    // const assert = require('assert');

    // const url = 'mongodb+srv://mike_petrov:Misha159753!@dsxt-sj4ui.mongodb.net/test?retryWrites=true';
    const url = 'mongodb://root:asdrqwerty09@invo-shard-00-00-guyjh.mongodb.net:27017,invo-shard-00-01-guyjh.mongodb.net:27017,invo-shard-00-02-guyjh.mongodb.net:27017/INVO?ssl=true&replicaSet=INVO-shard-0&authSource=admin';

    MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
        // assert.equal(null, err);

        console.log(client);

        // client.then(res=>{console.log(res)});

        client.db('uple').collection('test').findOne({}, function (err, res) {
            console.log(res)
        });

        client.close();
    });

    // const mongoose = require('mongoose')
    //
    // mongoose.Promise = global.Promise
    //
    // mongoose.Promise.coonnect('mongodb://localhost/', {
    // 	useMongoClient: true
    // }).then(() => console.log('Her')).catch(e => console.log(e))
}
