const mongodb = require("mongodb");
const dotenv = require('dotenv');

dotenv.config();
const mongoClient = mongodb.MongoClient;
const MONGO_URL = process.env.MONGO_URL;

const getflights = async (req, res) => {
    try {
        //Initiate connection
        let client = await mongoClient.connect(MONGO_URL);
        //Select db
        let db = client.db("BookMyTrip");
        //get all airports
        // db.flights.aggregate([{$match:{from:"MAA"}},{$unwind:'$destination'},{$match:{'destination.to':'BLR'}}]).pretty(){ from: req.body.from, "destination.to": req.body.to }
        let flightDetails = await db.collection('flights').aggregate([{ $match: { from: req.body.from } }, { $unwind: '$destination' }, { $match: { 'destination.to': req.body.to } }]).toArray();
        //CLose the connection
        await client.close();
        res.json({
            flightdetails: flightDetails
        })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!"
        })
    }
}

module.exports = getflights