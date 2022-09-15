<script lang="jsx">
import { defineComponent, ref, shallowRef, onMounted } from 'vue';
import AMapLoader from '@amap/amap-jsapi-loader'
export default defineComponent({
    setup(){
        const map = shallowRef(null);
        const infoWindow  = shallowRef(null);
        const initMap = () => {
            AMapLoader.load({
                "key": "88d558ffd3ff2d17ba20f34d409c8e05",                              // 申请好的Web端开发者Key，首次调用 load 时必填
                "version": "2.0",                                                    // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
                // 需要使用的的插件列表，如比例尺'AMap.Scale'等
                "plugins": ['AMap.Geocoder'],
                AMapUI: {                                                             // 是否加载 AMapUI，缺省不加载
                    "version": '1.1',                                                   // AMapUI 缺省 1.1
                    "plugins":['overlay/SimpleMarker','misc/PathSimplifier'],                                                       // 需要加载的 AMapUI ui插件
                },
                "Loca":{                                                                // 是否加载 Loca， 缺省不加载
                    "version": '2.0.0'                                                  // Loca 版本，缺省 1.3.2
                },
            })
            .then((AMap)=>{
                
                map.value = new AMap.Map('container', {
                    zoom:11,                                        //级别
                    center: [116.397426, 39.90923],                 //中心点坐标
                    viewMode:'3D'                                   //使用3D视图
                });
                // var marker = new AMap.Marker({
                //     position: new AMap.LngLat(116.39, 39.9),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                //     title: '北京'
                // });
                // map.value.add(marker)
                const openInfo = (lonlat, data) => {
                    var info = [];
                    info.push("<div><div><img style=\"float:left;\" src=\" https://webapi.amap.com/images/autonavi.png \"/></div> ");
                    info.push("<div style=\"padding:0px 0px 0px 4px;\"><b>高德软件</b>");
                    info.push("电话 : 010-84107000   邮编 : 100102");
                    info.push("地址 :" + data.formattedAddress);
                    infoWindow.value = new AMap.InfoWindow({
                        content: info.join("<br/>"),  //使用默认信息窗体框样式，显示信息内容
                        offset: new AMap.Pixel(0, -5),
                        position: lonlat,
                        anchor: 'bottom-center',
                    });
                    infoWindow.value.open(map.value)
                }
                const closeInfo = () => {
                    infoWindow.value.close()
                }
                map.value.on('click',(e) => {
                    var marker = new AMap.Marker({
                        position: new AMap.LngLat(e.lnglat.lng, e.lnglat.lat),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                        title: '北京'
                    });
                    map.value.add(marker);
                    marker.on('click', (e) => {
                        let geocoder;
                        geocoder = new AMap.Geocoder({
                            radius: 30, //以已知坐标为中心点，radius为半径，返回范围内兴趣点和道路信息
                            extensions: "all" //返回地址描述以及附近兴趣点和道路信息，默认“base”
                        });
                        // //返回地理编码结果
                        // geocoder.on("complete", (status:any, data:any)=>{
                        //     console.log(data, 888888)
                        //     console.log(status, 888888)
                        // });
                        // 经纬度
                        let lnglat = [e.lnglat.lng, e.lnglat.lat]
                        //逆地理编码
                        geocoder.getAddress(lnglat, (status,data) => {
                            console.log(data, 888888)
                            openInfo([e.lnglat.lng, e.lnglat.lat], data.regeocode)
                        });
                    });
                    marker.on('mouseup',(e)=>{
                        console.log(e.originEvent)
                        if(e.originEvent.button){
                            map.value.remove(marker)
                        }
                    })
                })
                
                // marker.on('click', (e:any)=>{console.log(e); return openInfo([e.lnglat.lng, e.lnglat.lat], e)})

                // console.log(map,89999)
                console.log(AMapUI)
                if(!AMapUI.PathSimplifier.supportCanvas){
                    alert('当前环境不支持 Canvas！');
                    return;
                }else {
                    
                    var pathSimplifierIns = new AMapUI.PathSimplifier({
                        zIndex: 100,
                        //autoSetFitView:false,
                        map: map.value, //所属的地图实例

                        getPath: function(pathData, pathIndex) {

                            return pathData.path;
                        },
                        getHoverTitle: function(pathData, pathIndex, pointIndex) {

                            if (pointIndex >= 0) {
                                //point 
                                return pathData.name + '，点：' + pointIndex + '/' + pathData.path.length;
                            }

                            return pathData.name + '，点数量' + pathData.path.length;
                        },
                        renderOptions: {

                            renderAllPointsIfNumberBelow: 100 //绘制路线节点，如不需要可设置为-1
                        }
                    });

                    window.pathSimplifierIns = pathSimplifierIns;

                    //设置数据
                    pathSimplifierIns.setData([{
                        name: '路线0',
                        path: [
                            [116.405289, 39.904987],
                            [113.964458, 40.54664],
                            [111.47836, 41.135964],
                            [108.949297, 41.670904],
                            [106.380111, 42.149509],
                            [103.774185, 42.56996],
                            [101.135432, 42.930601],
                            [98.46826, 43.229964],
                            [95.777529, 43.466798],
                            [93.068486, 43.64009],
                            [90.34669, 43.749086],
                            [87.61792, 43.793308]
                        ]
                    }]);

                    //对第一条线路（即索引 0）创建一个巡航器
                    var navg1 = pathSimplifierIns.createPathNavigator(0, {
                        loop: true, //循环播放
                        speed: 1000000 //巡航速度，单位千米/小时
                    });

                    navg1.start();
                }

            }).catch(e => {
                console.log(e);
            })
        }
        onMounted(()=>{
            initMap()
        })
        return () => (
            <>
                <div id="container" style="width:100%;height:100%;"></div>
            </>
        )
    },
})
</script>

<style>

</style>