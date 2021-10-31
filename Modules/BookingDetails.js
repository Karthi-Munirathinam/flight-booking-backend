const mongodb = require("mongodb");
const dotenv = require('dotenv');

dotenv.config();
const mongoClient = mongodb.MongoClient;
const MONGO_URL = process.env.MONGO_URL;

const bookingdetails = async (req, res) => {
    try {
        //Initiate connection
        let client = await mongoClient.connect(MONGO_URL);
        //Select db
        let db = client.db("BookMyTrip");
        //get the flight details thru flight no
        let bookingDetails = await db.collection('users').findOneAndUpdate({ _id: mongodb.ObjectId(req.body.userid) },
            {
                $addToSet: {
                    mybookings: {
                        $each:
                            [
                                {
                                    from: req.body.from,
                                    to: req.body.to,
                                    PNR: req.body.pnr,
                                    airline: req.body.airline,
                                    flightno: req.body.flightno,
                                    travellersdetails: req.body.travellersdetails,
                                    departure: req.body.departure,
                                    arrival: req.body.arrival,
                                    date: req.body.date,
                                    bookingdate: new Date(),
                                    bookingstatus: false
                                }
                            ]
                    }
                }
            })
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

module.exports = bookingdetails