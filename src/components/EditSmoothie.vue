<template>
    <div class="container edit-smoothie" v-if="smoothie">
        <h2 class="center-align indigo-text">Edit {{smoothie.title}} Smoothie</h2>
        <form @submit.prevent="editSmoothie">
           <div class="field title">
               <label for="title">Smoothie Title:</label>
               <input type="text"  name="title" v-model="smoothie.title">
           </div>
           <div class="field" v-for="(ing,index) in smoothie.ingradients" :key="index">
               <label for="title add-ingradient">Ingradient:</label>
               <input type="text"  name="add-ingradient-list" v-model="smoothie.ingradients[index]">
               <i class="material-icons delete-ingradient" @click="deleteIng(ing)">delete</i>
           </div>
           <div class="field add-ingradient" v-show="!ingStatus">
               <label for="title add-ingradient">Add an Ingradient:</label>
               <input type="text"  name="add-ingradient" v-model="another" @keydown.tab.prevent="addIng">
           </div>
           
           <div class="field center-align">
                <p class="red-text" v-if="feedback">{{ feedback }}</p>
                <button class="btn waves-effect waves-light" type="submit" name="action">Add Smoothie
                    <i class="material-icons right">send</i>
                </button>
           </div>
       </form>
    </div>
</template>
<script>
import db from '@/firebase/init'
import slugify from 'slugify'
export default {
    name : 'EditSmoothie',
    data(){
        return{
            smoothie:null,
            feedback:null,
            ingStatus:false,
            another:null
        }
    },
    created(){
        let ref = db.collection('smoothies').where('slug','==',this.$route.params.smoothie_slug)
        ref.get().then(snapshot=>{
            snapshot.forEach(doc=>{
                this.smoothie=doc.data()
                this.smoothie.id=doc.id
            })
        })
    },
    methods:{
        editSmoothie(){
            this.addIng()
            let slugUrl=slugify(this.smoothie.title,{
                replacement: '-',  // replace spaces with replacement character, defaults to `-`
                remove: /[*+~.()'"!:@]/g, // remove characters that match regex, defaults to `undefined`
                lower: true,      // convert to lower case, defaults to `false`
                strict: false, 
            })
            db.collection('smoothies').doc(this.smoothie.id)
            .update({title:this.smoothie.title,ingradients:this.smoothie.ingradients,slug:slugUrl}).then(
                this.$router.push({name :'Index'})
            )
        },
        addIng(){
            if(this.another){
                this.smoothie.ingradients.push(this.another)
                this.another=null
                this.feedback=null
            }
            else{
                this.feedback="Ingradient field is required"
            }
        },
        deleteIng(ing){
            this.smoothie.ingradients=this.smoothie.ingradients.filter((ingradient)=>{
                return ingradient != ing
            })
        }
    }
}
</script>
<style scoped>

.edit-smoothie{
    max-width: 500px;
    padding:20px;
}
.edit-smoothie h2{
    font-size: 2em;
    margin:20px auto;
}
.edit-smoothie .field{
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
@media (max-width: 480px){
 .edit-smoothie h2{
    font-size: 1.3em;
}
}
</style>