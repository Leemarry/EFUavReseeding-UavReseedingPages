<!--
 * @Descripttion: 
 * @version: 
 * @Author: Eugene
 * @Date: 2024-01-11 13:59:11
 * @LastEditors: Andy
 * @LastEditTime: 2024-01-11 18:11:40
-->
<!--  -->
<template>
    <div style="margin: 0px; width: 100%; height: 100%">
        <div id="cesiumContainer" style="width: 100%; height: 100%; position: absolute"></div>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

// import localForage from "localforage";
export default {
    name: '',
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
        //这里存放数据
        return {
            viewer: null,
        };
    },
    //让组件接收外部传来的数据
    props: {
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        clickop() {
            //         const myIndexedDB = localforage.createInstance({
            //     name: 'myIndexedDB'
            // })

            // myIndexedDB.setItem('key', 'value')
        },
        init() {
            Cesium.Ion.defaultAccessToken =
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyMGFhNTBjMi1kNGM4LTRjYWQtYWZhMC05ZTJhY2U2Y2U0ODkiLCJpZCI6MzE2MzYsImlhdCI6MTY2MDcxODA4NX0.jljbTXZPBaeSdsU7vuWg8V01oV1-fEA_qUa_08wXvq0"
            this.viewer = new Cesium.Viewer("cesiumContainer", {
                animation: false, //是否显示动画控件,左下角仪表
                baseLayerPicker: false, //是否显示图层选择器
                fullscreenButton: false, //是否显示全屏按钮
                geocoder: false, //是否显示geocoder小器件，右上角查询按钮
                homeButton: false, //是否显示Home按钮
                infoBox: false, //是否显示信息框
                sceneModePicker: false, //是否显示3D/2D选择器
                scene3DOnly: true, //如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
                selectionIndicator: false, //是否显示选取指示器组件
                timeline: false, //是否显示时间轴
                navigationHelpButton: false, //是否显示右上角的帮助按钮
                baselLayerPicker: false, // 将图层选择的控件关掉，才能添加其他影像数据
                shadows: true, //是否显示背影
                shouldAnimate: true,
                contextOptions: {
                    webgl: {
                        alpha: true
                    }
                },
                imageryProvider: new Cesium.TileMapServiceImageryProvider({
                    url: Cesium.buildModuleUrl("Assets/Textures/NaturalEarthII")
                }),

                // 加载地形，绘制路径的时候需要
                // terrainProvider: new Cesium.CesiumTerrainProvider({
                //     // url: "http://data.mars3d.cn/terrain"
                //     url: "http://data.marsgis.cn/terrain"
                // })
            })

            //去除版权信息
            this.viewer._cesiumWidget._creditContainer.style.display = "none"

            // 抗锯齿
            this.viewer.scene.fxaa = true
            this.viewer.scene.postProcessStages.fxaa.enabled = true

            // 将地球放大
            this.viewer.camera.zoomIn(7000000)
        },
        addOnlineTdtTile(type) {
            let TDU_Key = "e5b9de1f8a89a02fdc7bb3b1965cfe91" //天地图申请的密钥
            //在线天地图影像服务地址(墨卡托投影)
            let TDT_IMG_W =
                "http://{s}.tianditu.gov.cn/img_w/wmts?service=wmts&request=GetTile&version=1.0.0" +
                "&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}" +
                "&style=default&format=tiles&tk=" +
                TDU_Key

            const imageryProvider = new Cesium.WebMapTileServiceImageryProvider({
                url: TDT_IMG_W,
                layer: "img_w", //WMTS请求的层名称
                style: "default", //WMTS请求的样式名称
                format: "tiles", //MIME类型，用于从服务器检索图像
                tileMatrixSetID: "GoogleMapsCompatible", //  用于WMTS请求的TileMatrixSet的标识符
                subdomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"], //天地图8个服务器
                minimumLevel: 0, //最小层级
                maximumLevel: 18 //最大层级
            });

            this.viewer.imageryLayers.addImageryProvider(imageryProvider)


            // 给ImageryProvider对象重写loadImage方法
            imageryProvider.loadImage = (imageryProvider, url) => {
                console.log(url);
                return new Promise((resolve, reject) => {
                    const imgUrl = url.url;
                    const img = new Image();
                    img.src = imgUrl;
                    img.crossOrigin = "Anonymous";

                    img.onload = () => {
                        // 在页面上显示加载的图片
                        document.body.appendChild(img);

                        // 输出图片尺寸信息到控制台
                        console.log("Image width: ", img.width);
                        console.log("Image height: ", img.height);

                        resolve(img);
                    }

                    img.onerror = (err) => {
                        console.error("图片：【" + imgUrl + "】加载失败！");
                        reject(err);
                    }
                });
            };

            this.viewer.camera.setView({
                destination: Cesium.Cartesian3.fromDegrees(112.35, 28.84, 500.0)
            });
        },
        initmap() {
            // 假设有一个ImageryProvider对象
            let TDU_Key = "e5b9de1f8a89a02fdc7bb3b1965cfe91" //天地图申请的密钥
            //在线天地图影像服务地址(墨卡托投影)
            let TDT_IMG_W =
                "http://{s}.tianditu.gov.cn/img_w/wmts?service=wmts&request=GetTile&version=1.0.0" +
                "&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}" +
                "&style=default&format=tiles&tk=" +
                TDU_Key

            const imageryProvider = new Cesium.WebMapTileServiceImageryProvider({
                url: TDT_IMG_W,
                layer: "img_w", //WMTS请求的层名称
                style: "default", //WMTS请求的样式名称
                format: "tiles", //MIME类型，用于从服务器检索图像
                tileMatrixSetID: "GoogleMapsCompatible", //  用于WMTS请求的TileMatrixSet的标识符
                subdomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"], //天地图8个服务器
                minimumLevel: 0, //最小层级
                maximumLevel: 18 //最大层级
            });

            // 使用重写后的imageryProvider加载地图
            var viewer = new Cesium.Viewer("cesiumContainer", {
                imageryProvider: imageryProvider,
                // 在success回调中重写imageryProvider的loadImage方法
                imageryProviderSuccess: function (imageryProvider) {
                    imageryProvider.loadImage = (imageryProvider, url) => {
                        return new Promise((resolve, reject) => {
                            const imgUrl = url.url;
                            const img = new Image();
                            img.src = imgUrl;
                            img.crossOrigin = "Anonymous";

                            img.onload = () => {
                                // 在页面上显示加载的图片
                                document.body.appendChild(img);

                                // 输出图片尺寸信息到控制台
                                console.log("Image width: ", img.width);
                                console.log("Image height: ", img.height);

                                resolve(img);
                            }

                            img.onerror = (err) => {
                                console.error("图片：【" + imgUrl + "】加载失败！");
                                reject(err);
                            }
                        });
                    };
                }
            });
        }


    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {

    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.initmap()
        // this.init()
        // this.addOnlineTdtTile()

    },
    beforeCreate() { }, //生命周期 - 创建之前
    beforeMount() { }, //生命周期 - 挂载之前
    beforeUpdate() { }, //生命周期 - 更新之前
    updated() { }, //生命周期 - 更新之后
    beforeDestroy() { }, //生命周期 - 销毁之前
    destroyed() { }, //生命周期 - 销毁完成
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>