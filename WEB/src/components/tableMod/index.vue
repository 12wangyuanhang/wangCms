<template>
    <div class="tableBox">
        <vxe-grid ref="tableBox" v-bind="gridOptions" @checkbox-change="selectChangeEvent">
            <template #pager>
                <vxe-pager
                    :layouts="['Sizes', 'PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'FullJump', 'Total']"
                    v-model:current-page="tablePage.currentPage"
                    v-model:page-size="tablePage.pageSize"
                    :total="tablePage.total"
                    @page-change="handlePageChange">
                </vxe-pager>
            </template>
            <template #operate="scoped">
                <el-button :type="item.type" v-for="(item, index) in tableBtnData" :key="index" @click="item.doEventClick(scoped)">{{item.text}}</el-button>
            </template>
        </vxe-grid>
    </div>    
</template>

<script lang="ts">
    import { PropType } from 'vue';
    import {VxeTableInstance} from 'vxe-table'
    interface TableColumn {
        tableType?:string,
        tableCode:string,
        tableLabel:string,
        tableWidth?:number,
        showOverflow:boolean,
        btnData?:BtnData[]
    }
    interface BtnData {
        type:string,
        text:string,
        doEventClick:EventType
    }
    interface EventType {
        ():any
    }
    export default {
        props:{
            tablePage:{
                type: Object,
                default: () => ({
                    total: 0,
                    currentPage: 1,
                    pageSize: 10
                })
            },
            tableData:{
                type: Array as any,
                default:() => []
            },
            tableColumn:{
                type: Array as PropType<TableColumn[]>,
                default: () => []
            }
        },
        watch:{
            tableData(val){
                // this.pageSet();
                this.gridOptions.data = val;
            },
        },
        data(){
            return {
                gridOptions:{
                    border: true,
                    height: 600,
                    align: 'center',
                    loading:false,
                    columnConfig: {
                        resizable: true
                    },
                    data:[],
                    columns: []
                } as any,
                tableBtnData:[],
            }
        },
        created(){
            this.handleTableCol();
        },
        mounted(){
            const height = (document.querySelector('.main-content-home') as Element).clientHeight - ((document.querySelector('.btnBox') as Element).clientHeight+(document.querySelector('.searchBox') as Element).clientHeight);
            this.gridOptions.height = height - 10;
        },
        methods:{
            selectChangeEvent(data:any){
                let checkData = data.$table.getCheckboxRecords();
                this.$emit('checkData',checkData);
            },
            handlePageChange({currentPage, pageSize}:any){
                this.tablePage.currentPage = currentPage
                this.tablePage.pageSize = pageSize
                this.$emit('getList')
            },
            removeRowEvent(row:any){
                console.log(row,4445555)
            },
            handleTableCol(){
                this.gridOptions.columns = this.tableColumn.map((item:any)=>{
                    let reItem = {
                        title: item.tableLabel,
                        showOverflow:item.showOverflow || true,
                    } as any;
                    if(item.tableType && item.tableType == 'btn'){
                        this.tableBtnData = item.btnData;
                        reItem.slots =  { default: 'operate' };
                    } else {
                        reItem.field = item.tableCode;
                    }
                    if(item.tableWidth){
                        reItem.width = item.tableWidth;
                    }
                    return reItem
                })
                // this.gridOptions.columns.push({ title: '操作', width: 200, slots:{ default: 'operate' } })
                this.gridOptions.columns.unshift({ type: 'checkbox', width: 50 })
            },
            // pageSet(){
            //     if(this.tableData.length <= this.tablePage.pageSize){
            //         this.gridOptions.data = this.tableData;
            //     } else {
            //         let num = Math.floor(this.tableData.length/this.tablePage.pageSize);
            //         if(this.tablePage.pageSize < this.tableData.length){
            //             if(num >= this.tablePage.currentPage){
            //                 this.gridOptions.data = this.tableData.slice((this.tablePage.currentPage-1)*this.tablePage.pageSize,this.tablePage.currentPage*this.tablePage.pageSize)
            //             } else {
            //                 let reNum = this.tableData.length%this.tablePage.pageSize;
            //                 this.gridOptions.data = this.tableData.slice(this.tableData.length-reNum, this.tableData.length)
            //             }
            //         } else {
            //             this.gridOptions.data = this.tableData;
            //         }
            //     }
            //     this.tablePage.total = this.tableData.length;
            // },
        },
    }
</script>
<style lang="scss" scoped>
    .tableBox{
        padding: 0 10px;
    }
</style>