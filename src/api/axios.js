// const dotenv = require('dotenv').config();
import axios from "axios";

// export default axios.create({ baseURL: "http://localhost:5000" });
export default axios.create({
    baseURL: "https://contact-manager-api-2irc.onrender.com:10000",
});
