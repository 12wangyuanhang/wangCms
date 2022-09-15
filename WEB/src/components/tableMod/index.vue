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
            <template #operate="scope">
                <el-button :type="item.type" v-for="(item, index) in tableBtnData" :key="index" @click="handleSoltBtn(item, scope)">{{item.text}}</el-button>
            </template>
            <!-- <template  v-for="item in gridOptions.columns" v-slot:[item.slotData.soltName+'_edit']="{}">
                
            </template> -->

        </vxe-grid>
    </div>    
</template>

<script lang="tsx">
    import { PropType,defineComponent } from 'vue';
    import { VXETable, VxeGridInstance, VxeGridListeners, VxeGridProps } from 'vxe-table'
    interface TableColumn {
        tableType?:string,
        tableCode:string,
        tableLabel:string,
        tableWidth?:number,
        showOverflow:boolean,
        btnData?:BtnData[],
        isSlots?:Boolean,
        slotData?:any
    }
    interface BtnData {
        type:string,
        text:string,
        doEventClick:EventType
    }
    interface EventType {
        ():Function
    }
    export default defineComponent({
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
                    keepSource: true,
                    align: 'center',
                    loading:false,
                    columnConfig: {
                        resizable: true
                    },
                    editConfig: {
                        trigger: 'manual',
                        mode: 'row',
                        showStatus: true
                    },
                    data:[],
                    columns: []
                } as VxeGridProps,
                tableBtnData: [],
                tableBtnDataC: [],
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
            handleSoltBtn(item:any, scope:any){
                const row = scope.row;
                if(item.text == '编辑'){
                    row.isSlots= true;
                    this.tableBtnData = this.tableBtnDataC?.filter(item=>item.text!='编辑');
                    return item.doEventClick(scope);
                } else if(item.text == '保存'){
                    row.isSlots= false;
                    this.gridOptions.loading = true;
                    this.tableBtnData = this.tableBtnDataC?.filter(item=>item.text!='保存');
                    return item.doEventClick(scope, this.gridOptions);
                } else {
                    return item.doEventClick(scope);
                }
            },
            typeCheck(type:any){
                return Object.prototype.toString.call(type);
            },
            optionsDom(query, item){
                let type = this.typeCheck(item.options)
                if(type == '[object Function]' || type == '[object AsyncFunction]'){
                    return (
                        item.options(query, item).map((optItem:any,)=>{
                            return (
                                <vxe-option
                                    key={optItem.value}
                                    label={optItem.label}
                                    value={optItem.value}
                                />
                            )
                        })
                    )
                }else {
                    return (
                        item.options.map((optItem:any)=>{
                            return (
                                <vxe-option
                                    key={optItem.value}
                                    label={optItem.label}
                                    value={optItem.value}
                                />
                            )
                        })
                    )
                }
            },
            handleTableCol(){
                this.gridOptions.columns = this.tableColumn.map((item:TableColumn)=>{
                    let reItem = {
                        title: item.tableLabel,
                        showOverflow:item.showOverflow || true,
                    } as any;
                    if(item.isSlots){
                        reItem.slots = {
                            default: ({ row }) => {
                                if(row.isSlots){
                                    console.log(item.slotData.slotType)
                                    if(item.slotData.slotType == 'typeInput'){
                                        return <vxe-input v-model={row[item.tableCode]}></vxe-input>
                                    }else if (item.slotData.slotType == 'typeSelect'){
                                        return (
                                            <vxe-select v-model={row[item.tableCode]} transfer>
                                                {
                                                    this.optionsDom(row[item.tableCode], item.slotData)
                                                }
                                            </vxe-select>
                                        )
                                    }else{
                                        return <span>{row[item.tableCode]}</span>
                                    }
                                } else {
                                    return <span>{row[item.tableCode]}</span>
                                }
                            }
                        };
                    }
                    if(item.tableType && item.tableType == 'btn'){
                        this.tableBtnDataC = item.btnData;
                        this.tableBtnData = item.btnData?.filter(item=>item.text!='保存');
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
    })
</script>
<style lang="scss" scoped>
    .tableBox{
        padding: 0 10px;
    }
    // :deep(.vxe-select--panel){
    //     z-index: 100111111!important;
    // }
</style>
