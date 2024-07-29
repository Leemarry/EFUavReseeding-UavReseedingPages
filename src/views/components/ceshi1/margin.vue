
<template>
    <div class='flex'>
        <aside style="width:450px">
            <el-select v-model="field131" placeholder="请选择无人机选择" clearable :style="{width: '100%'}">
                <el-option v-for="(item, index) in field131Options" :key="index" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
            <el-table :data="tableData" ref="refTable" style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="scope">
                        <div style="margin:10px 0px;">
                            <label>执行时间：</label>
                            <el-date-picker v-model="value1" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                            </el-date-picker>
                        </div>
                        <div style="margin:10px 0px;">
                            <label>任务属性：</label>
                            <div class="bottom">
                                <el-row type="flex" align="middle">
                                    <el-col :span="12">航线任务版本：</el-col>
                                    <el-col :span="12" class="value">
                                        <el-select size="mini" v-model="wpsVersion" placeholder="请选择">
                                            <el-option v-for="item in djiMissionVersion" :key="item.value" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                </el-row>
                                <el-row type="flex" align="middle">
                                    <el-col :span="12">
                                        高度类型：
                                        <el-tooltip effect="light" content="相对于起飞点高度或海拔高度飞行" placement="top-start">
                                            <i class="el-icon-warning" />
                                        </el-tooltip>
                                    </el-col>
                                    <el-col :span="12" class="value">
                                        <el-select size="mini" v-model="wpsAltMode" placeholder="请选择">
                                            <el-option v-for="item in missionAltMode" :key="item.value" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                </el-row>
                                <el-row type="flex" align="middle">
                                    <el-col :span="12">云台控制：
                                        <el-tooltip effect="light" content="设置为[航点控制]后,航点中的云台俯仰生效." placement="top-start">
                                            <i class="el-icon-warning" />
                                        </el-tooltip>
                                    </el-col>
                                    <el-col :span="12" class="value">
                                        <el-radio-group v-model="wpsGimbalPitchRotationEnabled" size="mini">
                                            <el-radio-button :label="false">手动</el-radio-button>
                                            <el-radio-button :label="true">航点控制</el-radio-button>
                                        </el-radio-group>
                                    </el-col>
                                </el-row>
                                <el-row type="flex" align="middle">
                                    <el-col :span="12">飞行速度(m/s)：</el-col>
                                    <el-col :span="12" class="value">
                                        <el-input size="mini" v-model="wpsSpeed" placeholder="请输入"></el-input>
                                    </el-col>
                                </el-row>
                                <el-row type="flex" align="middle">
                                    <el-col :span="12">最大飞行速度(m/s)：</el-col>
                                    <el-col :span="12" class="value">
                                        <el-input size="mini" v-model="wpsSpeed" placeholder="请输入"></el-input>
                                    </el-col>
                                </el-row>
                            </div>

                        </div>
                        <div style="margin:10px 0px;">
                            <label for="">注意：绘制航线区域或打点绘制</label>

                        </div>
                        <el-button size="mini" type="success" @click="handleSave(scope.$index, scope.row)">保存</el-button>

                        <!-- <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="总空斑面积">
                                <span>{{ props.row.gapSquare }}</span>
                            </el-form-item>
                            <el-form-item label="补播区域数量">
                                <span>{{ props.row.reseedAreaNum }}</span>
                            </el-form-item>
                            <el-form-item label="补播区域面积">
                                <span>{{ props.row.reseedSquare }}</span>
                            </el-form-item>
                            <el-form-item label="补播草种数量">
                                <span>{{ props.row.seedNum }}</span>
                            </el-form-item>
                        </el-form> -->
                    </template>
                </el-table-column>
                <el-table-column prop="id" label="id" width="60">
                </el-table-column>
                <el-table-column prop="name" label="任务名" width="130">
                    <template slot-scope="props">
                        <div>
                            <span @click="changeEdit">{{props.row.name}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">执行</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </aside>
        <main class="main">
            <CesiumMap ref="CesiumMap"></CesiumMap>
        </main>

        <el-dialog title="任务信息设置" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="任务名" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="任务执行时间：" :label-width="formLabelWidth">
                    <el-date-picker v-model="value1" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitroute">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog  :visible.sync="Visible" width="25%">
            <template slot="title">
                <div>
                   <span title="用于设置任务完成时间、开启信息提醒">任务执行设置</span> 
                </div>
            </template>
            <div style="margin:15px 0px;">
                <label for=""> 任务执行耗时：</label>
                <el-form :model="form">
                    <el-input v-model="input" placeholder="请输入任务执行时间"></el-input>
                </el-form>
            </div>
            <div style="margin:15px 0px;">
                <label for=""> 任务执行提示：</label>
                <el-switch v-model="value1" active-text="到时提示" inactive-text="无须提醒">
                </el-switch>
            </div>

            <div slot="footer" class="dialog-footer">
                <el-button @click="Visible = false">取 消</el-button>
                <el-button type="primary" @click="sumittime">确 定</el-button>
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
            form: {
                name: '通山巡查任务一'
            },
            Visible: false,
            dialogFormVisible: false,
            value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
            field131: 1,
            field131Options: [{
                "label": "H--M300-1号",
                "value": 1
            }, {
                "label": "H--M300-1号",
                "value": 2
            }],
            tableData: [{
                id: '1',
                name: '通山巡查任务一'
            }, {
                id: '2',
                name: '通山巡查任务二'
            }],
            djiMissionVersion: [{ value: 0, label: 'V 1.0' }, { value: 1, label: 'V 2.0' }],
            wpsVersion: 0,
            missionAltMode: [{ value: false, label: '相对高度' }, { value: true, label: '海拔高度' }],
            wpsAltMode: false,
            wpsGimbalPitchRotationEnabled: true,
            wpsSpeed: 5,
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
        handleDelete(index, row) {
            this.Visible = true
            // this.showMessage('任务已执行', 'success')
        },
        sumittime() {
            this.Visible = false
            this.showMessage('任务已发送无人机', 'success')
        },
        handleEdit(index, row) {
            this.$refs.refTable.toggleRowExpansion(row)
            const route= [];
            this.drawLines(route)
        },
        /**展开保存 */
        handleSave(index, row) {
            this.dialogFormVisible = true
            this.$refs.refTable.toggleRowExpansion(row)
          
        },
        submitroute(){
            this.dialogFormVisible = false
            this.showMessage('任务编辑已保存', 'success')
        },
 

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
            const route = [
                [
                    114.42592184,
                    29.64466656
                ],
                [
                114.42854515,
                    29.64466656
                ],
                [
                114.44617794,29.64693401
                ]
            ];
            this.drawLines(route)
        },

        drawLines(positions) {
            this.$refs.CesiumMap.drawLines(positions);
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