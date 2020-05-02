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

                if(result.bookings.length > 0)
                return res.send("Car has booking(s). Cannot be delete.")

                else{

                    collection.deleteOne({"vehicleNumber": carObject.vehicleNumber},function(err,result){
                        if(result)
                        return res.send("car deleted successfully :"+req.body.vehicleNumber)
                    })

                }
            }
            else return res.send("vehicleNumber doesnt exist")
    });



}