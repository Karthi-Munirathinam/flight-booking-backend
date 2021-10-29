const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const register = require('./Modules/Register');
const resendverification = require('./Modules/ResendVerification');
const verifyemail = require('./Modules/VerifyEmail');

dotenv.config();
app.use(express.json());
app.use(cors({
    origin: '*'
}));

const PORT = process.env.PORT || 5000;


//Create User
app.post('/register', register)
//Resend verification link to activate account
app.post('/verifyaccount', resendverification)
//Email verification for account activation
app.post('/verifyemail', verifyemail)




app.listen(PORT, () => console.log(`App is listening to PORT:::${PORT}`))