class Processor{
    //Lembrar: metodo estatico é um metodo que eu posso utilza-lo direto pela classe, sem precisar instanciar um objeto
    static Process(data){
        let linhas = data.split("\r\n");
        let separaColunas = []
        linhas.forEach(linha => {
            let a = linha.split(",")
            separaColunas.push(a)
        });

        return separaColunas;
    }
}

module.exports = Processor