// Planning de Garde Level 1 

const data = require("./data.json");

/**
    * Compute price according a worker
    * @param worker A given worker
	* @return {int} Price of a shift worker
*/
function computePrice(worker) {
    let id = worker.id;
    let price_per_shift = worker.price_per_shift;
    let shift_number = 0;

    for (let shift of data.shifts) {
        if (shift.user_id == id) {
            shift_number ++;
        }
    }
    return {"id": id, "price": price_per_shift * shift_number}
}

let outputData = {
    "workers": data.workers.map((worker) => computePrice(worker))
};

console.log(outputData);