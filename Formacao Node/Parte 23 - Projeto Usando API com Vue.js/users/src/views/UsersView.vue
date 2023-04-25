<template>
    <div class="table__wrapper">
        <h1>Painel ADM</h1>
        <table class="table is-bordered pricing__table is-fullwidth is-hoverable">
            <thead>
                <tr>
                    <th>Numero</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Cargo</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in users" :key="user.codigo">
                    <td>{{ index + 1 }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td v-if="user.role == 0">Usuário Comum</td>
                    <td v-else-if="user.role == 1">Admin</td>
                    <td>
                        <router-link :to="{name: 'userEdit', params: {codigo: user.codigo}}"><button class="button is-success">Editar</button></router-link>
                        <button class="button is-danger" @click="ModalShowHide(user.codigo)">Deletar</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <div :class="{'modal': true, 'is-active': showModal}">
            <div class="modal-background"></div>
            <div class="modal-content">
                <div class="card">
                    <header class="card-header">
                      <p class="card-header-title">
                        Você realmente quer deletar o seu usuario?
                      </p>
                      <button class="card-header-icon" aria-label="more options">
                        <span class="icon">
                          <i class="fas fa-angle-down" aria-hidden="true"></i>
                        </span>
                      </button>
                    </header>
                    <div class="card-content">
                      <div class="content">
                        <h4>Deletando nao é possivel mais voltar atras...</h4>
                      </div>
                    </div>
                    <footer class="card-footer">
                      <a href="#" class="card-footer-item" @click="ModalShowHide()">Cancelar</a>
                      <a href="#" class="card-footer-item" @click="DeleteUser()" >Sim, quero deletar!</a>
                    </footer>
                </div>
            </div>
            <button class="modal-close is-large" aria-label="close" @click="ModalShowHide()"></button>
        </div>
    </div>
</template>

<script>
import axios from "axios"
export default {
    data(){
        return{
            users: [],
            showModal: false,
            deleteUserCodigo: -1
        }
    },

    created(){
        let req = {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		}	

        axios.get("http://localhost:8686/users", req).then( res => {
            this.users = res.data
        }).catch( err => {
            let msgErro = err.response.data.error
            console.log(msgErro)
        })
    },
    methods: {
        ModalShowHide(codigoUser = undefined){
            if(codigoUser != undefined){
                this.deleteUserCodigo = codigoUser
            }
            this.showModal = !this.showModal
        },

        DeleteUser(){
            let req = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
            axios.delete("http://localhost:8686/user/" + this.deleteUserCodigo, req).then( res => {
                console.log(res)
                window.location.reload()
                this.showModal = false
            }).catch( err => {
                console.log(err)
            })
        }
    }
}
</script>

<style>
    .pricing__table {
        width: 100%;
        overflow-x: auto;
    }
    .table__wrapper {
      overflow-x: auto;
    }
</style>