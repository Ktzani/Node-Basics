<template>
	<!-- Prop: maneira de passar dados diferente para um mesmo componente -->

	<!-- Bindando um variavel: eu troco a prop que eu queria colocar de forma crua por uma variavel propria do APP colocando : antes da prop
	Nesse caso, o valor da variavel é reativa-->

	<!-- v-for -> eu passo o dado (array) que eu quero percorrer e em seguida pego uma chave individual de cada dado. Ai nesse caso eu posso 
	pegar cliente por cliente -->

	<div id="app">
		<!-- <input type="text" v-model="nomeDoGabriel">
		<input type="text" v-model="clienteGabriel.nome">
		<ClienteItem :nome="nomeDoGabriel" email="gabriel@gabriel.com" numero="12312312"/>
		<ClienteItem :cliente="clienteGabriel" :showIdade="true"/> -->
		<h3>Cadastro: </h3>
		<small id="nomeErro" v-show="deuErro === true">Nome inválido!! Tente novamente</small><br>
		<input type="text" placeholder="nome" v-model="nomeInput"><br>
		<input type="email" placeholder="email" v-model="emailInput"><br>
		<input type="number" placeholder="idade" v-model="idadeInput"><br>
		<input type="number" placeholder="numero" v-model="numeroInput"><br>
		<button @click="cadastrarUsuario()">Cadastrar</button>
		<div v-for="(cliente,index) in orderClientes" :key="cliente.id">
			<h3>{{index + 1}}</h3>
			<ClienteItem :cliente="cliente" :showIdade="true" @deletar="deletarUsuario($event)"/>
			<!-- <hr>
			<h4>Edição: </h4>
			<input type="text" v-model="cliente.nome">
			<input type="email" v-model="cliente.email"> -->
		</div>
		<!-- <ClienteItem nome="Faria" email="gabriel@gabri.com" numero="413254363"/>
		<ClienteItem nome="Oliveira" email="gabriel@gabr.com" numero="74858"/>
		<ClienteItem nome="Davi" email="gabriel@gab.com" numero="1312421"/> -->
	</div>
</template>

<script>

// Componente no vue é dividido em 3 partes -> 
// 1) Parte do HTML, onde digitamos o HTML em si, apenas daquele componente
// 2) Parte logica, que é a parte do javascript, onde aquele javascript que voce escrever naquela pagina so afeta aquele componente
// 3) Parte do estilo, onde digitamos o estilo css que afeta apenas aquele componente 
// OBS: todo arquivo que tiver .vue no final dele é um arquivo de componente

import ClienteItem from './components/ClienteItem.vue'
import _ from "lodash"
// import ProdutoItem from './components/ProdutoItem.vue'

export default {
	name: 'App',
	components: {
		ClienteItem,
		// ProdutoItem
	},
	methods: {
		cadastrarUsuario: function(){
			if(this.nomeInput == "" || this.nomeInput == " " || this.nomeInput.length < 3){
				this.deuErro = true;
			}else{
				this.clientes.push({nome: this.nomeInput, email: this.emailInput, idade: this.idadeInput, id: Date.now()})
				this.nomeInput = "";
				this.emailInput = "";
				this.idadeInput = 0;
				this.numeroInput = 0
				this.deuErro = false;
			}
		},

		// deletarUsuario: function(cliente){
        //     this.clientes.splice(this.clientes.indexOf(cliente), 1)
        // }

		//OU 

		deletarUsuario($event) {
			let id = $event.idDoCliente
			let novoArray = this.clientes.filter(cliente => cliente.id != id)
			this.clientes = novoArray
		}

	},

	computed: {
		orderClientes(){
			return _.orderBy(this.clientes, ['nome -'], ['asc'])
		}
	},

	data(){
		return{
			// nomeDoGabriel: "Gabriel Catizani",
			// clienteGabriel: {
			// 	nome: "Gabriel Catizani",
            //     email: "gabriel@gabriel.com",
            //     numero: 12312312,
			// 	idade: 21
			// },
			nomeInput: "",
			emailInput: "",
            idadeInput: 0,
			numeroInput: 0,
			clientes : [
				{
					id: 1,
					nome: "Gabriel Catizani",
					email: "gabriel@gabriel.com",
					numero: 12312312,
					idade: 21
				},
				{
					id: 2,
					nome: "Michael Jordan",
					email: "michael@gabriel.com",
					numero: 1251546,
					idade: 60
				},
				{
					id: 3,
					nome: "Lebron James",
					email: "lebron@gabriel.com",
					numero: 5735753,
					idade: 39
				},
			],
            deuErro: false
		}
	}
}
</script>

<style>
	#nomeErro {
		color: red;
	}
</style>
