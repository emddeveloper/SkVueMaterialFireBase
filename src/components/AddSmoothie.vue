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
               <i class="material-icons delete-ingradient" @click="deleteIng(ing)">delete</i>
           </div>
           <div class="field add-ingradient" v-show="!ingStatus">
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
import slugify from 'slugify'
export default {
    name:'AddSmoothie',
    data(){
        return{
            title:null,
            another:null,
            ingradients:[],
            feedback:null,
            slug:'new-url',
            ingStatus:false
        }
    },
    methods:{
        addSmoothie(){
            if(this.title){
                 this.addIng()
                 this.ingStatus=true
                this.feedback=null
                this.slug=slugify(this.title,{
                    replacement: '-',  // replace spaces with replacement character, defaults to `-`
                    remove: /[*+~.()'"!:@]/g, // remove characters that match regex, defaults to `undefined`
                    lower: true,      // convert to lower case, defaults to `false`
                    strict: false, 
                })
                db.collection('smoothies').add({
                title:this.title,
                slug:this.slug,
                ingradients:this.ingradients
            }).then( ()=>{
                this.$router.push({ name : 'Index'})
            }).catch(err =>{
                console.log(err)
            })
            }
            else{
                this.feedback="Title is mandatory"
            }
            
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
        },
        deleteIng(ing){
            this.ingradients=this.ingradients.filter((ingradient)=>{
                return ingradient != ing
            })
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
    position: relative;
}
.delete-ingradient {
    position: absolute;
    color: #aaa;
    font-size: 1.5em;
    cursor: pointer;
    right:0;
    bottom:18px;
}
</style>