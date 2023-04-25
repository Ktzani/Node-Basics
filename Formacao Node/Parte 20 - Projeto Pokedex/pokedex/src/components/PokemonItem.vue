<template>
    <div id="pokemon">
        <div class="card">
            <div class="card-image">
                <figure>
                    <img :src="currentImg" alt="Placeholder image">
                </figure>
            </div>
            <div class="card-content">
                <div class="media">

                    <div class="media-content">
                        <p class="title is-4">{{ num }}- {{ upperNamePokemom }}</p>
                        TIPOS:
                        <!-- TOMAR CUIDADO!! NÃO colocar sempre o index como uma chave, pois ela altera mt facilmente, podendo gerar problemas futuros -->
                        <div v-for="(type, index) in pokemon.types" :key="index">
                            <p class="subtitle is-6">{{ type }}</p>
                        </div>
                    </div>
                </div>
        
                <div class="content">
                    <button @click="mudarSprite()" class="button is-success is-rounded is-fullwidth">Mudar Sprite</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"

export default {
    name: "PokemonItem",
    created() {
        axios.get(this.url)
          .then(res => {
                // console.log(res.data)
                res.data.types.forEach(type => {
                    this.pokemon.types.push(type.type.name)
                });

                this.pokemon.front = res.data.sprites.front_default
                this.pokemon.back = res.data.sprites.back_default
                this.currentImg = this.pokemon.front
                console.log(this.pokemon)

            })
          .catch(error => {
                console.log(error)
            })
    },

    //LEMBRAR - IMPORTANTE: um dado só é reativo se ele for inserido dentro da função data
    data() {
        return {
            isDeFrente: true,
            currentImg: '',
            pokemon: {
                types: [],
                front: "",
                back: ""
            }
        }
    }, 
    props : {
        num: Number,
        name: String,
        url: String,
    },
    computed: {
        upperNamePokemom(){
            return this.name[0].toUpperCase() + this.name.slice(1);
        }
    },
    methods: {
        mudarSprite(){
            if(this.isDeFrente){
                this.isDeFrente = false
                this.currentImg = this.pokemon.back;
            }
            else{
                this.isDeFrente = true
                this.currentImg = this.pokemon.front;
            }
        }
    }
    
}
</script>

<style>
    #pokemon {
        margin-top: 2%;
    }
</style>