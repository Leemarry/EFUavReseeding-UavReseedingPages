<!--
 * @Descripttion: 
 * @version: 
 * @Author: Eugene
 * @Date: 2023-12-15 14:38:50
 * @LastEditors: Andy
 * @LastEditTime: 2023-12-27 08:49:33
-->
<!--  -->
<template>
   <div class="con" id="box">
        <aside class="uavManagerAside-components aside">
            <!-- 左侧内容 -->
            <div class="resize"></div>
            <div class="line"></div>
            <section class="aside-section">
                <div class="aside-flex">
                    <div class="flex-item flex-fly">
                        <el-card class="top-card" shadow="always" @click="clickmsg">
                            <!-- <i class="el-icon-menu"></i> -->

                            <el-statistic>
                                <template slot="title">
                                    飞行架次
                                </template>
                                <template slot="formatter">
                                    {{flylist.length>0 ? flylist.length : '空'}}
                                </template>
                            </el-statistic>
                        </el-card>
                        <div class="table-card fly-table-card">
                            <!-- 骨架 -->
                            <el-skeleton :loading=" flyloading" animated :throttle="500">
                                <template slot="template">
                                    <el-card v-for="(item,index) of 8" :key="index" class="photo-card">

                                        <!-- 卡片的头部位 -->
                                        <template #header>
                                            <div class="card-header">
                                                <el-skeleton-item variant="h1" style="width: 100%" />
                                            </div>
                                        </template>
                                        <!-- 卡片显示的内容 -->
                                        <div>
                                            <el-skeleton-item variant="p" style="width: 100%" />
                                            <el-skeleton-item variant="p" style="width: 100%" />
                                            <el-skeleton-item variant="p" style="width: 100%" />
                                            <el-skeleton-item variant="p" style="width: 100%" />
                                        </div>
                                    </el-card>
                                </template>
                                <template>
                                    <el-card v-for="(item,index) of flylist" :key="index">
                                        <el-collapse>
                                            <el-collapse-item class="el-collapse-items" @dblclick.native="switchingFlightSorties(item)">
                                                <template slot="title">
                                                    <div style="width:100%">
                                                        <el-row class="bgbgbg">
                                                            <el-col :span="3"><span>{{ index + 1 }}</span></el-col>
                                                            <el-col :span="21">
                                                                <div class="">
                                                                    <span class="items-sn">{{ parseTime(item.aremdTime) }}</span>
                                                                </div>
                                                            </el-col>
                                                        </el-row>
                                                    </div>
                                                </template>
                                                <!-- 下面 -->
                                                <div class="rowlist" style="background: rgba(0, 0, 0, 0);">
                                                    <el-row>
                                                        <el-col class="rowlisttitle" :span="24">
                                                            <div style="">
                                                                <span class="fontweight">无人机编号&nbsp;:&nbsp;</span>
                                                                <span>{{item.uavId}}</span>
                                                            </div>
                                                        </el-col>
                                                        <el-col :span="24">
                                                            <div style="padding-left:10px;">
                                                                <span class="fontweight">时间&nbsp;:&nbsp;</span>
                                                                <span>{{time(item.aremdTime)}}</span>
                                                                <!--  -->
                                                            </div>
                                                        </el-col>
                                                        <el-col :span="24">
                                                            <div style="padding-left:10px;">
                                                                <span class="fontweight">飞行&nbsp;:&nbsp;</span>
                                                                <span>{{shuntime(item.flyingTime)}}</span>
                                                            </div>
                                                        </el-col>
                                                        <!-- place -->
                                                    </el-row>
                                                </div>
                                            </el-collapse-item>
                                        </el-collapse>
                                    </el-card>
                                </template>
                            </el-skeleton>

                        </div>
                    </div>
                    <div class="flex-item">
                        <el-card class="top-card" shadow="always">

                            <el-statistic title="图片架次">
                                <template slot="formatter">
                                    {{photolist.length>0 ? photolist.length : '空'}}
                                </template>
                            </el-statistic>
                        </el-card>
                        <div class="table-card">
                            <!-- 骨架 -->
                            <el-skeleton :loading="photoloading" animated :throttle="500">
                                <template slot="template">
                                    <el-card v-for="(item,index) of 6" :key="index" class="photo-card ">
                                        <!-- 卡片的头部位 -->
                                        <template #header>
                                            <div class="card-header">
                                                <el-row :gutter="5" style="width:100%">
                                                    <el-col :span="10">
                                                        <el-skeleton-item variant="h3" style="width: 100%" />
                                                    </el-col>
                                                    <el-col :span="14">
                                                        <el-skeleton-item variant="h3" style="width: 100%" />
                                                    </el-col>
                                                </el-row>
                                            </div>
                                        </template>
                                        <!-- 卡片显示的内容 -->
                                        <div class="image-demo">
                                            <!-- 卡片中显示的内容 -->
                                            <el-row class="image-info" :gutter="3">
                                                <el-col :xs="24" :sm="14" :md="14" :lg="14" :xl="24">
                                                    <el-skeleton-item variant="image" style="width: 100%; height: 100px ;overflow: auto; " />
                                                </el-col>
                                                <el-col :xs="24" :sm="10" :md="10" :lg="10" :xl="24">
                                                    <el-skeleton-item variant="text" style="width: 100%" />
                                                </el-col>
                                            </el-row>
                                        </div>
                                    </el-card>
                                </template>
                                <template>
                                    <div v-if="photolist && photolist.length">
                                        <el-card v-for="(item,index) of photolist" :key="index" class="photo-card ">
                                            <!-- 卡片的头部位 -->
                                            <template #header>
                                                <div class="card-header">
                                                    <el-checkbox v-if="islatestSortyInfo" v-model="item.checked" @change="photochangeChecked(item,$event)">{{`图片${item.id}`}}</el-checkbox>
                                                    <div v-else>{{item.id}} </div>
                                                    <div>
                                                        <!-- 修改按钮 -->
                                                        <el-button type="text" icon="el-icon-edit-outline" @click="openpage(item)" />
                                                        <!-- 删除按钮 -->
                                                        <el-button type="text" icon="el-icon-delete" @click="psendC(item)" />
                                                        <!-- 开关按钮 -->
                                                        <el-button type="text" icon="el-icon-switch-button" @click="otherpage()" />
                                                    </div>
                                                </div>
                                            </template>
                                            <!-- 卡片显示的内容 -->
                                            <div class="image-demo">
                                                <!-- 卡片中显示的内容 -->
                                                <el-row :gutter="3" class="image-info">
                                                    <el-col :xs="24" :sm="14" :md="14" :lg="14" :xl="24">
                                                        <el-image style="width: 100%; height: 100px ;overflow: auto; " :src="item.pathImage" fit="cover" :preview-src-list="[item.pathImage]">
                                                        </el-image>
                                                    </el-col>
                                                    <el-col class="demo-text" :xs="24" :sm="10" :md="10" :lg="10" :xl="24">
                                                        <div>
                                                            <!-- <span class="fontweight">时间&nbsp;:&nbsp;</span>
                                                                <span>{{time(item.aremdTime)}}</span> -->
                                                            <div>
                                                                <span class="fontweight">时间&nbsp;:&nbsp;</span>
                                                                {{parseTime(item.createDate)}}
                                                            </div>
                                                            <!-- <div>{{parseTime(item.createDate)}}</div> -->
                                                            <div><span class="fontweight">经纬度&nbsp;:&nbsp;</span>
                                                                {{`(${ (item.lng).toFixed(3)},${(item.lat).toFixed(3)})`}}</div>
                                                        </div>
                                                    </el-col>
                                                </el-row>

                                            </div>
                                        </el-card>
                                    </div>
                                    <el-empty v-else description="暂无数据"></el-empty>
                                </template>

                            </el-skeleton>

                        </div>
                    </div>
                    <div class="flex-item">
                        <el-card class="top-card el-card" shadow="always">
                            <el-statistic title="洞斑架次" @click.native="getCoordinates">
                                <template slot="formatter">
                                    {{pointlist.length>0 ? pointlist.length : '空'}}
                                </template>
                            </el-statistic>
                        </el-card>
                        <div class="table-card parent-element" id="coio">
                            <!-- 骨架 -->
                            <el-skeleton :loading="pointloading" animated :throttle="500">
                                <template slot="template">
                                    <el-card v-for="(item,index) of 8" :key="index" class="photo-card ">
                                        <!-- 卡片的头部位 -->
                                        <template #header>
                                            <div class="card-header">
                                                <el-skeleton-item variant="h1" style="width: 100%" />
                                            </div>
                                        </template>
                                        <!-- 卡片显示的内容 -->
                                        <div style="height:80px;width:100%">
                                            <el-row :gutter="20">
                                                <el-col :span="16">
                                                    <el-skeleton-item variant="h3" style="width: 100%" />
                                                    <el-skeleton-item variant="p" style="width: 100%" />
                                                </el-col>
                                                <el-col :span="8">
                                                    <el-skeleton-item variant="p" style="width: 100%" />
                                                </el-col>
                                            </el-row>
                                        </div>
                                    </el-card>
                                </template>
                                <template>
                                    <div v-if="pointlist && pointlist.length">
                                        <el-card v-for="(item,index) of pointlist" :key="index" :class="['point-card , child-element ' , `photoId-${item.photoId}`]">
                                            <!-- 卡片的头部位 -->
                                            <template #header>
                                                <div class="card-header">
                                                    <el-checkbox v-if="islatestSortyInfo" v-model="item.checked" @change="checked=>pointchangeChecked(item,checked)">{{`洞斑${item.id}`}}</el-checkbox>
                                                    <div v-else>{{`洞斑${item.id}`}} </div>
                                                    <div>
                                                        <!-- 修改按钮 -->
                                                        <el-button type="text" icon="el-icon-edit-outline" @click="startwebWorker" />
                                                        <!-- 删除按钮 -->
                                                        <el-button type="text" icon="el-icon-delete" />
                                                        <!-- 开关按钮 -->
                                                        <el-button type="text" icon="el-icon-switch-button" />
                                                    </div>
                                                </div>
                                            </template>
                                            <!-- 卡片显示的内容 -->
                                            <div style="font-size: 12px;">
                                                <div><span class="fontweight">经纬度&nbsp;:&nbsp;</span>
                                                    {{`(${ (item.lng).toFixed(3)},${(item.lat).toFixed(3)})`}}</div>
                                            </div>
                                        </el-card>
                                    </div>
                                    <el-empty v-else description="暂无数据"></el-empty>
                                </template>
                            </el-skeleton>
                        </div>
                    </div>
                </div>
            </section>
        </aside>
        <main class="cesium-components main">
            <div class="main">
                <CesiumMap ref="CesiumMap" :defaultUavSn="defaultUavSn" :visible=CesiumDrawVisible></CesiumMap>
            </div>
            <!-- 选中洞点 -->
            <footer>
                <div class="resize resize-top"></div>
                <div class="line"></div>
                <section style="margin-top:5px">
                    <div class="bottom">
                        <div v-if="checkedPoint.length>0" class="hascheckedPoint">
                            <div class="settingBnt">
                                <el-button @click="saveRouteData">保存航线</el-button>
                                <el-button>上传航线</el-button>
                                <el-button @click="isVisableSetunifiedHeight=!isVisableSetunifiedHeight">设置统一高度</el-button>
                                <div class="block" v-show="isVisableSetunifiedHeight">
                                    <el-slider @change="setunifiedHeight" v-model="unifiedHeight" :max="500" show-input>
                                    </el-slider>
                                </div>
                            </div>
                            <el-row :gutter="5">
                                <draggable v-model="checkedPoint" group="one" @change="change" @start="start" @end="end">
                                    <el-col :xs="8" :sm="8" :md="8" :lg="6" :xl="6" v-for="(item) of checkedPoint" :key="item.id">
                                        <el-card shadow="hover" :class="['point-card' , item.photoid]">
                                            <!-- 卡片的头部位 -->
                                            <template #header>
                                                <div class="card-header">
                                                    <div>
                                                        <el-checkbox v-if="islatestSortyInfo" v-model="item.checked" @change="checked=>pointchangeChecked(item,checked)">{{`洞斑${item.id}`}}</el-checkbox>
                                                        <div v-else>{{`洞斑${item.id}`}} </div>
                                                    </div>
                                                    <div>
                                                        <!-- 修改按钮 -->
                                                        <el-button type="text" icon="el-icon-edit-outline" />
                                                        <!-- 删除按钮 -->
                                                        <el-button type="text" icon="el-icon-delete" @click="removethispoint(item)" />
                                                        <!-- 开关按钮 -->
                                                        <el-button type="text" icon="el-icon-switch-button" />
                                                    </div>
                                                    <div style="width:180px">
                                                        <el-slider v-model="item.alt" :max="500"></el-slider>
                                                        <!-- <input type="range" id="volume" name="volume" min="0" max="11" /> -->
                                                    </div>
                                                </div>
                                            </template>
                                            <!-- 卡片显示的内容 -->
                                            <div style="font-size: 12px;">
                                                <div><span class="fontweight">经纬度&nbsp;:&nbsp;</span>
                                                    {{`(${ (item.lng).toFixed(3)},${(item.lat).toFixed(3)})`}}</div>
                                            </div>
                                        </el-card>
                                    </el-col>
                                </draggable>

                            </el-row>

                        </div>
                        <el-empty :image-size="100" v-else description="暂无航线数据"></el-empty>
                    </div>

                </section>
            </footer>
        </main>
        <!-- 弹窗设置高度 -->
        <!-- <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
            <span>需要注意的是内容是默认不居中的</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog> -->
        <!-- <el-dialog title="安全起飞高度：" width="284px" :visible.sync="isdialogFormVisible">
            <div class="dialog">
                <el-form :model="takeoffAltform">
                    <el-input v-model="takeoffAltform.takeoffAlt" autocomplete="off"></el-input>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button size="mini" @click="isdialogFormVisible = false">取 消</el-button>
                    <el-button size="mini" type="primary" @click="takeoffAltsummit()">确 定</el-button>
                </div>
            </div>
        </el-dialog> -->

    </div>
    
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  name: '',
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {

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

},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类

</style>