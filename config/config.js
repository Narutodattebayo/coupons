const dotenv = require("dotenv")

dotenv.config({ path: process.cwd()+`/bin/.env.${process.env.NODE_ENV}` })
console.log(process.cwd()+`/bin/.env.${process.env.NODE_ENV}`)
const CONFIG = {
    NODE_ENV: process.env.NODE_ENV,
    DB_URI: process.env.DB_URI,
    APP_PORT: process.env.PORT,
}
module.exports={CONFIG}