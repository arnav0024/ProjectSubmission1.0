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

                if(result.bookings.length > 0)
                return res.send("Car has booking(s). Cannot be updated.")

                else{

                    collection.updateOne({"vehicleNumber": carObject.vehicleNumber },{$set:{
                        'vehicleNumber': carObject.vehicleNumber,
                        'model': carObject.model,
                        'seatingCapacity': carObject.seatingCapacity,
                        'rentPerDay': carObject.rentPerDay,
                    }},function(err,result){
                        if(result)
                        return res.send("car updated successfully :"+req.body.vehicleNumber)
                    })

                }
            }
            else return res.send("vehicleNumber doesnt exist")
    });




}