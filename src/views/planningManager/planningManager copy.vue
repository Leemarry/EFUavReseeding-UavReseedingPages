<!--
 * @Descripttion: 
 * @version: 
 * @Author: Eugene
 * @Date: 2023-11-23 19:08:24
 * @LastEditors: likai 2806699104@qq.com
 * @LastEditTime: 2024-07-01 15:53:32
-->
<!--  -->
<template>
    <div class="con" v-loading="fullloading" :element-loading-text="loadingText" element-loading-background="rgba(0, 0, 0, 0.8)">
        <aside>
            <div class="resize"></div>
            <div class="line"></div>
            <div class="section aside-section">
                <div class="abP">
                    <el-button size="medium" round @click="clickHandle">处理</el-button>
                    <!-- uploadProcess  openTaskDialog-->
                    <el-button size="medium" round @click="uploadProcess">上传</el-button>
                </div>
                <!-- 以前 -->
                <div class="aside-flex" v-if="currentComponent =='beforeComponents'">
                    <div class="flex-item flex-fly">
                        <el-card class="top-card fly-card" shadow="always">
                            <el-statistic class="fly-statistic">
                                <template slot="title">
                                    <span class="fly-title cursorStyle" @click="selectUav()" :title="`当前：${defaultUavSn}  \n 点击切换飞行列表`">飞行架次</span>
                                </template>
                                <template slot="formatter">
                                    <span> {{flylist.length>0 ? flylist.length : '空'}}</span>
                                    <el-select ref="selectRef" class="fly-select" v-model="defaultUavSn" placeholder="请选择" @change="selectTrigger(defaultUavSn)">
                                        <el-option v-for="(item,index) in uavs" :key="index" :label="item.uavName" :value="item.uavId">
                                            <span style="float: left">{{ item.uavName }}</span>
                                            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.uavId }}</span>
                                        </el-option>
                                    </el-select>
                                </template>
                            </el-statistic>
                        </el-card>
                        <div class="table-card fly-table-card">
                            <el-skeleton :loading=" leftloading" animated :throttle="500">
                                <template slot="template">
                                    <el-card v-for="(item,index) of 7" :key="index" class="photo-card">
                                        <template #header>
                                            <div class="card-header">
                                                <el-skeleton-item variant="h1" style="width: 100%" />
                                            </div>
                                        </template>
                                        <div>
                                            <el-skeleton-item variant="p" style="width: 100%" v-for="index of 4" :key="index" />
                                        </div>
                                    </el-card>
                                </template>
                                <template>
                                    <div v-if="flylist && flylist.length>0">
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
                                                                </div>
                                                            </el-col>
                                                            <el-col :span="24">
                                                                <div style="padding-left:10px;">
                                                                    <span class="fontweight">飞行&nbsp;:&nbsp;</span>
                                                                    <span>{{shuntime(item.flyingTime)}}</span>
                                                                </div>
                                                            </el-col>
                                                        </el-row>
                                                    </div>
                                                </el-collapse-item>
                                            </el-collapse>
                                        </el-card>
                                    </div>
                                    <el-empty v-else description="暂无数据"></el-empty>
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
                            <el-skeleton :loading="centerloading" animated :throttle="500">
                                <template slot="template">
                                    <el-card v-for="(item,index) of 6" :key="index" class="photo-card ">
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
                                        <div class="image-demo">
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
                                                    <div class="card-header-text" v-else>{{`编号：${item.id}`}} </div>
                                                    <!-- <div>

                                                       <el-button type="text" icon="el-icon-edit-outline" @click="openpage(item)" />

                                                       <el-button type="text" icon="el-icon-delete" @click="psendC(item)" />

                                                       <el-button type="text" icon="el-icon-switch-button" @click="otherpage()" />
                                                   </div> -->
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
                                                            <div>
                                                                <span class="fontweight">时间&nbsp;:&nbsp;</span>
                                                                {{parseTime(item.createDate)}}
                                                            </div>
                                                            <div><span class="fontweight">经纬度&nbsp;:&nbsp;</span>
                                                                {{`(${item.lng ? (item.lng).toFixed(3) : '未知'},${item.lat ? (item.lat).toFixed(3) : '未知'})`}}</div>
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
                                    {{holelist.length>0 ? holelist.length : '空'}}
                                </template>
                            </el-statistic>
                        </el-card>
                        <div class="table-card parent-element" id="coio">
                            <el-skeleton :loading="rightloading" animated :throttle="500">
                                <template slot="template">
                                    <el-card v-for="(item,index) of 8" :key="index" class="photo-card ">
                                        <template #header>
                                            <div class="card-header">
                                                <el-skeleton-item variant="h1" style="width: 100%" />
                                            </div>
                                        </template>
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
                                    <div v-if="holelist && holelist.length">
                                        <el-card v-for="(item,index) of holelist" :key="index" :class="['point-card , child-element ' , `photoId-${item.photoId}`]">
                                            <!-- 卡片的头部位 -->
                                            <template #header>
                                                <div class="card-header">
                                                    <el-checkbox v-if="islatestSortyInfo" v-model="item.checked" @change="checked=>holechangeChecked(item,checked)">{{`洞斑${item.id}`}}</el-checkbox>
                                                    <div class="card-header-text" v-else>{{`洞斑${item.id}`}} </div>
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
                <!-- 后来--处理 -->
                <div class="aside-flex" v-if="currentComponent =='nowComponents'">
                    <div class="flex-item flex-fly">
                        <el-card class="top-card fly-card" shadow="always">
                            <el-statistic class="fly-statistic">
                                <template slot="title">
                                    <span class="fly-title cursorStyle" @click="selectUav()" :title="`当前：${defaultUavSn}  \n 点击切换UAV`">处理列表</span>
                                </template>
                                <template slot="formatter">
                                    <span> {{handleList.length>0 ? handleList.length : '空'}}</span>
                                    <el-select ref="selectRef" class="fly-select" v-model="defaultUavSn" placeholder="请选择" @change="selectTrigger(defaultUavSn)">
                                        <el-option v-for="(item,index) in uavs" :key="index" :label="item.uavName" :value="item.uavId">
                                            <span style="float: left">{{ item.uavName }}</span>
                                            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.uavId }}</span>
                                        </el-option>
                                    </el-select>
                                </template>
                            </el-statistic>
                        </el-card>
                        <div class="table-card fly-table-card">
                            <el-skeleton :loading="leftloading" animated :throttle="500">
                                <template slot="template">
                                    <el-card v-for="(item,index) of 7" :key="index" class="photo-card">
                                        <template #header>
                                            <div class="card-header">
                                                <el-skeleton-item variant="h1" style="width: 100%" />
                                            </div>
                                        </template>
                                        <div>
                                            <el-skeleton-item variant="p" style="width: 100%" v-for="index of 4" :key="index" />
                                        </div>
                                    </el-card>
                                </template>
                                <template>
                                    <div v-if="handleList && handleList.length>0">
                                        <el-card v-for="(item,index) of handleList" :key="index">
                                            <el-collapse>
                                                <el-collapse-item class="el-collapse-items">
                                                    <template slot="title">
                                                        <div style="width:100%;" :style="{ 'color' : (currentHandleId == item.id  ? '#068bed':'') }" class="flexDiv">
                                                            <div> <span>{{ index + 1 }}</span></div>
                                                            <div @click.stop="chooseOtherHandle(item)"> <span class="items-sn">{{ parseTime(item.date) }}</span></div>
                                                        </div>
                                                    </template>
                                                    <!-- 下面 -->
                                                    <div class="rowlist flexDiv" style="background: rgba(0, 0, 0, 0);">
                                                        <div style="">
                                                            <span class="fontweight">处理时间&nbsp;:&nbsp;</span>
                                                            <span>{{time(item.date) }}</span>
                                                        </div>
                                                        <div style="">
                                                            <span class="fontweight">原点经度&nbsp;:&nbsp;</span>
                                                            <span>{{item.lng}}</span>
                                                        </div>
                                                        <div style="">
                                                            <span class="fontweight">原点纬度&nbsp;:&nbsp;</span>
                                                            <span>{{item.lat}}</span>
                                                        </div>
                                                        <div style="">
                                                            <span class="fontweight">地高&nbsp;:&nbsp;</span>
                                                            <span>{{item.lat}}</span>
                                                        </div>
                                                        <div style="">
                                                            <span class="fontweight">飞行高 &nbsp;:&nbsp; </span>
                                                            <span>{{item.lat}}</span>
                                                        </div>

                                                    </div>
                                                </el-collapse-item>
                                            </el-collapse>
                                        </el-card>
                                    </div>
                                    <el-empty v-else description="暂无数据"></el-empty>
                                </template>
                            </el-skeleton>
                        </div>
                    </div>
                    <div class="flex-item">
                        <el-card class="top-card" shadow="always">
                            <el-statistic title="作业地块列表">
                                <template slot="formatter">
                                    {{blockList.length>0 ? blockList.length : '空'}}
                                </template>
                            </el-statistic>
                        </el-card>
                        <div class="table-card">
                            <el-skeleton :loading="centerloading" animated :throttle="500">
                                <template slot="template">
                                    <el-card v-for="(item,index) of 5" :key="index" class="photo-card ">
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
                                        <div class="image-demo">
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
                                    <div v-if="blockList && blockList.length">
                                        <el-card v-for="(item,index) of blockList" :key="index" class="photo-card ">
                                            <template #header>
                                                <div class="card-header">
                                                    <div class="card-header-text">{{`地块编号：${item.id}`}} </div>
                                                </div>
                                            </template>
                                            <!-- 卡片显示的内容 -->
                                            <div class="image-demo">
                                                <el-row :gutter="3" class="image-info">
                                                    <el-col :xs="24" :sm="14" :md="14" :lg="14" :xl="24">
                                                        <el-image style="width: 100%; height: 100px ;overflow: auto; " :src="`data:image/png;base64,${item.img}`" fit="cover" :preview-src-list="[`data:image/png;base64,${item.img}`]">
                                                        </el-image>
                                                    </el-col>
                                                    <el-col class="demo-text" :xs="24" :sm="10" :md="10" :lg="10" :xl="24">
                                                        <div>
                                                            <div>
                                                                <span class="fontweight">空斑面积&nbsp;:&nbsp;{{ item.gapSquare }}</span>
                                                                <span class="fontweight">补播区域数&nbsp;:&nbsp; {{ item.reseedAreaNum }}</span>
                                                            </div>
                                                            <div><span class="fontweight">经纬度&nbsp;:&nbsp;</span>
                                                                {{`(${item.centreLongitude ? (item.centreLongitude).toFixed(5) : '未知'},${item.centreLatitude ? (item.centreLatitude).toFixed(5) : '未知'})`}}</div>
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
                            <el-statistic title="补播路径列表" @click.native="getCoordinates">
                                <template slot="formatter">
                                    {{pointlist.length>0 ? pointlist.length : '空'}}
                                </template>
                            </el-statistic>
                        </el-card>
                        <div class="table-card parent-element" id="coio">
                            <el-skeleton :loading="rightloading" animated :throttle="500">
                                <template slot="template">
                                    <el-card v-for="(item,index) of 7" :key="index" class="photo-card ">
                                        <template #header>
                                            <div class="card-header">
                                                <el-skeleton-item variant="h1" style="width: 100%" />
                                            </div>
                                        </template>
                                        <div style="height:80px;width:100%">
                                            <el-row :gutter="20">
                                                <el-col :span="16">
                                                    <el-skeleton-item variant="h3" style="width: 100%" />
                                                </el-col>
                                                <el-col :span="8">
                                                    <el-skeleton-item variant="p" style="width: 100%" />
                                                </el-col>
                                                <el-col :span="16">
                                                    <el-skeleton-item variant="p" style="width: 100%" />
                                                </el-col>
                                            </el-row>
                                        </div>
                                    </el-card>
                                </template>
                                <template>
                                    <div v-if="pointlist && pointlist.length">
                                        <el-card v-for="(item,index) of pointlist" :key="index" :class="['point-card , child-element ' , `photoId-${item.photoId}`]">
                                            <template #header>
                                                <div class="card-header">
                                                    <el-checkbox v-model="item.checked" @change="checked=>pointchangeChecked(item,checked)">{{`路径点${item.id}`}}</el-checkbox>
                                                </div>
                                            </template>
                                            <div style="font-size: 12px;" class="flexDiv">
                                                <div class="fontweight">经纬度&nbsp;:&nbsp; {{`(${ (item.lng).toFixed(5)},${(item.lat).toFixed(5)})`}}</div>
                                                <div class="fontweight">大地高&nbsp;:&nbsp; {{ (item.alt).toFixed(3) }}</div>
                                                <div class="fontweight">所需草种数&nbsp;:&nbsp; {{item.seedNum}}</div>
                                            </div>
                                        </el-card>
                                    </div>
                                    <el-empty v-else description="暂无数据"></el-empty>
                                </template>
                            </el-skeleton>
                        </div>
                    </div>
                </div>

            </div>
        </aside>
        <!--右侧 -->
        <main>
            <div class="main">
                <CesiumMap ref="CesiumMap" :defaultUavSn="defaultUavSn" :visible=CesiumDrawVisible></CesiumMap>
            </div>
            <!--  -->
            <footer>
                <div class="resize-top"></div>
                <div class="line-level "></div>
                <section class="footer-section">
                    <div class="footer-bottom">
                        <!-- choosePointList  checkedPoint-->
                        <div v-if="choosePointList.length>0" class="hascheckedPoint">
                            <div class="settingBnt">
                                <el-button @click="saveRouteToStore(true)">保存航线</el-button>
                                <el-button @click="openTaskDialog">上传</el-button>
                                <el-button @click="downloadRouteTask">下载</el-button>
                                <el-button @click="isVisableSetunifiedHeight=!isVisableSetunifiedHeight">设置统一高度</el-button>
                                <div class="block" v-show="isVisableSetunifiedHeight">
                                    <el-slider @change="setunifiedHeight" v-model="unifiedHeight" :max="500" show-input>
                                    </el-slider>
                                </div>
                            </div>
                            <div class="checked-tablecard">
                                <el-row :gutter="5">
                                    <draggable v-model="choosePointList" group="one" @change="change" @start="start" @end="end">
                                        <el-col :xs="8" :sm="8" :md="8" :lg="6" :xl="6" v-for="(item) of choosePointList" :key="item.id">
                                            <el-card shadow="hover" :class="['point-card' , item.photoid]">
                                                <template #header>
                                                    <div class="card-header">
                                                        <div>
                                                            <el-checkbox v-model="item.checked" @change="checked=>pointchangeChecked(item,checked)">{{`路径点${item.id}`}}</el-checkbox>
                                                            <!-- <div v-else>{{`洞斑${item.id}`}} </div> -->
                                                        </div>
                                                        <div>
                                                            <!-- <el-button type="text" icon="el-icon-edit-outline" />
                                                            <el-button type="text" icon="el-icon-switch-button" /> -->
                                                            <!-- <el-button type="text" icon="el-icon-delete" @click="removethispoint(item)" /> -->
                                                        </div>
                                                        <div style="width:180px">
                                                            <el-slider v-model="item.alt" :max="500"></el-slider>
                                                        </div>
                                                    </div>
                                                </template>
                                                <div style="font-size: 12px;">
                                                    <div><span class="fontweight">经纬度&nbsp;:&nbsp;</span>
                                                        {{`(${ (item.lng).toFixed(5)},${(item.lat).toFixed(5)})`}}</div>
                                                </div>
                                            </el-card>
                                        </el-col>
                                    </draggable>
                                </el-row>
                            </div>
                        </div>
                        <el-empty :image-size="100" v-else description="暂无航线数据"></el-empty>
                    </div>
                </section>
            </footer>
        </main>
        <!-- 处理弹窗 -->
        <div id="handleDialog" class="block" @click="closeHandleDialog">
            <div class="content" id="div1">
                <div id="close">
                    <span id="close-button"></span>
                    <div></div>
                </div>
                <div id="div2">
                    <form @submit="handleSubmit">
                        <div class="formchild">
                            <label for="name">ENU原点经纬度和地高:</label>
                            <!-- <select v-model="selected" @change="handleChange">
                                                <option value="" disabled selected>请选择</option>
                                                <option v-for="option in uavs" :key="option.uavId" v-bind:value="option.uavId">
                                                    {{ option.uavName }}
                                                </option>
                                            </select> -->
                            <div class="input-list">
                                <!-- 原点经纬度和地高 -->
                                <label for="longitude">经度：</label>
                                <input type="number" id="longitude" v-model="handleInfo.longitude">
                                <label for="latitude">纬度：</label>
                                <input type="number" id="latitude" v-model="handleInfo.latitude">
                                <label for="height">地高：</label>
                                <input type="number" id="height" v-model="handleInfo.height">
                            </div>
                        </div>
                        <div class="formchild">
                            <label for="uavheight">播种无人机飞行高度:</label>
                            <input type="number" id="uavheight" v-model="handleInfo.uavheight"> <span>m</span>
                        </div>
                        <div class="formchild">
                            <label class="texts">补播机构参数：<span @click="plus">+</span></label>
                            <input v-show="isshow" type="text" id="email" placeholder="请输入机构参数（4-8字符）" v-model="handleInfo.size"> <span v-show="isshow">cm</span>
                        </div>
                        <div class="formchild">
                            <label for="size">口径大小:</label>
                            <input type="number" id="email" v-model="handleInfo.size"> <span>cm</span>
                        </div>
                        <div class="formchild">
                        </div>
                    </form>

                </div>
                <div id="footer">
                    <el-button size="mini" @click="handleSubmit">提交</el-button>
                    <el-button size="mini" @click="canlceHandle">取消</el-button>
                </div>
            </div>

        </div>
        <!-- 上传补播路径任务弹窗 -->
        <missionTaskDialog ref="missionTaskDialog" @submit:missionTask=uploadRouteTask></missionTaskDialog>
        <processDialog ref="processDialog" :defaultUavSn="defaultUavSn"></processDialog>
        <!-- 是否保存 -->
        <el-dialog title="下载完成" :visible.sync="centerDialogVisible" width="20%" center>
            <span>航线下载完成，请保存？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="respondRouteInfo()">确 定</el-button>
            </span>
        </el-dialog>
    </div>

