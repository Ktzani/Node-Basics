<template>
    <div>
        <div class="column is-half is-offset-one-quarter">
            <div class="notification is-success">
                <h2>
                <strong> Realizado com sucesso</strong>
                </h2>
            </div>
            <hr>
            <button @click="returnHome()" class="button is-link">Voltar para pagina principal</button>
        </div>
    </div>
</template>

<script>

export default ({
    methods: {
        returnHome(){
            this.$router.push({name: 'home'});
        }
    }
})
</script>
