const pdf = require("html-pdf")

class PDFWritter {
    static WritePDF(filename, html){
        pdf.create(html, {
            childProcessOptions: {
              env: {
                OPENSSL_CONF: '/dev/null',
              },
            }
          }).toFile(filename, (err) => {
            console.log(err)
        });
    }
}

module.exports = PDFWritter