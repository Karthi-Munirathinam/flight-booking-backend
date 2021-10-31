const mongodb = require("mongodb");
const dotenv = require('dotenv');

dotenv.config();
const mongoClient = mongodb.MongoClient;
const MONGO_URL = process.env.MONGO_URL;

const getbookings = async (req, res) => {
    try {
        //Initiate connection
        let client = await mongoClient.connect(MONGO_URL);
        //Select db
        let db = client.db("BookMyTrip");
        //get the user profile
        let getbookings = await db.collection('users').find({ _id: mongodb.ObjectId(req.body.userid) }).toArray()
        //CLose the connection
        await client.close();
        res.json({
            bookingsdetail: getbookings
        })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!"
        })
    }
}

module.exports = getbookings