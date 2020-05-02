Car = require('../models/Car')
var collName = 'cars'

module.exports =  (req, res) => {

    var carObject = new Car(req.body)

    var validation = carObject.validateVehicleNumber()
    if(!validation.response)
    return res.send(validation.reason)

    var validation = carObject.validateModel()
    if(!validation.response)
    return res.send(validation.reason)

    var validation = carObject.validateSeatingCapacity()
    if(!validation.response)
    return res.send(validation.reason)

    var validation = carObject.validateRentPerDay()
    if(!validation.response)
    return res.send(validation.reason)


    var db = req.db
    var collection = db.collection(collName)


    collection.findOne({ "vehicleNumber": carObject.vehicleNumber }, function (err, result) {
        if (result) {
            return res.send("Vehicle with same vehicleNumber already exists")
        }
    
        else {
        
            var carObj = {
                'vehicleNumber': carObject.vehicleNumber,
                'model': carObject.model,
                'seatingCapacity': carObject.seatingCapacity,
                'rentPerDay': carObject.rentPerDay,
                'bookings':[]
            }
        
            collection.insertOne(carObj,function(err, result) {
                if (err) throw err
            
                return res.send("Car added successfully");
            })
        }
    });

}