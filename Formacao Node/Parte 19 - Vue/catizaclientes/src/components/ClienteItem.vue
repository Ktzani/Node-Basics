
<template>
<!-- Interpolaçao -> pode ser usada para usar dados JS para dentro do HTML -->
<!-- Reatividade: mudando o conteudo/DADO no js, altera-se no HTML, ou seja, o html reagiu -->
<!-- Colocando-se : antes de um atributo do html nos permite usar uma variavel do js dentro do atributo -->
<!-- one way databinding: Ao fazer isso eu estou fazendo um databinding, ou seja, ligando um dado a um campo de formulário. Nesse caso é 
um databinding de um caminho, pois ele so serve para leitura, ou seja, se altero seu valor aqui, nao alterará embaixo. Logo, ele 
so exibe o dado e nao tem a capacidade de modificar o dado -->
<!-- <input type="text" :value="nome">
<hr> -->

<!-- two way databinding: funciona geralmente em formularios, checkbox, selects. O que eu mudo aqui causa uma reatividade no projeto inteiro,
onde em qualquer lugar que eu chamo essa variavel, altera em tempo real-->
<!-- <input type="text" v-model="descricao">
<h2 id="cliente-nome">{{nome}}</h2>
<h3>Descricao: {{descricao}}</h3> -->

<!-- Props: maneira de passar dados diferente para um mesmo componente -->

<!--v-if: esconder partes do HTML baseando-se em condicoes booleanas 
	v-else-if: consiga colocar novas condicoes para caso aquele v-if nao ocorra
	v-else: ligado ao v-if caso ele nao ocorra, mas sem nenhuma condicao

	v-show: so exibo a tag html caso a condicao for verdadeira. A diferenca para o v-if sao duas:
	1) é que mesmo que a condição do v-show sendo falso, ele nao é deletado do html, porem fica invisivel
	2) eu nao consigo utilizar o v-else 
-->

<!-- v-for: evitar de ficar replicando codigo, ou seja, o for é uma estrutura de repeticao do vue semelhante ao foreach-->

<!-- Computed Properties -> propriedades que sao geradas dinamicamente. -->

	<!-- IMP: Estlizacao com condicao apenas com classes, onde eu posso escolher qual sera utilizada para uma div por meio de uma condicao-->
	<div :class="{'cliente': !isPremium, 'cliente-premium': isPremium}">
		<h4>Nome: {{cliente.nome}}  </h4>
		<hr>
		<p> Numero: {{cliente.numero}} </p>
		<p> Email: {{ processarEmail }} </p> <!-- Filtro sendo usado -->
		<p v-if="showIdade === true"> Idade: {{cliente.idade}} </p>
		<p v-else> Idade Escondida </p>
		<button @click="mudarCor($event)">Mudar cor!</button>
		<button @click="emitirEventoDeletarUsuario()">Deletar</button>
		<h4>Id Especial: {{ idEspecial }}</h4>
	</div>
</template>
 
<script>

export default {
	name: "ClienteItem",

	// Props: maneira de passar dados diferente para um mesmo componente
	props: {
		// nome: String,
		// numero: Number,
		// email: String,
		cliente: Object, //Todas as proximas acimas passam a ser desnecessarias agora que todas elas estao dentro do nosso objeto cliente
		showIdade: Boolean
        // idade: Number,
        // descricao: String
	}, 

	//Atraves disso eu consigo passar funcoes para serem usadas dentro do HTML para disparar eventos. Toda funcao que é usada para disparar um evento 
	//retorna o dado do evento chamado de $event, que passa informações especificas do evento que aconteceu para dentro do meu metodo e cada evento
	//retorna um tipo de dado diferente
	methods : {
		mudarCor($event){
			console.log($event)
            this.isPremium = !this.isPremium
        },

		//EMISSIONS -> O dado que eu desejo manipular está no componente pai (app), que é a lista de clientes. Como faço para pegar os dados da lista de clientes
		//nesse componente filho e os deleto, em que que o componente filho não sabe que o pai existe? Para isso eu utilizo eventos, ou seja, eu
		//crio um evento customizado e o emito que diz pro pai o que ele quer fazer e essa é uma das melhores maneiras para comunicar um componente
		//filho com um componente pai
		// OBS: não mexer nas props dos componentes com emissao. Mexer com os dados apenas que estao dentro da funcao data
		emitirEventoDeletarUsuario(){
            this.$emit('deletar', {idDoCliente: this.cliente.id, clientComponent: this})
        },
		
	},

	// Computed Properties -> propriedades que sao geradas dinamicamente. 
	// Filtros -> servem para pos-processar variaveis que estou bidando no HTML 
	computed : {
		// Filtros -> servem para pos-processar variaveis que estou bidando no HTML 
		processarEmail() {
			return this.cliente.email.toUpperCase()
		},
		
		// Computed Properties -> propriedades que sao geradas dinamicamente. 
		idEspecial (){
			return (this.cliente.email + this.cliente.nome + this.cliente.id).toUpperCase()
		}


	},

		//Atraves desse data, eu consigo enviar dados proprios do JS para o HTML, porem é algo que fica encapsulado dentro do componente
    data (){ 
		return{
			// nome: 'Gabriel Catizani',
			// numero: 3122151351,
			email: "gabriel@gmail.com",
			// idade: 21,
			// descricao: "Um cara mt legal"
			isPremium: false
		}
	}
}


</script>

<style scoped>
	.cliente {
		background-color: #ECE5E3 ;
		max-width: 600px;
		height: 250px;
		padding: 1%;
		margin-top: 2%;
	}

	.cliente-premium {
		background-color: black ;
		color: yellow;
		max-width: 600px;
		height: 250px;
		padding: 1%;
		margin-top: 2%;
	}
</style>
