// Planning de Garde Level 2 

const data = require("./data.json");

/**
    * Compute price according a worker
    * @param worker A given worker
	* @return {int} Price of a shift worker
*/
function computePrice(worker) {
    let id = worker.id;
    let status = worker.status;
    let shift_number = 0;
    const statusPrice = {"medic": 270, "interne":126};

    for (let shift of data.shifts) {
        if (shift.user_id == id) {
            shift_number ++;
        }
    }
    return {"id": id, "price": statusPrice[status] * shift_number}
}

let outputData = {
    "workers": data.workers.map((worker) => computePrice(worker))
};

console.log(outputData);