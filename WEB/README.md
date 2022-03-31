# tableMod组件

    三个自定义的值 tablePage tableData tableColumn

    tablePage为page的双向绑定值其中包含=> {
                                        total: 0,
                                        currentPage: 1,
                                        pageSize: 10
                                      }
    tableColumn 为表格的配置项接口为=> interface TableColumn {
                                        tableType?:string,
                                        tableCode:string,
                                        tableLabel:string,
                                        tableWidth?:number,
                                        showOverflow:boolean,
                                    }
    其中tableType为btn的时候为按钮列表通过插槽来改变可多样性后续可修改

    tableData 为后台接口获取的数据与tableColumn配置项相辅相成

# searchBarMod组件

    此组件为上下两部分: 搜索和按钮

    四个自定义值 searchBarData query searchBarConfig searchBtnData

    searchBarData

    懒得写了暂时先自己去看吧

# chooseMod组件


    懒得写了暂时先自己去看吧