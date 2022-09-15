<template>
    <div>
        <h2>5555555</h2>
        <div>{{b}}</div>
    </div>
</template>

<script>
export default {
    props:{
        arr:{
            type:Array,
            // required:true,
            default:()=>[]
        }
    },
    data(){
        return {
            b:this.arr,
            
        }
    },
    watch:{
        arr(newval,oldval){
            // console.log(newval,oldval,9000)
        },
    },
    mounted(){
        // console.log(this.arr)
    },

}
</script>

<style>

</style>