</template>

<script>
// import Worker from '@/views/planningManager/my.worker'
import { parseTime, filtersType } from "@/utils/index";
import { title } from "@/settings.js";
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import draggable from "vuedraggable"; // 拖拽
import { mapGetters } from 'vuex'
import CesiumMap from "../components/Cesium/CesiumMap.vue";
import store from "@/store";
import missionTaskDialog from "./components/missionTask.vue"
import processDialog from "./components/processDialog.vue";
import * as turf from '@turf/turf';
var latestSortyInfo = {}; //最新架次
var flyInfolist = [];
var seedingInfolist = [];
export default {
    name: "",
    //import引入的组件需要注入到对象中才能使用
    components: {
        missionTaskDialog,
        processDialog,
        CesiumMap,
        draggable,
    },
    data() {
        //这里存放数据
        return {
            centerDialogVisible: false,
            isshow: false,
            loadingText: '拼命加载中',
            /**补播任务 */
            missionTask: {
                missionType: 0,
                speed: 0,
                maxSpeed: 20,
            },
            currentComponent: 'nowComponents',
            uavs: [],
            handleInfo: {},
            currentHandleId: null,
            labelPosition: 'top',
            value: '',

            defaultUavSn: '',
            windows: {}, // 用于存储浏览器窗口对象的引用
            isVisableSetunifiedHeight: false,
            unifiedHeight: 50, // 默认50统一高度
            fullloading: false,
            leftloading: true,
            centerloading: false,
            rightloading: false,
            islatestSortyInfo: true,

            CesiumDrawVisible: false,
            checked: true,
            lazysrc: true,
            photolist: [],
            blockList: [],
            handleList: [],
            flylist: [],
            holelist: [],
            pointlist: [],
            isAllChecked: {
                id: null,
                isAllChecked: null,
            },
            checkedPoint: [],
            choosePointList: [],
            selectedObjects: new Map(),
            resultArray: [],
        };
    },
    //让组件接收外部传来的数据
    props: {},
    //监听属性 类似于data概念
    computed: {
        ...mapGetters([
            'minke',
            'userId',
            'name',
            'userInfo',
            'currentMid',
            'currentMidUnifiedHeight',
            'webSocketMsg',
            'webSocketData',
            'messageId',
            'defaultUavHeartbeat',
            'currentWorkPoint',
        ])
    },
    //监控data中的数据变化
    watch: {
        checkedPoint(newVal, oldVal) {
            // console.log("重新绘制", newVal);
            this.calculateRouteInfo(newVal);
        },
        choosePointList(newVal, oldVal) {
            this.calculateRoute(newVal)
        }
    },
    //方法集合
    methods: {
        // #region -------------------------------------------------------------------- 组件传递 ---------------------------------------------------------
        getCoordinates() {
            console.log("注册地图点击事件");
            // this.$refs.CesiumMap.getCoordinates();
        },
        /**绘制航线 */
        drawLines(positions) {
            this.$refs.CesiumMap.drawLines(positions);
        },
        /**计算航线信息  绘制航线 */
        calculateRouteInfo(newVal) {
            const result = newVal.map((item) => [item.lng, item.lat]);
            console.log('航线', result);
            this.resultArray = result
            this.drawLines(result);
        },
        /**后端返回数据 */
        respondRouteInfo(newVal) {
            // choosePointList
            // this.centerDialogVisible = true
            const result = newVal.map((item) => [item.lng / 10000000, item.lat / 10000000, item.altRel / 100]);  // 差一个高度
            this.resultArray = result
            this.drawLines(result);
        },

        calculateRoute(newVal) {
            const result = newVal.map((item) => [item.lng, item.lat, item.alt]);
            console.log('计算航线信息result', result);
            this.resultArray = result
            this.drawLines(result);
        },
        /**保存航线☞store */
        saveRouteToStore(showMsg = false) {
            const dateId = Date.now();
            const mid = dateId;
            const unifiedHeight = null;
            var geoCoordinates = this.resultArray.map(coord => {
                let values = new Array(3);
                values[0] = coord[0]; // 航线经度
                values[1] = coord[1]; // 航纬度
                if (parseFloat(coord[2]) < 10) {
                    values[2] = 30; // 高度
                } else {
                    values[2] = coord[2];
                }
                return values;
            }); // [coord[0], coord[1], 20]
            this.$store.dispatch("routeData/setRouteData", { mid, geoCoordinates, unifiedHeight, }); // 存储store

            if (showMsg) {
                console.log('已保存');
                this.showToast('已保存')
            }
        },
        saveRouteData(showMsg) {
            /**数据处理  choosePointList*/
            // [[113.36887409647213,23.155143504551752,19.00895890982441],[113.36887409647213,23.155143504551752,19.00895890982441]] 
            var geoCoordinates = this.choosePointList.map((obj) => {
                let values = new Array(3);
                values[0] = obj.lng; // 航线经度
                values[1] = obj.lat; // 航纬度
                if (parseInt(obj.alt) < 10) {
                    values[2] = 30; // 高度
                } else {
                    values[2] = obj.alt;
                }
                return values;
            });
            const dateId = Date.now();
            const mid = dateId;
            const unifiedHeight = null;
            this.$store.dispatch("routeData/setRouteData", { mid, geoCoordinates, unifiedHeight, }); // 存储store
            if (showMsg) {
                this.showToast('已保存')
            }



        },
        sendrouteInfoEvent() { },
        /**设置统一高度 */
        setunifiedHeight() {
            var modifiedArray = this.choosePointList.map((obj) => {
                obj.alt = this.unifiedHeight;
                return obj;
            });
            this.choosePointList = modifiedArray;
        },
        //#endregion

        // #region ------------------------------------------------------------------ 后端查询 -----------------------------------------------------------------------------
        /**查询初始 */
        async queryInfo(UavSn = this.defaultUavSn) {
            var data = await this.queryFlightNumber(UavSn);
            this.flylist = data;
            if (data.length >= 1) {
                latestSortyInfo = data[0]; // 获取架次最新id
                this.queryPhotoInfo(data[0].id, UavSn);
                this.queryHoleInfo(data[0].id, UavSn);
            } else {
                this.photolist = []
                this.holelist = []
            }
        },
        /**最新的初始查询 */
        async queryNewInfo() {
            var data = await this.queryHandle()
            this.handleList = data || [];
            if (data.length >= 1) {
                this.currentHandleId = data[0].id
                this.queryBlockList(data[0].id);
                this.queryPointList(data[0].id);
            } else {
                this.blockList = []
                this.pointlist = []
            }
        },
        //#region 现在左至右
        /**选择其他处理信息 */
        async chooseOtherHandle(handleObj) {
            const latestHandleId = handleObj.id
            if (this.currentHandleId == latestHandleId) return false;

            this.queryBlockList(latestHandleId),
                this.queryPointList(latestHandleId)
            this.currentHandleId = latestHandleId
            // const res= await Promise.all([ this.queryBlockList(latestHandleId),
            // this.queryPointList(latestHandleId)]).then([])
        },
        /**查询处理列表 ✓ */
        async queryHandle() {
            this.leftloading = true;
            const url = "uavs/queryHandle";
            try {
                const startTime = Date.now() - 30 * 24 * 60 * 60 * 1000;
                const endTime = Date.now();
                const formdata = {
                    startTime,
                    endTime,
                };
                // const startTimes = this.convertToFormattedDate(startTime);
                const payload = { formdata, url, that: this };
                const response = await this.$store.dispatch("uavs/queryHandle", payload);
                const { code, message, data } = response;
                if (code === 1) {
                    // this.showMessage(message, "success");
                    // this.handleList= data || []

                } else {
                    this.showMessage(message, "warning");
                }
                return data; // 返回数据
            } catch (error) {
                return null; // 返回数据
                this.showMessage(error, "error");
            } finally {
                this.leftloading = false;
            }
        },

        /**作业地块 */
        async queryBlockList(id) {
            this.centerloading = true;
            let url = "uavs/queryBlockList";
            try {
                let formdata = new FormData();
                formdata.append('handleId', id)
                console.log('handleId', formdata);
                const response = await this.$store.dispatch("uavs/queryBlockList", formdata);
                const { code, message, data } = response;
                if (code === 1) {
                    // this.showMessage(message, "success");
                    this.blockList = data || [];
                } else {
                    this.showMessage(message, "warning");
                }
                return Promise.resolve(response);
            } catch (error) {
                this.showMessage(error, "error");
                return Promise.reject(error);
            } finally {
                this.centerloading = false;
            }
        },
        /**补播路径信息 */
        async queryPointList(id) {
            this.rightloading = true;
            try {
                const formdata = new FormData(); // 查询架次图片
                formdata.append("handleId", id);
                const response = await this.$store.dispatch("uavs/queryPointList", formdata);
                const { code, message, data } = response;
                if (code === 1) {
                    this.pointlist = data || [];
                    // this.showMessage(message, "success");
                } else {
                    this.showMessage(message, "warning");
                }
                return Promise.resolve(response);
            } catch (error) {
                this.showMessage(error, "error");
                return Promise.reject(error);
            } finally {
                this.rightloading = false;
            }
        },
        //#endregion

        //#region ------------------------------------------------------------以前左至右---------------------------------------------------
        /**切换架次 */
        async switchingFlightSorties(item) {
            if (item.id != latestSortyInfo.id) {
                this.islatestSortyInfo = false;
                //查询 架次下的图片与点
                var data = await this.queryPhotoInfo(item.id, item.uavId);
                await this.queryHoleInfo(item.id, item.uavId);
                // 清除航线
                this.$refs.CesiumMap.clearLines();
                // clearLines
                // 播种信息
                // for (let i = 0; i < this.holelist.length; i++) {
                //     // if(data.length>1){
                //     //     this.queryHoleSeedingInfo(data.id)
                //     // }
                // }
            } else {
                this.islatestSortyInfo = true;
                //查询 架次下的图片与点
                this.queryPhotoInfo(item.id, item.uavId);
                this.queryHoleInfo(item.id, item.uavId);
            }
        },
        /**一段时间戳 */
        calculateTimeRange(days) {
            const startTime = Date.now() - days * 24 * 60 * 60 * 1000;
            const endTime = Date.now();
            return { startTime, endTime };
        },
        /**查询飞行架次 根据无人机id查询 一个月的飞行记录*/
        async queryFlightNumber(UavSn = this.defaultUavSn) {
            this.leftloading = true;
            try {
                const { startTime, endTime } = this.calculateTimeRange(30); // 计算时间范围
                // 时间戳大1000倍
                let formdata = new FormData();
                formdata.append("uavId", UavSn);
                formdata.append("startTime", startTime);
                formdata.append("endTime", endTime);
                const response = await this.$store.dispatch(
                    "uavs/queryFlightNumber",
                    formdata
                );
                const { code, message, data } = response;
                if (code === 1) {
                    return data; // 返回数据
                } else {
                    this.showMessage(message, "warning");
                }
            } catch (error) {
                this.showMessage(error, "error");
            } finally {
                this.leftloading = false;
            }
        },
        /**查询图片 */
        async queryPhotoInfo(id, uavSn = this.defaultUavSn) {
            this.centerloading = true;
            try {
                let formdata = new FormData();
                formdata.append("uavId", uavSn);
                formdata.append("eachsortieId", id);
                const response = await this.$store.dispatch(
                    "uavs/queryPhotoInfo",
                    formdata
                );
                const { code, message, data } = response;
                if (code === 1) {
                    this.photolist = data;
                    return data; // 返回数据
                } else {
                    this.showMessage(message, "warning");
                }
            } catch (error) {
                this.showMessage(error, "error");
            } finally {
                this.centerloading = false;
            }
        },
        /**查询洞信息 */
        async queryHoleInfo(id, uavSn = this.defaultUavSn) {
            this.rightloading = true;
            try {
                const formdata = new FormData(); // 查询架次图片
                formdata.append("uavId", uavSn);
                formdata.append("eachsortieId", id);
                formdata.append("photoId", null);

                const response = await this.$store.dispatch("uavs/queryHoleInfo", formdata);
                const { code, message, data } = response;

                if (code === 1) {
                    this.holelist = data;
                } else {
                    this.showMessage(message, "warning");
                }
            } catch (error) {
                this.showMessage(error, "error");
            } finally {
                this.rightloading = false;
            }
        },
        //#region 早期查询空斑播种记录信息（切换除去第一条数据）
        /**架次查询空板播种信息 */
        async queryHoleSeedingInfoByeachsortieId(id) {
            try {
                const formdata = new FormData(); // 查询架次图片
                formdata.append("eachsortieId", id);
                const response = await this.$store.dispatch("uavs/queryHoleSeedingInfoByeachsortieId", formdata);
                const { code, message, data } = response;
                if (code === 1) {

                } else {
                    this.showMessage(message, "warning");
                }
            } catch (error) {
                this.showMessage(error, "error");
            }
        },
        /**洞斑id查询播种信息 */
        async queryHoleSeedingInfo(id) {
            try {
                let formdata = new FormData(); // 查询架次图片
                formdata.append("uavId", this.defaultUavSn);
                formdata.append("eachsortieId", id);
                formdata.append("photoId", null);
                const response = await this.$store.dispatch("uavs/queryHoleSeedingInfo", formdata);
                if (code === 1) {
                    return data;
                } else {
                    this.showMessage(message, "warning");
                }
            } catch (error) { }
        },
        //#endregion 

        //#endregion

        //#endregion

        /**页面新增按钮--上传 */
        sendUpload() {
        },
        //#region ---------------------------------------------------------------上传补播路径任务弹窗---------------------------------------------------------------------------
        /**打开弹窗 */
        openTaskDialog() {
            // let missionTaskDialog = this.$refs.missionTaskDialog
            // if (missionTaskDialog) missionTaskDialog.outerVisible = true; 
            this.uploadRouteTask()
        },
        createPolygon() {

        },


        async submit() {
            let url = 'uavs/finalHandle';
            try {
                const handleUuid = "ssss"
                const params = { uavId: this.defaultUavSn, handleUuid }
                const payload = { that: this, url, params, data: { op: "ss" } }
                const response = await this.$store.dispatch('uavs/finalHandle', payload);
                const { code, data, message } = response;
                if (code == 1) {


                } else {
                    this.showMessage("error", 'warning')
                }
            } catch (error) {
                this.showMessage(error, 'error')
            }

        },
        /**上传至无人机  */
        async uploadRouteTask() {
            let url = 'uvas/uploadRouteTask';
            try {
                this.loadingText = '正在上传中'
                this.fullloading = true;
                const uavId = this.defaultUavSn;

                const params = { uavId: this.defaultUavSn }

                const payload = { params, that: this, url, data: this.choosePointList }
                const response = await this.$store.dispatch('uavs/uploadRouteTask', payload);
                const { data, message, code } = response;
                if (code === 1) {
                    this.showMessage(message, "success");
                    this.saveRouteData()
                } else {
                    this.showMessage(message, "warning");
                }
            } catch (error) {
                this.showMessage(error, "error");
            } finally {
                this.loadingText = '拼命加载中'
                this.fullloading = false;
            }
        },
        /**从无人机下载航线文件--发送解析-saveRouteData*/
        async downloadRouteTask() {
            try {
                this.loadingText = '请求下载中'
                this.fullloading = true;
                const formdata = new FormData();
                formdata.append('uavId', this.defaultUavSn);
                const response = await this.$store.dispatch('uavs/downloadRouteTask', formdata);
                const { data, message, code } = response;
                if (code === 1) {
                    // 后端解析航线数据获取对应的经纬度高即可 
                    this.respondRouteInfo(data)

                    this.showMessage("下载成功，请点击保存", "success");

                } else {
                    this.showMessage(message, "warning");
                }
            } catch (error) {
                this.showMessage(error, "error");
            } finally {
                this.fullloading = false;
                this.loadingText = '拼命加载中'
            }
        },



        /**上传航线值无人机---没有用 */
        async uploadMission(route) {
            try {
                const parms = {
                    uavId: this.defaultUavSn,
                    altType: 0,
                    takeoffAlt: route.unifiedHeight, //unifiedHeight
                    homeAlt: 30, // 如果不需要传递homeAlt，可以设置为null
                };
                const data = {
                    mission: route.positions,
                    formdata: parms,
                };
                await this.$store
                    .dispatch("uavs/uploadMission", data)
                    .then((response) => {
                        const { code, message, data } = response;
                        if (code === 1) {
                            this.showMessage(message, "success");
                        } else {
                            this.showMessage(message, "warning");
                        }
                    })
                    .catch((error) => {
                        this.showMessage(error, "error");
                    });
            } catch (error) {

            }
        },



        //#endregion

        //#region -----------------------------------------------------------------处理弹窗----------------------------------------------------------------------
        /**页面点击处理按钮--打开处理弹窗 */
        clickHandle() {
            //打开弹窗
            const handleDialogEle = document.getElementById('handleDialog')
            handleDialogEle.style.display = 'block'
        },
        /**关闭弹窗 */
        closeHandleDialog(event) {
            let that = this;
            if (event.target.id === 'handleDialog') {
                console.log('关闭弹窗');
            }
            var close = document.getElementById('close-button');
            var div = document.getElementById('handleDialog');
            close.onclick = function close() {
                div.style.display = "none";
            }
            window.onclick = function close(e) {
                if (e.target == div) {
                    div.style.display = "none";
                }
            }
        },
        /**取消确认-关闭弹窗 */
        canlceHandle() {
            this.handleInfo = {};
            const div = document.getElementById('handleDialog');
            div.style.display = 'none';
        },
        /**弹窗确定提交 */
        async handleSubmit() {
            let url = 'uavs/confirmHandle';
            try {

                var center = [116.439049, 39.89823];
                var radius = 1;
                var options = { steps: 4, units: 'kilometers', properties: { foo: 'bar' } };
                var circle = turf.circle(center, radius, options);
                console.log('circle', circle);
                const handleDate = (new Date()).getTime(); // 439c-1711335601702-53646
                const handleUuid = this.generateId(handleDate);
                const formdata = {
                    latitude: Number(this.handleInfo.latitude),
                    longitude: Number(this.handleInfo.longitude),
                    height: Number(this.handleInfo.height),
                    uavheight: Number(this.handleInfo.uavheight),
                    uavId: this.defaultUavSn,
                    handleDate,
                    handleUuid,
                };
                const payload = { formdata, url, that: this };
                const response = await this.$store.dispatch('uavs/confirmHandle', payload);
                const { code, message, data } = response;
                if (code === 1) {
                    this.showMessage(message, "success");
                    // this.handleList.unshift(data);
                    // 在数组头部插入新数据

                    this.$store.dispatch("ws/setProcessList", { handleUuid, date: handleDate })
                } else {
                    this.showMessage(message, "warning");
                }

            } catch (error) {
                this.showMessage(error, "error");
            } finally {
                this.canlceHandle()
            }

        },
        /** */
        plus() {
            this.isshow = !this.isshow
        },
        /**处理旁上传 */
        uploadProcess() {
            let processDialog = this.$refs.processDialog
            if (processDialog) {
                processDialog.dialogTableVisible = true
            }
        },

        generateId(HandleDate) {
            return (Math.random() * 10000000).toString(16).substr(0, 4) + '-' + HandleDate + '-' + Math.random().toString().substr(2, 5);
        },


        //#endregion

        //#region ----------------------------------------------------------------------切换----------------------------------------------------------------------------------
        /**选择补播路径点*/
        pointchangeChecked(object, event) {
            if (object.checked) {
                // true 原点播路径点
                this.choosePointList.push({ ...object });
                // this.selectedObjects.set(object.id, object);
            } else {
                this.choosePointList.splice(this.choosePointList.indexOf({ ...object }), 1); // pointlist
                this.pointlist.forEach((item) => {
                    if (object.id == item.id) {
                        this.$set(item, "checked", false);
                    }
                });


                // this.selectedObjects.delete(object.id); 
            }
        },
        /**空洞选择 */
        holechangeChecked(val, event) {

            const photo1List = this.holelist.filter(
                (item) => item.photoId === val.photoId
            );
            const findIndex = this.holelist.findIndex(
                (checkedItem) => val.id == checkedItem.id
            );

            if (findIndex >= 0) {
                this.$set(this.holelist[findIndex], "checked", event);
            }
            const isAllChecked = photo1List.every((item) => item.checked);

            if (isAllChecked) {
                this.photolist.forEach((item) => {
                    if (val.photoId == item.id) {
                        this.$set(item, "checked", event);
                    }
                });
            } else {
                this.photolist.forEach((item) => {
                    if (val.photoId == item.id) {
                        this.$set(item, "checked", false);
                    }
                });
            }
            if (event) {
                this.checkedPoint.push(this.holelist[findIndex]);
            } else {
                const removeIndex = this.checkedPoint.findIndex(
                    (item) => item.id === val.id
                );
                if (removeIndex >= 0) {
                    this.checkedPoint.splice(removeIndex, 1);
                }
            }
        },
        changeScrolling(id) {
            let classid = ".photoId-" + id;
            let tablecardElement = document.querySelectorAll('.table-card')
            console.log(tablecardElement);
            const offsetHeight = tablecardElement[0].offsetTop
            console.log(offsetHeight);
            let element = document.querySelectorAll(classid);
            element[0].scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        },
        /**移除洞斑 */
        removethispoint(item) {
            console.log(item);
        },
        //#endregion

        //#region ----------------------------------------------------------------------拖拽api----------------------------------------------------------------------
        // 监听拖拽
        change(event) {
            console.log("change");
            console.log(event);
            console.log(this.checkedPoint);
        },
        // 开始拖拽
        start(event) {
            console.log("start");
            console.log(event);
            console.log(this.checkedPoint);
        },
        // 结束拖拽
        end(event) {
            console.log("end");
            // event.item  拖拽的本身
            // event.to      拖拽的目标列表
            // event.from    拖拽之前的列表
            // event.oldIndex    拖拽前的位置
            // event.newIndex    拖拽后的位置
            console.log(event);
            console.log(this.checkedPoint);
        },
        //#endregion

        //#region  ----------------------------------------------------------------------其他---------------------------------------------------------------------
        /**转时间 */
        convertToFormattedDate(timestamp) {
            const date = new Date(timestamp);
            const year = date.getFullYear();
            const month = date.getMonth() + 1; // Months are zero-based, so add 1
            const dateOfMonth = date.getDate();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const seconds = date.getSeconds();

            return `${year}-${month}-${dateOfMonth} ${hours}:${minutes}:${seconds}`;
        },
        showToast(msg) {
            this.$layer.msg(msg);
        },
        showMessage(msg, type) {
            this.$message({
                message: msg,
                type: type,
            });
        },
        add0(m) {
            return m < 10 ? "0" + m : m;
        },
        // 时间
        time(shijianchuo) {
            //shijianchuo是整数，否则要parseInt转换
            var time = new Date(shijianchuo);
            var y = time.getFullYear();
            var m = time.getMonth() + 1;
            var d = time.getDate();
            var h = time.getHours();
            var mm = time.getMinutes();
            var s = time.getSeconds();
            return (
                y +
                "年" +
                this.add0(m) +
                "月" +
                this.add0(d) +
                " " +
                this.add0(h) +
                ":" +
                this.add0(mm) +
                ":" +
                this.add0(s)
            );
        },
        shuntime(time) {
            return this.$dateUtil.convertSecondToTime(time);
        },
        filtersType(val) {
            return filtersType(val);
        },
        parseTime(date) {

            return parseTime(date);
        },
        //#endregion


        //#region  windows测试
        //打开新窗口 this.windows={}
        openpage(item) {
            console.log(this.$router.options.routes)
            // window.open("/#/newpage", "_blank"); // 设定窗口名称
            const windowName = "newWindow-" + item.id;
            const existingWindow = window.open("", windowName);
            existingWindow.location.href = "#/newpage?ip=" + item.id;
            existingWindow.focus();
            // 将窗口对象引用存储到对象中
            this.windows[windowName] = existingWindow;
        },
        // 这个方法为发送信息
        psendC(item) {
            // 假设 existingWindow 是在 openpage 方法中存储的新窗口对象引用
            const windowName = "newWindow-" + item.id;
            // const existingWindow = window.open("", windowName);
            const existingWindow = this.windows[windowName];
            if (existingWindow) {
                if (existingWindow.closed) {
                    // 移除掉  this.windows[windowName]
                    console.log("移除掉  this.windows[windowName]");
                    delete this.windows[windowName];
                    return;
                }
                const messageObject = {
                    name: "John",
                    age: 25,
                };
                const messageString = JSON.stringify(messageObject);
                const message = "Hello from psendC method!" + windowName;
                console.log(message);
                existingWindow.postMessage(messageObject, window.location.origin);
            } else {
                // 窗口可能被浏览器拦截或未成功打开
                console.error(
                    "Failed to send message: window was not opened or was blocked by the browser"
                );
            }
        },
        otherpage() {
            const windowName = "newWindow"
            const existingWindow = window.open("", windowName)
            existingWindow.location.href = "#/so"
            existingWindow.focus();
        },
        getMsg(e) {
            let event = e
            console.log(event);

        },
        startwebWorker() {
            // var webWorker = new Worker()
            //  // 监听 Web Worker 发送的消息
            // webWorker.onmessage = (event) => {
            //     console.log(event);
            //     //   this.result = event.data;

            //     // 关闭 Web Worker 线程
            //     webWorker.terminate();
            //     webWorker = null;
            // };
            // // 向 Web Worker 发送消息
            // webWorker.postMessage('some data');
        },
        //#endregion

        //#region -------------------------------------------------------------- 查询无人机--点击切换下拉菜单-----------------------------------------------------
        /**查询所有无人机 */
        async queryAllUavs() {
            try {
                await this.$store.dispatch("uavs/getUavs").then(response => {
                    const {
                        code,
                        message,
                        data
                    } = response;
                    if (code === 1) {
                        this.uavs = data
                        if (!data || data.length <= 0) {
                            return false;
                        }
                        // 检查LocalStorage中的"defaultUav"值
                        let key = "defaultUav-" + this.userId;
                        var checkUav = localStorage.getItem(key);
                        if (!checkUav) {
                            localStorage.setItem(key, data[0].uavId)
                        } else {
                            let localStorageUav = localStorage.getItem(key) //获取浏览器存储的是否还在数据库表内
                            if (!data.some(item => (item.uavId === localStorageUav))) {
                                localStorage.setItem(key, data[0].uavId)
                            }
                        }
                        const info = localStorage.getItem(key)
                        this.defaultUavSn = localStorage.getItem(key)
                    }
                }).catch((error) => {
                    this.showMessage(error, "error");
                });
            } catch (error) {

            }
        },
        selectUav() {
            if (this.uavs.length > 0) {
                const isVisable = this.$refs.selectRef.visible
                this.$nextTick(() => {
                    // console.log(this.$refs.selectRef);

                    this.$refs.selectRef.visible = !isVisable;
                    // this.$refs.selectRef.toggleMenu();
                })
            }
        },
        /** 切换无人机-- 架次信息查询,洞斑，图片 */
        selectTrigger(val) {
            let key = "defaultUav-" + this.userId;
            localStorage.setItem(key, val)
            this.queryInfo(val)
        }
        //#endregion

    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        let key = "defaultUav-" + this.userId;
        this.defaultUavSn = localStorage.getItem(key)
        // this.queryInfo();
        this.queryNewInfo()
        this.queryAllUavs();

        //         if(this.cities.length > 0 ) {
        //     this.$nextTick(() => {
        //         // console.log(this.$refs.selectRef);
        //         // this.$refs.selectRef.visible = true;
        //         this.$refs.selectRef.toggleMenu();
        //      })
        //   }

        // window.addEventListener('message',(event)=> this.getMsg(event))

        // if (!("IntersectionObserver" in window)) {
        //     console.log("当前浏览器不支持视口交互");
        // }
        // // 监听滚动
        // var pointitems = document.querySelectorAll(".table-card .point-card");
        // var photoitems = document.querySelectorAll(".table-card .photo-card");

        // let box = document.querySelector("#box");
        // console.log(box);
        // console.log(photoitems[0]);
        // photoitems.forEach((item) => {
        //     item.addEventListener("scroll", function (e) {
        //         console.log('sss');
        //         let scrollTop = e.target.scrollTop;
        //         let clientHeight = e.target.clientHeight;
        //         let scrollHeight = e.target.scrollHeight;
        //         console.log(scrollTop);

        //     });
        // });
        //lll
        // const parentElement = document.querySelector(".parent-element");
        // const childElements = document.querySelectorAll(".child-element");
        // console.log("childElements");
        // console.log(childElements);
        // let scrolledToTopElement = null;
        // function debounce(fu, delay) {
        //     let timeoutId;
        //     return (...arg) => {
        //         clearTimeout(timeoutId);
        //         timeoutId = setTimeout(() => fu(...arg), delay);
        //     };
        // }
        // const scrollHandler = debounce((e) => {
        //     const parentTop = parentElement.scrollTop;
        //     let scrollTop = e.target.scrollTop;
        //     let clientHeight = e.target.clientHeight;
        //     let scrollHeight = e.target.scrollHeight;
        //     console.table([
        //         {
        //             label: "距顶部",
        //             value: scrollTop,
        //         },
        //         {
        //             label: "可视区高度",
        //             value: clientHeight,
        //         },
        //         {
        //             label: "滚动条总高度",
        //             value: scrollHeight,
        //         },
        //         {
        //             label: "距顶部 + 可视区高度",
        //             value: scrollTop + clientHeight,
        //         },
        //     ]);

        //     const parentHeight = parentElement.offsetHeight;
        //     console.log(parentHeight);
        //     scrolledToTopElement = null; // 重置 scrolledToTopElement

        //     const childTop = childElements[0].offsetTop;
        //     const childHeight = childElements[0].offsetHeight;
        //     const childclientHeight = childElements[0].clientHeight;
        //     console.log(childTop, childHeight, childclientHeight);
        //     for (let i = 0; i < childElements.length; i++) {
        //         const childElement = childElements[i];
        //         const childTop = childElement.offsetTop;
        //         const childHeight = childElement.offsetHeight;
        //         if (
        //             childTop >= parentTop &&
        //             childTop + childHeight <= parentTop + parentHeight
        //         ) {
        //             scrolledToTopElement = childElement; // 将滚动到顶部的子元素赋值给 scrolledToTopElement
        //             console.log(scrolledToTopElement);
        //             console.log(`子元素 ${i + 1} 滚动到了父元素的顶部`);

        //             break; // 找到第一个符合条件的子元素后，调用 break 退出循环
        //         }
        //     }
        // }, 100);

        // parentElement.addEventListener("scroll", scrollHandler);
        // 111

        // const titles = document.querySelectorAll('.table-card');
        // function debounce(fu, delay) {
        //     let timeoutId;
        //     return (...arg) => {
        //         clearTimeout(timeoutId);
        //         timeoutId = setTimeout(() => fu(...arg), delay);
        //     };
        // }
        // const scrollHandler = debounce(() => {
        //     const rects= titles.map((title)=>title.getBoundingClientRect)
        //     const toprange=200
        //     for(let i=0; i<titles.length;i++){
        //         const title = titles[i]
        //         const rect = rects[i]
        //         if(rect.top>=0 && rect.top<=200){
        //             console.log('gd');

        //             break
        //         }else if(rect.top<=0 && rects[i+1]  && rects[i+1].top>document.documentElement.clientHeight){
        //             console.log('gd');
        //             break
        //         }
        //     }
        //     // console.log("ddddd");
        //     // titles.push()
        // }, 100);
        // window.addEventListener("scroll", scrollHandler);

        // var io = new IntersectionObserver(
        //     (entries) => {
        //         entries.forEach((i) => {
        //             // if(i.intersectionRatio >= 0.25) { //可见元素占视窗的25%触发
        //             // 	i.target.setAttribute("src", this.src)
        //             // }
        //             console.log(entries);
        //             // console.log(i);
        //         });
        //     },
        //     {
        //         threshold: [1],
        //     }
        // );
        // photoitems.forEach((item) => {
        //     io.observe(item);
        // });
    },
    beforeCreate() { }, //生命周期 - 创建之前
    beforeMount() { }, //生命周期 - 挂载之前
    beforeUpdate() { }, //生命周期 - 更新之前
    updated() { }, //生命周期 - 更新之后
    beforeDestroy() {
        //移除
        //    window.removeEventListener("message", (e) => this.getMsg(e));
    }, //生命周期 - 销毁之前
    destroyed() { }, //生命周期 - 销毁完成
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
<style lang="scss" src="./planningManager.scss" scoped>
