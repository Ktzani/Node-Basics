const fs = require("fs");
const util = require("util")

class Writter{
    constructor(){
        this.writter = util.promisify(fs.writeFile)
    }

    async Write(filename, data){
        try {
            await this.writter(filename, data);
            return true;
        } catch (error) {
            console.log(error)
            return false;
        }
        
    }
}

module.exports = Writter