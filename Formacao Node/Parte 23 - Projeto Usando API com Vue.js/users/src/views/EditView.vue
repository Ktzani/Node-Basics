<template>
    <div id="RegisterUser">
        <h2>Edição de usuario</h2>
        <hr>
        <div class="column is-half is-offset-one-quarter"> 

            <div id="error" v-if="registerError != undefined"> 
                <div class="notification is-danger is-light">
                    <p>{{ registerError }}</p>
                </div>
            </div><br>
            
            <p>Nome</p>
            <input type="text" placeholder="Nome do usuario" class="input is-primary" v-model="user.name"><br><br>
            <p>E-mail</p>
            <input type="text" placeholder="email@email.com" class="input is-primary" v-model="user.email"><br><br>
            <p>Role</p>
            <input type="text" placeholder="0 ou 1" class="input is-primary" v-model="user.role"><br><br>
            <hr>
            <button class="button is-success" @click="update()">Editar</button>
        </div>
    </div>
</template>

<script>
import axios from "axios"

export default {
    created(){
        let req = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
         }

        axios.get("http://localhost:8686/user/"+ this.$route.params.codigo, req).then(res => {
            console.log(res)
            this.user.codigo = res.data.codigo
            this.user.name = res.data.name
            this.user.email = res.data.email
            this.user.role = res.data.role
        }).catch( err => {
            console.log(err.response.data.error)
            this.$router.push({name: "users"})
        })
    },

    data(){
        return {
            user: {
                codigo: -1,
                name: '',
                email: '',
                role: 0
            },
            registerError: undefined
        }
    },

    methods: {
        update(){
            let req = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
            console.log(this.user)
            axios.put('http://localhost:8686/user', this.user, req)
              .then(response => {
                    console.log(response)
                    this.registerError = undefined
                    this.$router.push({name: 'users'})
                })
              .catch(error => {
                    console.log(error)
                    let msgErro = error.response.data.message
                    console.log(msgErro)
                    this.registerError = msgErro
                    
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