<template>
    <div>
        <div class="column is-half is-offset-one-quarter">
            <div class="notification is-warning">
                <h2>
                <strong> Pagina restrita! É necesário realizar o login e ser admin</strong>
                </h2>
            </div>
            <hr>
            <button @click="realizeLogin()" class="button is-info">Realizar login</button>
        </div>
    </div>
</template>

<script>

export default ({
    methods: {
        realizeLogin(){
            this.$router.push({name: 'login'});
        }
    }
})
</script>
