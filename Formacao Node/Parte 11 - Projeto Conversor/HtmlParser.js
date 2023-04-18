let ejs = require("ejs")

class HtmlParser {
    constructor(){
       
    }

    static async Parse(table){
        try {
            return await ejs.renderFile("./table.ejs", {
                header: table.header,
                rows: table.rows
            })
        } catch (error) {
            console.log(error)
            return undefined
        }
        
    }
}

module.exports = HtmlParser;