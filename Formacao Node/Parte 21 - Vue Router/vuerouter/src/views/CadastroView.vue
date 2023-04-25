<template>
    <div>
        <h4>Rota Pai</h4>
        <input type="text" name="email" id="email" placeholder="E-mail" ><br>
        <input type="text" name="nome" id="nome" placeholder="Nome"><br>
        <button type="submit">Teste</button>
        <h4>{{ parametroDaRota }}</h4>
        <h4>Rota Filha</h4>
        <router-view/>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                parametroDaRota: "Nada" 
            }
        },
        created() {
            //Forma de acessar parametros da rota: atraves do objeto route. Sempre que for acessar ele colocar o this antes, pois é um objeto de 
            //instancia
            this.parametroDaRota = this.$route.params.id
        }
    }
</script>