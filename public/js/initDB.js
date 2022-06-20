const { mongoose, connect } = require("mongoose");
const { config } = require("dotenv");

module.exports = () => {
 config(); //invoking the dotenv config here
 const uri = process.env.URI;

 connect(uri, {
        dbName: process.env.DATABASE,
        user: process.env.USERNAME,
        pass: process.env.PASSWORD,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => {
            console.log('Connection estabislished with MongoDB');
        })
        .catch(error => console.error(error.message));
}
