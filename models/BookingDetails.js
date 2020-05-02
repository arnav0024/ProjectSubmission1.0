CustomerDetails = require('./CustomerDetails')
moment = require('moment')

class BookingDetails{

    constructor(object){
        // this._customerDetails = new CustomerDetails(customerDetails)
        // this._customerName = this._customerDetails.customerName
        // this._customerPhNo = this._customerDetails.customerPhNo
        if(object.issueDate)
        this._issueDate = object.issueDate
        
        if(object.returnDate)
        this._returnDate = object.returnDate
    }

    get customerDetails(){
        return this._customerDetails
    }

    // get customerName(){
    //     return this._customerName
    // }

    // get customerPhNo(){
    //     return this._customerPhNo
    // }

    get issueDate(){
        return this._issueDate
    }

    get returnDate(){
        return this._returnDate
    }

    set customerDetails(customerDetails){
        this._customerDetails = customerDetails
    }

    // set customerName(customerName){
    //     this._customerName = customerName
    // }

    // set customerPhNo(customerPhNo){
    //     this._customerPhNo = customerPhNo
    // }

    set issueDate(issueDate){
        this._issueDate = issueDate
    }

    set returnDate(returnDate){
        this._returnDate = returnDate
    }



    validateIssueDate(){

        var response = true
        var reason

        if (this._issueDate) {
            if (!moment(this._issueDate, moment.ISO_8601, true).isValid()){
                response = false
                reason = "Invalid format of issueDate. Use (YYYY-MM-DDTHH-MM-SS)"
                
            }
        }
        else{
            response = false
            reason = "issueDate needed"
        }

        return {
            "response":response,
            "reason":reason
        }
    }

    validateReturnDate(){

        var response = true
        var reason

        if (this._returnDate) {
            if (!moment(this._returnDate, moment.ISO_8601, true).isValid()){
                response = false
                reason = "Invalid format of returnDate. Use (YYYY-MM-DDTHH-MM-SS)"
            }
        }

        else{
            response = false
            reason = "returnDate needed"
        }

        return {
            "response":response,
            "reason":reason
        }
    }


    validateBooking(){

        var response = true
        var reason

        if (new Date(this._returnDate) < new Date(this._issueDate)) {
            response = false
            reason = "returnDate should be greater than issueDate"
            
        }

        return {
            "response":response,
            "reason":reason
        }

    }


}

module.exports = BookingDetails