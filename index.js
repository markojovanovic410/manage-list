const express = require('express');
const route = require('./routes/Route');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const BaseDao = require('./helper/BaseDao');
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

const MONGODB_URL = process.env.NODE_ENV === 'production' ?
    `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.efb3a.mongodb.net/first-api?retryWrites=true&w=majority`:
    "mongodb://localhost/27017";

app.use(bodyParser.json());

app.use('/api/v1', route);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('frontend/build'));
    app.get('/*',(req,res)=>{     
        res.sendFile (path.resolve(__dirname,'frontend','build',         
                    'index.html' ));    
    });
}

MongoClient.connect(
    MONGODB_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
).catch(err => {
    console.error(err.stack)
    process.exit()
}).then(async client => {
    BaseDao.injectDB(client);
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    })
})
