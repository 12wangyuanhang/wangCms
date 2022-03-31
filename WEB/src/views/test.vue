<template>
    <div>
        <SearchBarMod :searchBarData="searchData" :query="query" :searchBarConfig="searchConfig" :searchBtnData="searchBtnData" />
        <div>
            <!-- <vxe-grid  v-bind="gridOptions">
                <template #pager>
                    <vxe-pager
                        :layouts="['Sizes', 'PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'FullJump', 'Total']"
                        v-model:current-page="tablePage.currentPage"
                        v-model:page-size="tablePage.pageSize"
                        :total="tablePage.total"
                        @page-change="handlePageChange">
                    </vxe-pager>
                </template>
            </vxe-grid> -->
            <TableMod
                ref="testTableRef"
                :tablePage="tablePage" 
                :tableData="tableData" 
                :tableColumn="tableColumn"
                @getList="findList"
                @checkData="getCheckData"
            />
        </div>    
        <!-- 12314 -->
    </div>
</template>

<script lang="jsx">
import SearchBarMod from '@/components/searchBar/searchBarMod.vue';
import TableMod from '@/components/tableMod/index.vue';
import {getCurrentInstance, registerRuntimeCompiler} from 'vue';
export default {
    name:'test',
    components:{
        SearchBarMod,
        TableMod
    },
    data(){
        return {
            checkRows:[],
            tableData:[],
            tableColumn:[
                {
                    tableCode:'name',
                    tableLabel:'Name',
                    tableWidth: 100,
                },{
                    tableCode:'nickname',
                    tableLabel:'Nickname',
                },{
                    tableCode:'role',
                    tableLabel:'Role',
                },{
                    tableCode:'address',
                    tableLabel:'Address',
                },{
                    tableType:'btn',
                    tableLabel:'操作',
                    btnData:[
                        {
                            text:'删除',
                            type:'primary',
                            doEventClick:this.doDelete
                        },{
                            text:'重置',
                            type:'primary',
                            doEventClick:(row)=>{
                                console.log(row, 12888888)
                            }
                        },{
                            text:'添加',
                            type:'primary',
                            doEventClick:(row)=>{
                                console.log(row, 'oooo')
                            }
                        }
                    ]
                }
            ],
            tablePage:{
                total: 0,
                currentPage: 1,
                pageSize: 10
            },
            input:'',
            searchConfig:{
                labelWidth:'80px',
            },
            query:{
                linkId:'',
                test12:'333',
                linkCode:'',
                optCode:'',
                optCode1:'',
                testRadio:'',
            },
            searchBtnData:[
                {
                    btnText:'重置',
                    btnPrivate:{
                        type:'primary',
                        onClick: ()=>{
                            console.log(1234);
                        }
                    }
                },
                {
                    btnText:'查询',
                    // authBtn:'',
                    btnPrivate:{
                        type:'success',
                        onClick: ()=>{
                            console.log(6788);
                            this.doSearch();
                        },
                        // round:true,
                    }
                },
                // {
                //     btnText:'删除',
                //     btnPrivate:{
                //         type:'danger',
                //         onClick: ()=>{
                //             console.log('ooooo');
                //             // this.doSearch();
                //         },
                //     }
                // }
            ],
            searchData:[
                {
                    searchType:'typeInput',
                    searchCode:'linkId',
                    searchLabel:()=><div style="color:red;">链路Id</div>,
                    privateData:{
                        placeholder:'链路Id'
                    },
                },
                {
                    searchType:'typeInput',
                    searchCode:'test12',
                    searchLabel:'',
                    privateData:{
                        placeholder:'链路Id'
                    },
                },{
                    searchType:'typeInput',
                    searchCode:'linkId',
                    searchLabel:'',
                    privateData:{
                        placeholder:'链路Id',
                        // disabled:true,
                    },
                },{
                    searchType:'typeInput',
                    searchCode:'linkCode',
                    searchLabel:'链路code',
                    privateData:{
                        placeholder: '链路code'
                    },
                },{
                    searchType:'typeSelect',
                    searchCode:'optCode',
                    searchLabel:'下拉框1',
                    options:[
                        {
                            value:'123',
                            label:'来'
                        },{
                            value:'456',
                            label:'去'
                        }
                    ],
                    privateData:{
                        placeholder: '下拉框1'
                    },
                },{
                    searchType:'typeSelect',
                    searchCode:'optCode1',
                    searchLabel:'下拉框1',
                    options:(query, item)=>{
                        return [
                            {
                                value:'123',
                                label:'来'
                            },{
                                value:'456',
                                label:'去'
                            }
                        ]
                    },
                    privateData:{
                        placeholder: '下拉框2'
                    },
                },{
                    searchType:'typeRadio',
                    searchCode:'testRadio',
                    searchLabel:'单选框1',
                    options:(query, item)=>{
                        return [
                            {
                                value:'123',
                                label:'来'
                            },{
                                value:'456',
                                label:'去'
                            }
                        ]
                    },
                    privateData:{
                        placeholder: '单选框1'
                    },
                },
            ]
        }
    },
    watch:{
        'query.linkId'(val){
            console.log(val,344455)
        },
        'query.linkCode'(val){
            console.log(val,'lll')
        }
    },
    created(){
    },
    mounted(){
        this.searchEvent();
    },
    methods:{
        getCheckData(data){
            this.checkRows = data;
        },
        async doDelete(data){
            console.log(data)
            const res = await this.$http.post('/api/deleteItem',{index:data.rowIndex})
            this.$message.success(res.msg)
            this.doSearch();
        },
        doSearch(){
            this.tablePage.currentPage = 1
            this.findList();
        },
        searchEvent(){
            this.tablePage.currentPage = 1
            this.findList();
        },
        async findList (){
            let data = {
                adc:123,
            }
            let res = await this.$http.post('/api/getData',data);
            this.tableData = res.result.dataList;
            // this.$refs.testTableRef.gridOptions.loading = true;
            // setTimeout(() => {
            //     const data = [
            //         { id: 10001, name: 'Te222222222st1', nickname: 'T1', role: 'Develo333333333333333333333333333p', sex: '1', age: 28, address: 'Sh33333333333333333333333333333enzhen' },
            //         { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: '0', age: 22, address: 'Guan3333333333333333333333333333gzhou' },
            //         { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: '1', age: 32, address: 'Shanghai' },
            //         { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: '0', age: 23, address: 'Shenzhen' },
            //         { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: '0', age: 30, address: 'Shanghai' },
            //         { id: 10006, name: 'Test6', nickname: 'T6', role: 'Develop', sex: '0', age: 27, address: 'Shanghai' },
            //         { id: 10007, name: 'Test7', nickname: 'T7', role: 'Develop', sex: '1', age: 29, address: 'Shenzhen' },
            //         { id: 1232, name: 'Test8', nickname: 'T8', role: 'Develop', sex: '0', age: 32, address: 'Shanghai' },
            //         { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: '0', age: 32, address: 'Shanghai' },
            //         { id: 1000444, name: 'Test8', nickname: 'T8', role: 'Develop', sex: '0', age: 32, address: 'Shanghai' },
            //         { id: 1000555, name: 'Test8', nickname: 'T8', role: 'Develop', sex: '0', age: 32, address: 'Shanghai' },
            //         { id: 10006666, name: 'Test8', nickname: 'T8', role: 'Develop', sex: '0', age: 32, address: 'Shanghai' },
            //         { id: 1000777, name: 'Test8', nickname: 'T8', role: 'Develop', sex: '0', age: 32, address: 'Shanghai' },
            //         { id: 10008888, name: 'Test8', nickname: 'T8', role: 'Develop', sex: '0', age: 32, address: 'Shanghai' },
            //         { id: 1000999, name: 'Test8', nickname: 'T8', role: 'Develop', sex: '0', age: 32, address: 'Shanghai' },
            //         { id: 1000122, name: 'Test8', nickname: 'T8', role: 'Develop', sex: '0', age: 32, address: 'Shanghai' },
            //         { id: 10009, name: 'Test9', nickname: 'T9', role: 'Develop', sex: '1', age: 30, address: 'Shenzhen' },
            //         { id: 1000323, name: 'Test8', nickname: 'T8', role: 'Develop', sex: '0', age: 32, address: 'Shanghai' },
            //         { id: 10010, name: 'Test8', nickname: 'T8', role: 'Develop', sex: '0', age: 32, address: 'Shanghai' },
            //         { id: 10003451, name: 'Test123', nickname: 'T8', role: 'Develop', sex: '0', age: 32, address: 'Shanghai' },
            //         { id: 10012, name: 'Test10', nickname: 'T10', role: 'Develop', sex: '0', age: 34, address: 'Shan22222222222222222222222222222ghai' }
            //     ]
            //     // this.$refs.testTableRef.pageSet();
            //     // this.$refs.testTableRef.gridOptions.loading = false;
            // }, 300)
        }
    }
}
</script>

<style lang="scss">
    
</style>