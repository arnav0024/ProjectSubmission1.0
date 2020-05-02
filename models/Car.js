mongoose = require('mongoose')
const {Model} = mongoose

BookingDetails = require('./BookingDetails')

class Car{


    constructor(object){

        if(object.vehicleNumber)
        this._vehicleNumber = object.vehicleNumber

        if(object.model)
        this._model = object.model

        if(object.seatingCapacity)
        this._seatingCapacity = object.seatingCapacity

        if(object.rentPerDay)
        this._rentPerDay = object.rentPerDay

        if(object.bookings)
        this._bookingDetails = object.bookings
    }

    get vehicleNumber(){
        return this._vehicleNumber
    }

    get model(){
        return this._model
    }

    get seatingCapacity(){
        return this._seatingCapacity
    }

    get rentPerDay(){
        return this._rentPerDay
    }

    get bookingDetails(){
        return this._bookingDetails
    }

    set vehicleNumber(vehicleNumber){
        this._vehicleNumber = vehicleNumber 
    }

    set model(model){
        this._model = model 
    }

    set seatingCapacity(seatingCapacity){
        this._seatingCapacity = seatingCapacity 
    }

    set rentPerDay(rentPerDay){
        this._rentPerDay = rentPerDay 
    }

    set bookingDetails(bookingDetails){
        this._bookingDetails = bookingDetails
    }

    validateVehicleNumber(){

        var response = true
        var reason

        if (this._vehicleNumber) {
            if (!typeof this._vehicleNumber == "string"){
                response = false
                reason = "vehicleNumber not a string"
            }
        }

        else{
            response = false
            reason = "vehicleNumber needed"
        }

        return {
            "response":response,
            "reason":reason
        }
    }

    validateModel(){

        var response = true
        var reason

        if (this._model) {
            if (!typeof this._model == "string"){
                response = false
                reason = "model not a string"
            }
        }

        else{
            response = false
            reason = "model needed"
        }

        return {
            "response":response,
            "reason":reason
        }
    }

    validateSeatingCapacity(){

        var response = true
        var reason

        if (this._seatingCapacity) {
            if (isNaN(this._seatingCapacity)){
                response = false
                reason = "seatingCapacity should be a number"
            }
        }
        else{
            response = false
            reason = "seatingCapacity needed"
        }

        return {
            "response":response,
            "reason":reason
        }
    }

    validateRentPerDay(){

        var response = true
        var reason

        if (this._rentPerDay) {
            if (isNaN(this._rentPerDay)){
                response = false
                reason = "rentPerDay should be a number"
            }
        }

        else{
            response = false
            reason = "rentPerDay needed"
        }

        return {
            "response":response,
            "reason":reason
        }
    }



    toString(){
        return {
            'vehicleNumber': this._vehicleNumber,
            'model': this._model,
            'seatingCapacity': this._seatingCapacity,
            'rentPerDay': this._rentPerDay,
            'bookings':this._bookingDetails
        }
    }
}

module.exports = Car