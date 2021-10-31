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
const airports = require('./Modules/Airports')
const getflights = require('./Modules/GetFlights');
const flightdetails = require('./Modules/FlightDetails');
const bookingdetails = require('./Modules/BookingDetails');
const bookticket = require('./Modules/BookTicket');
const authenticate = require('./Modules/Authenticate')
const sendticket = require('./Modules/SendTicket');
const getbookings = require('./Modules/GetBookings')

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

//Get all available airports
app.get('/airports', airports);
//Get all flights for given FROM and TO
app.post('/flights', getflights);
//Get flight details for given flight number
app.post('/flightdetails', flightdetails);
//Update booking details for given user
app.post('/bookingdetails', authenticate, bookingdetails);
//Update book ticket for given user
app.post('/bookticket', authenticate, bookticket);
//Send booked ticket to user
app.post('/sendticket', authenticate, sendticket);
//get bookings of a  user
app.get('/getbookings', authenticate, getbookings);



app.listen(PORT, () => console.log(`App is listening to PORT:::${PORT}`))