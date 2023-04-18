//Arquivo CSV: 
//- colunas sao separadas por virgula
//- linhas separadas por quebra de linha  
const Reader = require("./Reader");
const Processor = require("./Processor");
const Table = require("./Table");
const HtmlParser = require("./HtmlParser.js");
const Writter = require("./Writter");
const PDFWritter = require("./PDFWritter");

let leitor = new Reader();
let escritor = new Writter();

async function main() {
    const dados = await leitor.Read("./users.csv");

    let dadosProcessados = Processor.Process(dados);

    let usuarios = new Table(dadosProcessados);

    let html = await HtmlParser.Parse(usuarios)

    await escritor.Write(`./arquivosHtml/${Date.now()}.html`, html)
    PDFWritter.WritePDF(`./arquivosPdf/${Date.now()}.PDF`, html)

}

main()