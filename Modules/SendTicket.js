const mongodb = require("mongodb");
const dotenv = require('dotenv');

dotenv.config();
const mongoClient = mongodb.MongoClient;
const MONGO_URL = process.env.MONGO_URL;

const sendticket = async (req, res) => {
    try {
        //Initiate connection
        let client = await mongoClient.connect(MONGO_URL);
        //Select db
        let db = client.db("BookMyTrip");

        let sendticket = await db.collection('users').aggregate([
            { $match: { _id: mongodb.ObjectId(req.body.userid) } },
            { $unwind: '$mybookings' },
            { $match: { 'mybookings.PNR': req.body.pnr } }
        ]).toArray()
        // console.log(sendticket)
        //CLose the connection
        await client.close();
        res.json({
            ticketdetails: sendticket
        })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!"
        })
    }
}

module.exports = sendticket