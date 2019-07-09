// Planning de Garde Level 4 

const data = require("./data.json");

    //Price class
    class Price {
        constructor() {
        
        //global pdg Fee
        this.pdg_fee = 0;
        //number of shift interim
        this.interim_shifts = 0;
        //output json
        this.outputData = null;

        this.outputData = {
            "workers": data.workers.map((worker) => this.computePrice(worker)),
            "commission": {
                "pdg_fee": this.pdg_fee,
                "interim_shifts": this.interim_shifts
            }
        };

        console.log(this.outputData);   
    }
    
    /**
        * Compute price according a worker
        * @param worker A given worker
        * @return {int} Price of a shift worker
    */
    computePrice(worker) {
        let id = worker.id;
        let status = worker.status;
        let shift_number = 0;

        const statusPrice = {"medic": 270, "interne":126, "interim": 480};

        for (let shift of data.shifts) {
            let day = new Date(shift.start_date);
            let current_day = day.getDay();
            // Sunday: 0 - Saturday : 6

            if (shift.user_id == id) {
                shift_number ++;
                //double price for Sunday and Saturday
                if (current_day == 0 || current_day == 6){
                    shift_number ++;
                }

                if (status === "interim"){
                    this.pdg_fee = this.pdg_fee + 80;
                    this.interim_shifts ++;
                }
            }           
        }
        //compute the fee
        this.pdg_fee = this.pdg_fee + (5 * (shift_number * statusPrice[status])) / 100;
        
        return {"id": id, "price": statusPrice[status] * shift_number}
    }
 }

 module.exports = Price;
