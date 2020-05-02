Car = require('../models/Car')
var collName = 'cars'

module.exports =  (req, res) => {

    var carObject = new Car(req.body)

    var validation = carObject.validateVehicleNumber()
    if(!validation.response)
    return res.send(validation.reason)

    var db = req.db
    var collection = db.collection(collName)
    

        collection.findOne({ "vehicleNumber": carObject.vehicleNumber }, function (err, result) {
            if (result) {

                var carObject2 = new Car(result)
                return res.send(carObject2.toString())


            }
            else return res.send("vehicleNumber doesnt exist")
    });





}