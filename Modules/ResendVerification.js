const mongodb = require("mongodb");
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const randomstring = require('randomstring');
const nodemailer = require('nodemailer');
dotenv.config();
const mongoClient = mongodb.MongoClient;
const MONGO_URL = process.env.MONGO_URL;

const resendverification = async (req, res) => {
    try {
        //Initiate connection
        let client = await mongoClient.connect(MONGO_URL);
        //Select db
        let db = client.db("BookMyTrip");
        //Check if user already exists
        let user = await db.collection('users').find({ email: req.body.email }).toArray();
        console.log(user)
        if (user && user[0].active === false) {
            //generate random string
            let randomString = randomstring.generate();
            //store random string
            let data = await db.collection('users').findOneAndUpdate({
                email: user[0].email
            }, {
                $set: {
                    activateAccountToken: randomString
                }
            });
            //send a mail using nodemailer
            //Create Transporter
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.MAIL_USERNAME,
                    pass: process.env.MAIL_PASSWORD
                }
            });
            //Mail options
            let mailOptions = {
                from: 'no-reply@noreply.com',
                to: `${user[0].email}`,
                subject: 'Email verification - BookMyTrip',
                html: `<h4>Hi ${user[0].firstName},</h4><p>We noticed that you recently created a BookMyTrip account. Click the below link to activate account.</p><a href="${process.env.FRONTEND_URL}/verifyemail?tk=${randomString}">Activate</a>`
            }
            //Send mail
            transporter.sendMail(mailOptions, (err, data) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('email sent successfully')
                }
            })
            //Close the connection
            await client.close();
            res.json({
                message: "User registered",
                userexists: false
            })
        }
        else {
            res.json({
                message: "User already exists!",
                userexists: true
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!"
        })
    }
}

module.exports = resendverification