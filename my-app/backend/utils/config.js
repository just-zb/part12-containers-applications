require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI
let SECRET=process.env.SECRET

module.exports = {
    MONGODB_URI,
    PORT,
    SECRET,
}