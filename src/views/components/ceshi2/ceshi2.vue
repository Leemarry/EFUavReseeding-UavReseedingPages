<!--
 * @Descripttion: 
 * @version: 
 * @Author: Eugene
 * @Date: 2024-03-27 11:03:11
 * @LastEditors: Andy
 * @LastEditTime: 2024-03-29 15:53:11
-->
<!--  -->
<template>
    <div class='flex' v-loading="fullloading" :element-loading-text="loadingText" element-loading-background="rgba(0, 0, 0, 0.8)">
        <aside style="width:450px">
            <!-- <div>
                <span>违建风险点</span>
            </div> -->

            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span @click="getCoordinates()">违建风险点/共计：{{  tableData.length}}</span>
                    <!-- <el-button style="float: right; padding: 3px 0" type="text">展示</el-button> -->
                    <el-tooltip class="item" effect="dark" content="地图标注" placement="right">
                        <el-button style="float: right; padding: 3px 0" type="text" @click="showBillboard()">展示</el-button>
                    </el-tooltip>
                </div>
                <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column prop="date" label="日期" sortable width="130" column-key="date" :filters="[{text: '2023-12-01', value: '2023-12-01'}, {text: '2024-01-02', value: '2024-01-02'}, {text: '2024-02-02', value: '2024-02-02'}, {text: '2024-03-02', value: '2024-03-02'}]" :filter-method="filterHandler">
                    </el-table-column>
                    <el-table-column prop="coordinate" label="坐标" width="120">

                    </el-table-column>
                    <el-table-column prop="address" label="地址" show-overflow-tooltip>
                    </el-table-column>
                </el-table>

            </el-card>
            <!-- <el-button @click="resetDateFilter">清除日期过滤器</el-button>
            <el-button @click="clearFilter">清除所有过滤器</el-button> -->
            <div>
                <el-button type="primary" @click="changeEdit()">自动规划航线</el-button>
                <el-button type="primary" @click="uploadUav()">上传无人机</el-button>
            </div>
        </aside>
        <main class="main">
            <CesiumMap ref="CesiumMap" :visible="CesiumDrawVisible"></CesiumMap>
        </main>

        <!-- <el-dialog title="二次航飞" :visible.sync="dialogFormVisible" width="35%">
            <el-select v-model="field131" placeholder="请选择无人机选择" clearable :style="{width: '100%'}">
                <el-option v-for="(item, index) in field131Options" :key="index" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
            <el-form :model="form">
                <el-form-item label="活动名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动区域" :label-width="formLabelWidth">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog> -->

        <el-dialog :visible.sync="dialogFormVisible" width="35%" v-bind="$attrs" v-on="$listeners" @open="onOpen" @close="onClose" title="二次航飞设置">
            <el-row :gutter="15">
                <el-form ref="missionTask" :model="missionTask" :rules="rules" size="mini" label-width="100px">
                    <el-col :span="9">
                        <el-form-item label="无人机选择" prop="field131">
                            <el-select v-model="missionTask.field131" placeholder="请选择无人机选择" clearable :style="{width: '100%'}">
                                <el-option v-for="(item, index) in field131Options" :key="index" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="15">
                        <el-form-item label="任务日期" prop="field132">
                            <el-date-picker v-model="missionTask.field132" format="yyyy-MM-dd" value-format="yyyy-MM-dd" :style="{width: '100%'}" placeholder="请选择任务日期" clearable></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="拍摄" prop="field136" required>
                            <el-switch v-model="missionTask.field136" active-text="航景拍摄" inactive-text="自动航拍"></el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="飞行区域" prop="field134">
                            <el-select v-model="missionTask.field134" placeholder="请选择飞行区域" clearable :style="{width: '100%'}">
                                <el-option v-for="(item, index) in field134Options" :key="index" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="14">
                        <el-form-item label="设置起飞点" prop="field135">
                            <el-input v-model="missionTask.field135" placeholder="请输入设置起飞点" clearable :style="{width: '100%'}">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="起飞速度" prop="field137">
                            <el-input-number v-model="missionTask.field137" placeholder="请输入起飞速度" :step='1'></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="最大速度" prop="field140">
                            <el-input-number v-model="missionTask.field140" placeholder="请输入最大速度" :step='1'></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="动作指令" prop="field149">
                            <el-checkbox-group v-model="missionTask.field149" size="medium">
                                <el-checkbox v-for="(item, index) in field149Options" :key="index" :label="item.value" :disabled="item.disabled">{{item.label}}</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-row>
            <div slot="footer">
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="handelConfirm">确定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import CesiumMap from '@/views/components/Cesium/CesiumMap.vue'
export default {
    name: '',
    //import引入的组件需要注入到对象中才能使用
    components: {
        CesiumMap,
    },
    data() {
        //这里存放数据
        return {

            missionTask: {
                field131: undefined,
                field132: null,
                field136: true,
                field134: "",
                field135: "[114.42592184,29.64466656]",
                field137: 5,
                field140: 50,
                field149: [],
                field141: undefined,
                field147: undefined,
            },
            rules: {
                field131: [{
                    required: true,
                    message: '请选择无人机选择',
                    trigger: 'change'
                }],
                field132: [{
                    required: true,
                    message: '请选择任务日期',
                    trigger: 'change'
                }],
                field134: [{
                    required: true,
                    message: '请选择飞行区域',
                    trigger: 'change'
                }],
                field135: [{
                    required: true,
                    message: '请输入设置起飞点',
                    trigger: 'blur'
                }],
                field137: [{
                    required: true,
                    message: '请输入起飞速度',
                    trigger: 'blur'
                }],
                field140: [{
                    required: true,
                    message: '请输入最大速度',
                    trigger: 'blur'
                }],
                field149: [{
                    required: true,
                    type: 'array',
                    message: '请至少选择一个动作指令',
                    trigger: 'change'
                }],
            },
            field131Options: [{
                "label": "无人机1号",
                "value": 1
            }, {
                "label": "无人机2号",
                "value": 2
            }],
            field134Options: [{
                "label": "区域一",
                "value": 1
            }, {
                "label": "区域二",
                "value": 2
            }],
            field149Options: [{
                "label": "悬停",
                "value": 1
            }, {
                "label": "拍照",
                "value": 2
            }, {
                "label": "录像",
                "value": ""
            }, {
                "label": "转向",
                "value": ""
            }],

            formLabelWidth: '120px',
            field131: 1,
            field131Options: [{
                "label": "H--M300-1号",
                "value": 1
            }, {
                "label": "H--M300-2号",
                "value": 2
            }],
            fullloading: false,
            loadingText: '正在自动航线中',
            CesiumDrawVisible: false,
            form: {
                name: '任务一'
            },
            Visible: false,
            dialogFormVisible: false,
            value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],


            tableData: [ {
                date: '2024-03-02',
                city: '通山县',
                address: '湖北省咸宁市通山县通羊镇',
                coordinate: '[114.468272,29.623365]',
                location:[114.468272,29.623365],
                other:'001_0001',
                img:'http://127.0.0.1:9090/ceshi/weijian/DJI_20240321172839_0001_W.JPG',
            }, {
                date: '2024-03-03',
                city: '通山县',
                address: '湖北省咸宁市通山县',
                coordinate: '[114.465146,29.622731]',
                location:[114.465146,29.622731],
                other:'001_0002',
                img:'http://127.0.0.1:9090/ceshi/weijian/DJI_20240321173142_0002_W.JPG',
            },
            {
                date: '2023-05-04',
                city: '通山县',
                address: '湖北省咸宁市通山县',
                coordinate: '[114.470944,29.623320]',
                location:[114.470944,29.623320],
                other:'001_0002',
                img:'http://127.0.0.1:9090/ceshi/weijian/DJI_20240321173422_0003_W.JPG'
            }, {
                date: '2024-02-03',
                city: '通山县',
                address: '湖北省咸宁市通山县',
                coordinate: '[114.481923,29.619511]',
                location:[114.481923,29.619511],
                other:'002_0001',
                img:'http://127.0.0.1:9090/ceshi/weijian/DJI_20240321175148_0001_W.JPG'
            }, 
            ],


            multipleSelection: [],
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
        showToast(msg) {
            this.$layer.msg(msg)
        },
        showMessage(msg, type) {
            this.$message({
                message: msg,
                type: type
            })
        },
        changeEdit() {
            // const route = [
            //     [
            //     114.45006173,29.62837653,0
            //     ],
            //     [
            //     114.481921,29.619512,0
            //     ],
            //     [
            //         114.468306, 29.623247,0
            //     ]

            // ];


            
            const route = this.multipleSelection.map(item => [item.location[0], item.location[1], item.img]);
            this.drawLines(route)
            this.fullloading = true;

            setTimeout(() => {
                this.fullloading = false;
            }, 1500);

        },

        showBillboard() {

            // const route = [
            //     [
            //     114.511587,29.602812,"http://127.0.0.1:9090/ceshi/weijian/DJI_20240321175148_0001_W.JPG"
            //     ],
            //     [
            //     114.481921,29.619512,"http://127.0.0.1:9090/ceshi/weijian/DJI_20240321175148_0001_W.JPG"
            //     ],
            //     [
            //         114.468306, 29.623247,"http://127.0.0.1:9090/ceshi/weijian/DJI_20240321175148_0001_W.JPG"
            //     ],
            //     [
            //         114.468267, 29.623569,"http://127.0.0.1:9090/ceshi/weijian/DJI_20240321175148_0001_W.JPG"
            //     ],
            //     [
            //         114.46953705189483, 29.62433004018314,"http://127.0.0.1:9090/ceshi/weijian/DJI_20240321175148_0001_W.JPG"
            //     ],

            // ];
            const route = this.multipleSelection.map(item => [item.location[0], item.location[1], item.img]);
            this.$refs.CesiumMap.showBillboard(route);

        },

        getCoordinates() {
            console.log("注册地图点击事件");
            this.$refs.CesiumMap.getCoordinates();
        },

        drawLines(positions) {
            this.$refs.CesiumMap.drawLines(positions);
        },

        uploadUav() {
            this.dialogFormVisible = true;
        },



        /** */
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        filterHandler(value, row, column) {
            const property = column['property'];
            return row[property] === value;
        },
        onOpen() { },
        onClose() {
            this.$refs['missionTask'].resetFields()
     
        },
        close() {
            this.dialogFormVisible = false;
            this.$emit('update:visible', false)
            setTimeout(() => {
                this.showMessage("无人机执行", "success")
            }, 3000);
        },
        handelConfirm() {
            this.$refs['missionTask'].validate(valid => {
                if (!valid) return
                this.close()
            })
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {

    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {

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
.flex {
    display: flex;
    .main {
        flex: 1;
        height: 916px;
    }
}
</style>