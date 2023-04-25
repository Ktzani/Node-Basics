<template>
	<div id="app">
	<nav>
    <!-- router-link -> cria links como se fosse um <a href> para navegação -->
		<router-link to="/">Home</router-link> |
		<router-link to="/about">About</router-link> |
    <!-- LEMBRAR: aqui estamos fazendo um binding -->
    <router-link :to="{name: 'cadastro', params: {id: '1010'}}">Cadastro</router-link>
		</nav>
	<!-- router-view -> componentes responsavel por exibir o conteudo de uma rota-->
	<router-view/>	
	</div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
