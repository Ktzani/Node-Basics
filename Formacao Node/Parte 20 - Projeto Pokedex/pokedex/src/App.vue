<template>
	<div id="app">
		<div class="column is-half is-offset-one-quarter">
			<img src="./assets/pokedex.png">
			<hr>
			<input class="input is-rounded is-warning is-focused" type="text" placeholder="Digite o pokemon da primeira geracao que deseja encontrar" v-model="busca"><br>
			<button id="buscaBtn" class="button is-warning is-rounded" @click="buscaPokemon()">Buscar</button>
			<!-- TOMAR CUIDADO!! NÃO colocar sempre o index como uma chave, pois ela altera mt facilmente, podendo gerar problemas futuros
			Por isso, os pokemons nao apareciam da forma correta algumas vezes -->
			<div v-for="(pokemon, index) in filteredPokemons" :key="pokemon.url">
				<Pokemon :name="pokemon.name" :url="pokemon.url" :num="index+1"/>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios"
import Pokemon from "./components/PokemonItem.vue"

export default {
	name: 'App',
	data(){
		return{
			pokemons: [],
			filteredPokemons: [],
			busca: "" 
		}
	},
	components: {
		Pokemon
	},

	//Create -> Assim que a pessoa entrar na pagina e o componente app for carregado por exemplo, o metodo create dele sera chamado
	created() {
		axios.get("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0").then( res => {
			console.log("Pegou a lista de pokemons")
			this.pokemons = res.data.results
			this.filteredPokemons = res.data.results
		})
	},


	methods : {
		buscaPokemon(){
			this.filteredPokemons = this.pokemons
			if(this.busca == "" || this.busca == " "){
				this.filteredPokemons = this.pokemons
			}

			else{
				this.filteredPokemons = this.pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(this.busca.toLowerCase()))
			}
		}
	},

	computed: {
		resultadoBusca() {
			if(this.busca == "" || this.busca == " "){
				return this.pokemons
			}

			else{
				return this.pokemons.filter(pokemon => pokemon.name == this.busca)
			}
		},

		lowerCaseBusca(){
			return this.busca.toLowerCase()
		}
	}
}
</script>

<style>
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 40px;
		margin-bottom: 40px;
	}

	#buscaBtn {
		margin-top: 2%;
		width: 200px
	}
</style>
