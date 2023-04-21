const DB = require("./database")

/*
INSERT 
let dados = [
	{
		nome: "Sea of Thieves",
		preco: 50.67
	}, 
	{
		nome: "COD 2",
		preco: 300
	},
	{
		nome: "BF2042",
		preco: 100
	}
]

DB.insert(dados).into("games").then(data => {
	console.log(data)
}).catch(err => {
	console.log(err)
})
*/

/*
SELECT
DB.select(["nome", "preco"]).table("games").then(data => {
	console.log(data)
}).catch(err => {
	console.log(err)
})
*/

/*
QUERY INSIDE ANOTHER QUERY 
DB.insert({nome: "Mists of noyah", preco: 25}).into("games").then(data => {
	DB.select(["nome", "preco"]).table("games").then(data => {
		console.log(data)
	}).catch(err => {
		console.log(err)
	})
}).catch(err => {
	console.log(err)
})
*/

/*
HOW THE QUERY CREATION WORKS
// Importante ter apenas um where por select por questoes de organizacao
// let query =
DB.select()
	// .where({nome: "Mists of noyah"})
	// .where({id: 2})
	// .orWhere({id: 3})
	.whereRaw("nome = 'Mists of noyah' OR preco > 50")
	.table("games").then(data => {
		console.log(data)
	}).catch(err => {
		console.log(err)
	})

// console.log(query.toQuery()) //A partir disso consigo ver qual Query sera gerada
*/

/*
QURRY CRUA (raw)
DB.raw("SELECT * FROM games").then(data => {
	console.log(data)
}).catch(err => {
	console.log(err)
})
*/

/*
DELETE
DB.where({codigo: 1}).delete().table("games").then(data => {
	console.log(data)
}).catch(err => {
	console.log(err)
})
*/

/*
UPDATE
DB.where({codigo: 7}).update({preco: 250}).table("games").then(data => {
	console.log(data)
}).catch(err => {
	console.log(err)
})
*/

/*ORDER BY
DB.select().table("games").orderBy("nome", "DESC").then(data => {
	console.log(data)
}).catch(err => {
	console.log(err)
}); //DESC / ASC
*/

/*
Inner Join
RELACIOMANETO 1 PARA 1 
DB.select(["games.*", "estudios.codigo as estuCodi", "estudios.nome as nomeEstu"]).where("games.codigo", 7)
.table("games").innerJoin("estudios", "estudios.gameCodigo", "games.codigo").then(data=> {
	console.log(data)
}).catch((err) => {
	console.log(err)
});
*/


/*
Relacionamento 1 para N
DB.select(["games.*", "estudios.codigo as estuCodi", "estudios.nome as nomeEstu"]).where("games.codigo", 7)
.table("games").innerJoin("estudios", "estudios.gameCodigo", "games.codigo").then(data=> {
	let estudiosGamesArray = data
	let game = {
		codigo: 0,
		nome: "",
		estudios: []
	}

	game.codigo = data[0].codigo
	game.nome = data[0].nome

	data.forEach(estudio => {
		game.estudios.push({nome: estudio.nomeEstu})
	});

	 
}).catch((err) => {
	console.log(err)
});
*/

/*
Relacionamento N para M
DB.select([
	"estudios.nome as nomeEstu",
	"games.nome as nomeGame",
	"games.preco as precoGame"
]).table("gamesEstudios")
	.innerJoin("games", "games.codigo", "gamesEstudios.gameCodigo")
	.innerJoin("estudios", "estudios.codigo", "gamesEstudios.estudioCodigo")
	.where("games.codigo", 15)
	.then(data => {
		console.log(data)
		// let games = []
		// for(let i = 0; i < data.; i++){
		// 	games.push({nome: data[i].nomeGame, preco: data[i].precoGame})
		// }

		// console.log(games)
		
		// game.preco = data[0].precoGame
		// game.nome = data[0].nomeGame

		// data.forEach(gameEstudio => {
		// 	game.estudios.push({nome: gameEstudio.nomeEstu})
		// });

		// console.log(game)
	}).catch( err => { 
		console.log(err)
	})

// LEMBRAR: é nos quem ficamos responsaveis pela manipulação dos dados que vem do banco 
*/

//Transaction -> usada para evitar erros em sistema intolerantes a falhas. Como por exemplo, imagina eu realizo um monte de açao que depende
//da outra em nosso banco. Nesse caso, se uma açao quebra no meio, as outras açoes a frente nao serao realizadas e as que foram realizadas 
//anteriormente se tornam inuteis. Nesse caso, seriam salvos no banco dados inconsistentes. Logo, a transcaction desfaz tudo que foi feito
//no banco caso ocorra alguma falha
async function testeTransacao (){
	try {
		await DB.transaction(async trans => {
			await DB.insert({nome: "Mojang"}).table("estudios")
			await DB.insert({nome: "Rogue Snail"}).table("estudios")
			await DB.insert({nome: "GearBox"}).table("estudios")
		})
	} catch (error) {
		console.log(error);
	}
	
}

testeTransacao()