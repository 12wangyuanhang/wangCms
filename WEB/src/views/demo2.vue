<template>
    <div>
        <h1>333333333333333</h1>
    </div>
</template>

<script>
    export default {
        props:{
            props:{
                typ  :Object,
                default:()=>{}
            }
        },
        mounted(){
            console.log(this.props,'344')
        },
        data() {
            return {
                abc: "123",
            };
        },
    };
</script>

<style>
</style>