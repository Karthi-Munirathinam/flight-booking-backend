const mongodb = require("mongodb");
const dotenv = require('dotenv');

dotenv.config();
const mongoClient = mongodb.MongoClient;
const MONGO_URL = process.env.MONGO_URL;

const bookticket = async (req, res) => {
    try {
        //Initiate connection
        let client = await mongoClient.connect(MONGO_URL);
        //Select db
        let db = client.db("BookMyTrip");
        //get the flight details thru flight no
        // db.flights.aggregate([{$match:{_id: mongodb.ObjectId('617be83dfe479d1e236b42dd')}},{$unwind:'$mybookings'},{$match:{'mybookings.pnr':req.body.pnr}},])myCollection.findOneAndUpdate({"_id": docId, "steps.name": "foo"},
        // { $set: { "steps.$.state": "P" } })
        console.log(req.body.pnr)
        let bookticket = await db.collection('users').findOneAndUpdate({ _id: mongodb.ObjectId(req.body.userid), 'mybookings.PNR': req.body.pnr }, {
            $set: {
                "mybookings.$.bookingstatus": true
            }
        });
        // console.log(bookticket)
        //CLose the connection
        await client.close();
        res.json({
            message: 'success'
        })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!"
        })
    }
}

module.exports = bookticket