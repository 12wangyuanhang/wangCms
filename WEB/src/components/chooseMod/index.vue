/**
    @params 宝剑组件
    @returns dom节点
    @action 该组件是各form部分的深层组件通过type值来判断返回值
 */

<script lang="tsx">

import { defineComponent, ref, PropType } from 'vue';
interface ChooseItem {
    type:string,
    code:string,
    privateData?:object,
    options?:any,
}
export default defineComponent({
    props:{
        item:{
            type:Object as PropType<ChooseItem>,
            default:()=>{},
        },
        query:{
            type: Object as any,
            default:()=>{},
        },
    },
    setup(props){
        const item = props.item;
        const query = props.query;
        let typeCheck = (type:any)=>{
            return Object.prototype.toString.call(type);
        }
        function checkDom(){
            if(item.type == 'typeSelect'){
                function optionsDom(){
                    let type = typeCheck(item.options)
                    if(type == '[object Function]' || type == '[object AsyncFunction]'){
                        return (
                            <>
                                {
                                    item.options(query, item).map((optItem:any,)=>{
                                        return (
                                            <>
                                                <el-option
                                                    key={optItem.value}
                                                    label={optItem.label}
                                                    value={optItem.value}
                                                />
                                            </>
                                        )
                                    })
                                }
                            </>
                        )
                    }else {
                        return (
                            <>
                                {
                                    item.options.map((optItem:any,)=>{
                                        return (
                                            <>
                                                <el-option
                                                    key={optItem.value}
                                                    label={optItem.label}
                                                    value={optItem.value}
                                                />
                                            </>
                                        )
                                    })
                                }
                            </>
                        )
                    }
                }
                return (
                    <div class="selectBox">
                        <el-select v-model={query[item.code]} {...item.privateData}>
                            {
                                optionsDom()
                            }
                        </el-select>
                    </div>
                )
            } else if(item.type == 'typeInput'){
                return (
                    <el-input v-model={query[item.code]} {...item.privateData}></el-input>
                )
            } else if(item.type == 'typeRadio'){
                function radioDom() {
                    let type = typeCheck(item.options)
                    if(type == '[object Function]' || type == '[object AsyncFunction]'){
                        return (
                            <>
                                {
                                    item.options(query, item).map((optItem:any,)=>{
                                        return (
                                            <>
                                                <el-radio
                                                    key={optItem.value}
                                                    label={optItem.value}
                                                >{optItem.label}</el-radio>

                                            </>
                                        )
                                    })
                                }
                            </>
                        )
                    }else {
                        return (
                            <>
                                {
                                    item.options.map((optItem:any,)=>{
                                        return (
                                            <>
                                                <el-radio 
                                                    key={optItem.value}
                                                    label={optItem.value}
                                                
                                                >{optItem.label}</el-radio>
                                            </>
                                        )
                                    })
                                }
                            </>
                        )
                    }
                }
                return (
                    <div class="radioBox">
                        <el-radio-group v-model={query[item.code]}>
                            {radioDom()}
                        </el-radio-group>
                    </div>
                )
            }
        }
        return () => (
            <>
                {
                    checkDom()
                }
            </>
        )
    }
})
</script>

<style>

</style>