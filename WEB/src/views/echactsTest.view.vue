<script lang="tsx">
    import { defineComponent,onMounted,getCurrentInstance } from 'vue';
    export default defineComponent({
        setup(){
            const {proxy}:any = getCurrentInstance();
            const echartInit = () =>{
                const main = document.getElementById('main');
                var myChart = proxy.$echarts.init(main);
                // 指定图表的配置项和数据
                var option = {
                    title: {
                        text: 'ECharts 示例'
                    },
                    tooltip: {},
                    legend: {
                        data:['销量','热量']
                    },
                    xAxis: {
                        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                    },
                    yAxis: {},
                    series: [{
                        name: '销量',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    },{
                        name: '热量',
                        type: 'bar',
                        data: [30, 40, 46, 10, 15, 20]
                    }]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            }
            onMounted(()=>{
                echartInit();
            })

            return () => (
                <>
                    <div class="map">
                        <div id="main" style="width: 100%; height: 400px;">
                        </div>
                    </div>
                </>
            )
        }    
    })
</script>

<style>

</style>