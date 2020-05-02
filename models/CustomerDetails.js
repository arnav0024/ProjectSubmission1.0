class CustomerDetails{
    
    constructor(object){

        if(object.customerName)
        this._customerName = object.customerName
        
        if(object.customerPhNo)
        this._customerPhNo = object.customerPhNo
    }

    get customerName(){
        return this._customerName
    }

    get customerPhNo(){
        return this._customerPhNo
    }

    set customerName(customerName){
        this._customerName = customerName
    }

    set customerPhNo(customerPhNo){
        this._customerPhNo = customerPhNo
    }

    validateCustomerName(){

        var response = true
        var reason

        if (this._customerName) {
            if (!typeof this._customerName == "string"){
                response = false
                reason = "customerName should be string"
            }
        }

        else{
            response = false
            reason = "customerName needed"
        }

        return {
            "response":response,
            "reason":reason
        }
    }

    validateCustomerPhNo(){

        var response = true
        var reason

        if (this._customerPhNo) {
            if (isNaN(this._customerPhNo)){
                response = false
                reason = "customerPhNo should be a number"
            }
        }

        else{
            response = false
            reason = "customerPhNo needed"
        }

        return {
            "response":response,
            "reason":reason
        }
    }


}

module.exports = CustomerDetails