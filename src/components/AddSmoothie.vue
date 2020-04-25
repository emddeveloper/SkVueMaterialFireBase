<template>
   <div class="add-smoothie container">
       <h2 class="center-align indigo-text">Add New Smoothie</h2>
       <form @submit.prevent="addSmoothie">
           <div class="field title">
               <label for="title">Smoothie Title:</label>
               <input type="text"  name="title" v-model="title">
           </div>
           <div class="field" v-for="(ing,index) in ingradients" :key="index">
               <label for="title add-ingradient">Ingradient:</label>
               <input type="text"  name="add-ingradient-list" v-model="ingradients[index]">
           </div>
           <div class="field add-ingradient">
               <label for="title add-ingradient">Add an Ingradient:</label>
               <input type="text"  name="add-ingradient" v-model="another" @keydown.tab.prevent="addIng">
           </div>
           <div class="field center-align">
               <p class="red-text" v-if="feedback">{{ feedback }}</p>
               <button class="btn pink">Add Smoothie</button>
           </div>
       </form>
   </div>
</template>


<script>
import db from '@/firebase/init'

export default {
    name:'AddSmoothie',
    data(){
        return{
            title:null,
            another:null,
            ingradients:[],
            feedback:null,
            slug:'new-url'
        }
    },
    methods:{
        addSmoothie(){
            db.collection('smoothies').add({
                title:this.title,
                slug:this.slug,
                ingradients:this.ingradients
            }).then( ()=>{
                this.$router.push({ name : 'Index'})
            }).catch(err =>{
                console.log(err)
            })
        },
        addIng(){
            if(this.another){
                this.ingradients.push(this.another)
                this.another=null
                this.feedback=null
            }
            else{
                this.feedback="Ingradient field is required"
            }
        }
    }
}
</script>
<style scoped>
.add-smoothie{
    max-width: 500px;
    padding:20px;
}
.add-smoothie h2{
    font-size: 2em;
    margin:20px auto;
}
.add-smoothie .field{
    margin: 20px auto;
}
</style>