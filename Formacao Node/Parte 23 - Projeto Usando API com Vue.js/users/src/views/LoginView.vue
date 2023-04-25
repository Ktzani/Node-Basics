<template>
    <div id="RegisterUser">
        <h2>Login Usuario</h2>
        <hr>
        <div class="column is-half is-offset-one-quarter"> 

            <div id="error" v-if="registerError != undefined"> 
                <div class="notification is-danger is-light">
                    <p>{{ registerError }}</p>
                </div>
            </div><br>
            
            <p>E-mail</p>
            <input type="text" placeholder="email@email.com" class="input is-primary" v-model="user.email"><br><br>
            <p>Senha</p>
            <input type="password" placeholder="******" class="input is-primary" v-model="user.password"><br><br>
            <hr>
            <button class="button is-success" @click="login()">Logar</button>
        </div>
    </div>
</template>

<script>
import axios from "axios"

export default {
    data(){
        return {
            user: {
                email: '',
                password: ''
            },
            registerError: undefined
        }
    },
    methods: {
        login(){
            console.log(this.user)
            axios.post('http://localhost:8686/login', this.user)
              .then(response => {
                    console.log(response)
                    this.registerError = undefined
                    localStorage.setItem('token', response.data.token)
                    this.$router.push({name: 'success'})
                })
              .catch(error => {
                    if(error){
                        let msgErro = error.response.data.error
                        console.log(msgErro)
                        this.registerError = msgErro
                    }
                })
        }
    }
}
</script>

<style scoped>
    #error {
        color: red;
    }
</style>