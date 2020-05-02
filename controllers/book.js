Car = require('../models/Car')
BookingDetails = require('../models/BookingDetails')
CustomerDetails = require('../models/CustomerDetails')
var collName = 'cars'

module.exports =  (req, res) => {

    if (!req.body) {
        return res.send("Parameters needed")
    }

    var carObject = new Car(req.body)

    var validation = carObject.validateVehicleNumber()
    if(!validation.response)
    return res.send(validation.reason)

    var bookingDetailsObject = new BookingDetails(req.body)


    var validation = bookingDetailsObject.validateIssueDate()
    if(!validation.response)
    return res.send(validation.reason)


    var validation = bookingDetailsObject.validateReturnDate()
    if(!validation.response)
    return res.send(validation.reason)

    var validation = bookingDetailsObject.validateBooking()
    if(!validation.response)
    return res.send(validation.reason)


    var customerDetailsObject = new CustomerDetails(req.body)

    var validation = customerDetailsObject.validateCustomerName()
    if(!validation.response)
    return res.send(validation.reason)

    var validation = customerDetailsObject.validateCustomerPhNo()
    if(!validation.response)
    return res.send(validation.reason)

    var db = req.db
    var collection = db.collection(collName)



    collection.findOne({ "vehicleNumber": req.body.vehicleNumber }, function (err, result) {
            if (result) {

                var canBeBooked = true

                if(result.bookings.length!=0){

                    result.bookings.forEach(element => {


                        start = new Date(element.issueDate)
                        bookingStart = new Date(bookingDetailsObject.issueDate)
                        bookingEnd = new Date(bookingDetailsObject.returnDate)
                        end = new Date(element.returnDate)


                        if((start <= bookingStart && bookingStart <= end )||(start <= bookingEnd && bookingEnd <= end ))
                        canBeBooked = false
                    });

                }

                //canBeBooked = false

                if(!canBeBooked)
                return res.send("Car is not available during the requested times")

                var booking = {
                    'custName': customerDetailsObject.customerName,
                    'custPhNo': customerDetailsObject.customerPhNo,
                    'issueDate': bookingDetailsObject.issueDate,
                    'returnDate': bookingDetailsObject.returnDate
                }

                collection.update({ "vehicleNumber": carObject.vehicleNumber},{$push:{"bookings" : booking}},function(err, result) {
                    if (err) throw err

                    return res.send("booking added successfully : "+req.body);
                })
            }

            else return res.send("vehicleNumber doesnt exist")
    });

}