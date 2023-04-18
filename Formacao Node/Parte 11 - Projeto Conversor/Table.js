class Table{
    constructor(arrayLinhas){
        this.header = arrayLinhas[0]
        arrayLinhas.shift();
        this.rows = arrayLinhas
    }

    //Campos virtuais -> get e set
    get RowCount(){
        return this.rows.lenght;
    }   
    
    get ColumnCount(){
        return this.header.lenght
    }
}

module.exports = Table