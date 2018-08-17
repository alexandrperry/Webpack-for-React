 const express = require('express');
 const path = require('path');
 const indexPath = path.join(__dirname,'client/dist', 'index.html')
 const publicPath = express.static(path.join(__dirname, 'client/dist'));



 const mongoose = require('mongoose');
 const bodyParser = require('body-parser')
 const cookieParser = require('cookie-parser');
 const session = require('express-session');



 const app = express();

 const uri = '';

 const options = {
     useMongoClient: true,
     autoIndex: false,
     reconnectTries: Number.MAX_VALUE,
     reconnectInterval: 500,
     poolSize: 10,
     bufferMaxEntries: 0
 };

 mongoose.Promise = require('bluebird');
 mongoose.connect(uri, options).then(
     () => { console.log('successful connect ') },
     err => { console.log(err)}
 );

 app.use(bodyParser.json())
 app.use(bodyParser.urlencoded({ extended: false }));



 app.use(cookieParser());
 app.use(session({
     secret: 'secret',
     resave: false
 }));



 app.use(publicPath);

 app.get('/', function (req, res) {
     res.sendFile(indexPath);
 });


 app.get('*', function (req, res) {
     res.sendFile(indexPath);

 });





app.listen(process.env.PORT || 3000);



