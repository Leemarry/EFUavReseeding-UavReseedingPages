<!-- <!==
 * @Descripttion: 
 * @version: 
 * @Author: Eugene
 * @Date: 2024-02-03 11:34:33
 * @LastEditors: Andy
 * @LastEditTime: 2024-02-03 11:34:34
==>
<template>
    <div id="Map" class="map-home" ref="map"></div>
</template>
<script>
import "ol/ol.css";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import XYZ from "ol/source/XYZ";
import { Map, View, Feature, ol } from "ol";
import { Style, Icon } from "ol/style";
// 点要引入
import { Point } from "ol/geom";
// 线要引入
import LineString from "ol/geom/LineString";

import Stroke from "ol/style/Stroke";
import Fill from "ol/style/Fill";
import Circle from "ol/style/Circle";
import  Text  from 'ol/style/Text'

import { defaults as defaultControls } from "ol/control";
import { fromLonLat } from "ol/proj";  //    projection: 'EPSG:4326'
import { number } from 'echarts';
import BingMaps from 'ol/source/BingMaps'
//根据项目需要去定义图层类型
let tianditu_img_w = null;//天地图卫星影像
let tianditu_cia_w = null;//卫星影像注记图层
let tianditu_vec_w = null;//矢量图层
let tianditu_cva_w = null;//矢量注记图层
let ob_layer_Map = null; // 项目地图源
let bingStyles = [
  'RoadOnDemand', // 地图
  'Aerial', // 卫星图
  'AerialWithLabelsOnDemand', // 卫星混合地图
  'CanvasDark', // 夜晚图
  'OrdnanceSurvey' // 显示很多禁止拍照图片
]
// 边界json数据
export default {
  data() {
    return {
      zoom: 15,
      centerPosition: [114.27932686576446, 37.540419484036846], // 用户当前位置经纬度114.474721, 30.457096 [108.522097, 37.272848]
      pointlinecoordinates: '',
      pointlineList: [],
      map: null,
      pointLayer: null,
      featuresArr: [],
      LineList: [],
      tileCache: {}, // 瓦片缓存对象
    };
  },
  props: {
    selectnum: Number,
  },
  watch: {
   

  },
  methods: {
    // 传递数据
    // this.map.getView().setZoom(this.zoom);
    kmzmap(pointList) {
      // console.log('传递参数');
      // console.log(pointList);
      // this.pointlinecoordinates = pointList
      // this.pointlineList = pointList.map(point => [point.a, point.b]);
      // console.log(this.pointlineList);
      // localStorage.getItem('defaultUav138')
      this.LineList=[]
      this.map.removeLayer( this.pointLayer);//删除图层
      this.addPoints(pointList);//根据坐标点批量打点
    },
    /**
     * 初始化地图
     */
    initMap() {
      tianditu_img_w = new TileLayer({
        title: '天地图卫星影像',
        source: new XYZ({
          visible: false,
          wrapX: false,
          url: 'http://t4.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=9bd7a023aac6866eb11ddbff04f9d5da'
        })
      })

      tianditu_cia_w = new TileLayer({
        title: '天地图影像注记图层',
        source: new XYZ({
          visible: false,
          wrapX: false,
          url: 'http://t4.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=9bd7a023aac6866eb11ddbff04f9d5da'
        })
      })
      tianditu_vec_w = new TileLayer({
        title: '天地图矢量图层',
        source: new XYZ({
          visible: true,
          wrapX: false,
          url: 'http://t4.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=9bd7a023aac6866eb11ddbff04f9d5da'
        })
      })

      tianditu_cva_w = new TileLayer({
        title: '天地图矢量注记图层',
        source: new XYZ({
          visible: true,
          wrapX: false,
          url: 'http://t{0-7}.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=9bd7a023aac6866eb11ddbff04f9d5da'
        })
      })
      // 项目地图源
      ob_layer_Map = new TileLayer({
        title: '项目推荐地图源BingMaps图层',
        // source: new OSM()
        source: new BingMaps({
          key: 'Av6Re9f7niM0uJOAjG7m5O9dS4N4IcN-9yZc0r7RHqE-qGsKDv2s1YN1M5XJzK10',
          imagerySet: bingStyles[2]
        }),
        // opacity: 0.5,//透明度，作为图层属性进行设置
      })

      this.map = new Map({
        target: "Map",
        controls: defaultControls({
          zoom: true
        }).extend([]),
        // layers: [tianditu_img_w,tianditu_cia_w,tianditu_vec_w,tianditu_cva_w],
        layers: [ob_layer_Map,tianditu_cva_w],
        view: new View({
          center: fromLonLat(this.centerPosition),
      
          zoom: this.zoom,
          // maxZoom: 19,
          // minZoom: 2
        })
      });
    },




  },
  mounted() {
     this.initMap();//初始化地图方法
    let coordinates = [
      { x: "106.918082", y: "31.441314", type: "lv" },
      { x: "86.36158200334317", y: "41.42448570787448", type: "bule" },
      { x: "89.71757707811526", y: "31.02619817424643", type: "lv" },
      { x: "116.31694544853109", y: "39.868508850821115", type: "bule" },
      { x: "103.07940932026341", y: "30.438580338450862", type: "lv" }
    ];
    // this.addPoints(coordinates);//根据坐标点批量打点
      // 监听地图滚动和缩放事件
      // this.$refs.map.$map.on('moveend', this.handleMoveEnd);
  }
};
</script>

<style lang="scss" scoped>
.map-home {
  width: 100%;
  height: 100%;
}
</style> -->