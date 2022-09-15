<template>
    <div>
        <div>
            <input @change="changeCheckBox($event)" type="checkbox" name=""><label>全选</label>
        </div>
        <div style="display:flex;">
            <div v-for="item in arr" :key="item.value">
                <input @change="changeCheckBox($event)" type="checkbox" name="" :id="item.value"><label>{{item.label}}</label>
            </div>
        </div>
        <el-icon v-for="icon in iconData" :key="icon">
            <component :is="icon"></component>
        </el-icon>
    </div>
</template>

<script>
    export default {
        props:{
            arr1:{
                type:Array,
            }
        },
        data(){
            return {
                input:  [1, 2, 3, 3, 4, 4, 2, 5, 7, 7, 5, 6, 8, 1],
                output:  [1, 6, 8, 1],
                iconData:[
                    'AlarmClock',
                    'add-location',
                    'aim'
                ],
                arr:[
                    {
                        value:1,
                        label:'北京',
                    },{
                        value:2,
                        label:'上海',
                    },{
                        value:3,
                        label:'杭州',
                    }
                ]
            }
        },
        computed:{
            newArr(){
                return this.arr1.map(item=>{
                    item.checked = false;
                    return item;
                })
            }
        },
        created(){
            // arr.forEach(element => {
            //     element.checked = false;
            // });
            this.handleNum(this.input);
            console.log(this.input)
        },
        methods:{
            handleNum(arr){
                // let Input = [1, 2, 3, 3, 4, 4, 2, 5, 7, 7, 5, 6, 8, 1];
                for(let i = 0; i<arr.length-1; i++){
                    if(i<arr.length-1){
                        if(arr[i] == arr[i+1]){
                            arr.splice(i,1);
                            arr.splice(i,1);
                            this.handleNum(arr)
                            return
                        }
                    }
                }
            },
            changeCheckBox(event){
                console.log(event)
                let checked = event.target.checked;
                checked
            },
        },
    }
</script>

<style>

</style>