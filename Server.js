const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const register = require('./Modules/Register');
const resendverification = require('./Modules/ResendVerification');
const verifyemail = require('./Modules/VerifyEmail');
const login = require('./Modules/Login');
const forgotpassword = require('./Modules/ForgotPassword')
const resetpassword = require('./Modules/ResetPassword')
const changepassword = require('./Modules/ChangePassword')

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

//Login
app.post('/login', login)
//Forgotpassword
app.post('/forgotpassword', forgotpassword);
//reset password
app.post('/resetpassword', resetpassword)
//Change password
app.post('/changepassword', changepassword)




app.listen(PORT, () => console.log(`App is listening to PORT:::${PORT}`))