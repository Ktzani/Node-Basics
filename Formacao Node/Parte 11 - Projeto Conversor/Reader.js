const fs = require("fs")
const util = require("util")

//Promisify -> permite transformar uma funçao velha com callback, que não é promise, em promise, nos permitindo trabalhar com async/await
//Exemplo: var novaFuncaoComPromise = util.promisify(funcaoVelhaComCallback)

class Reader {
    constructor(){
        this.reader = util.promisify(fs.readFile);
    }

    async Read(filepath){
        try {
            return await this.reader(filepath, "utf8")
        } catch (error) {
            return undefined;
        }
        
    }
}

module.exports = Reader;