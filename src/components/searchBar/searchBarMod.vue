<script lang="tsx">
import { defineComponent, PropType, ref, reactive } from 'vue'
import ChooseMod from '../chooseMod/index.vue';
import tools from '../../utils/tools'
interface SearchBarDataMod {
    searchType:string,
    searchLabel?:any,
    searchCode:string,
    placeHolder?:string,
    span?:number,
    privateData?:object,
    labelWidth?:string|number,
}
interface SearchBarConfig {
    labelWidth?: string | number,
    span? :number
}
export default defineComponent({
    components:{
        ChooseMod,
    },
    props:{
        searchBarData:{
            type: Array as PropType<SearchBarDataMod[]>,
            required:true,
            default:()=>([])
        },
        query:{
            type: Object as any,
            default:()=>({}),
        },
        searchBarConfig:{
            type: Object as PropType<SearchBarConfig>,
            default:() => ({
                labelWidth:'80px',
                span: 6
            })
        },
        searchBtnData:{
            type:Array as PropType<any[]>,
            default: () => ([])
        },
    },
    setup(props) {
        const searchBarData = props.searchBarData;
        const query = props.query;
        const searchBarConfig = props.searchBarConfig;
        const searchBtnData = props.searchBtnData;
        
        const formInline = reactive({
            user: '',
            region: '',
        })
        
        function searchDom(){
            
            return (
                <>
                    {
                        searchBarData && searchBarData.map((item,index)=>{
                            const newItem = tools.searchBarToos(item);
                            const getLabelWidth = (item:SearchBarDataMod) => {
                                if(item.searchLabel){
                                    return item.labelWidth || 80
                                } else {
                                    return '0px'
                                }
                            }
                            return (
                                <el-col span={6}>
                                    <el-form-item labelWidth={getLabelWidth(item)} v-slots={labelSlot(item.searchLabel)}>
                                        <ChooseMod query={query} item={newItem}/>
                                    </el-form-item>
                                </el-col>
                            )
                        })
                    }
                </>
            )
        }
        function searchBtnDom(){

            return (
                <>
                    {
                        searchBtnData && searchBtnData.map((item,index)=>{
                            return (
                                <el-button {...item.btnPrivate}>{item.btnText}</el-button>
                            )
                        })
                    }
                </>
            )
        }

        const labelSlot = (label:any) =>{
            console.log(label,34445)
            const type = tools.typeCheck(label);
            if(type == '[object Function]' || type == '[object AsyncFunction]'){
                return {
                    label:()=> label(),
                }
            }else {
                return {
                    label:()=>(
                        <>
                            <div>{label}</div>
                        </>
                    )
                }
            }
        }
        const onSubmit = () => {
            console.log('submit!')
        }
        return () => (
            <>
                <el-row class="searchBox">
                    <el-form style="width:100%;" label-width={searchBarConfig.labelWidth || 80} inline={true} model={formInline} class="demo-form-inline">
                        {searchDom()}
                    </el-form>
                </el-row>
                <el-row class="btnBox" style="margin-left:10px;margin-bottom: 10px;">
                    {searchBtnDom()}
                </el-row>
            </>
        )
    },
})
</script>
<style lang="scss">
    
    .el-form--inline,.el-form-item {
        margin: 10px 5px!important;
    }
    .el-row{
        flex: 1;
    }
</style>