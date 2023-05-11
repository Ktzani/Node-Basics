const express = require("express");
const MercadoPago = require("mercadopago"); 
const { setTimeout } = require("timers");
const app = express();

MercadoPago.configure({
    sandbox: true,
    access_token: "TEST-3260321011293596-061906-6cdf2c22206e79007f91b8f5642b3cf2-267336909"
});


app.get("/", (req, res) => {
      MercadoPago.payment.search({
        //qs: filters
      }).then(function (data) {
        res.send(data);
      }).catch(function (error) {
        res.send(error);
      });

    
});

app.get("/pagar",async (req, res) => {

    // Pagamentos

    // id // codigo // pagador // status
    // 1 // 1593163315787 // victordevtb@gmail.com  // Não foi pago
    // 2 //  1593163315782 // victordevtb2@gmail.com // Pago

    var id = toString(Date.now());
    var emailDoPagador = "victordevtb@outlook.com";

    var dados = {
        items: [
            item = {
                // Preciso saber o id do pagamento para realiza-lo e guardar no banco
                id: id,
                title: "2x video games;3x camisas",
                quantity: 1,
                currency_id: 'BRL',
                unit_price: parseFloat(150)
            }
        ],
        payer:{
            email: emailDoPagador
        },
        external_reference: id
    }

    try{
        var pagamento = await MercadoPago.preferences.create(dados);
        //Banco.SalvarPagamento({id: id, pagador: emailDoPagador});
        return res.redirect(pagamento.body.init_point);
    }catch(err){
        return res.send(err.message);
    }
});

app.post("/not",(req, res) => {
    var id = req.query.id;

    setTimeout(() => {

        var filtro = {
            "order.id": id
        }

        MercadoPago.payment.search({
            qs: filtro
        }).then(data => {
            var pagamento = data.body.results[0];

            if(pagamento != undefined){
                //Aqui eu pego aquele id que passei na hora de pagar e assim consigo alterar no meu banco que o pagamento foi pago 
                //alterando o atributo PAGO para true por meio desse external_reference
                console.log(pagamento.external_reference); 
                console.log(pagamento.status); // approved

                // if(pagamento.status === "approved"){
                //     //Defino que um determinado pagamento com esse id foi pago
                //     Banco.definirComopago(pagamento.external_reference)
                // }
            }else{
                console.log("Pagamento não existe!");
            }
        }).catch(err => {
            console.log(err);
        });

    },20000)

    res.send("OK");
});


app.listen(80,(req, res) => {

    console.log("Servidor rodando!");

});