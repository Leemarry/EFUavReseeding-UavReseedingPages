
<template>
    <div class='flex' v-loading="fullloading" :element-loading-text="loadingText" element-loading-background="rgba(0, 0, 0, 0.8)">
        <aside style="width:450px ">
            <el-tabs style="padding: 20px;" v-model="activeName">
                <el-tab-pane label="区域划分" name="1">
                    <div>
                        <el-button type="primary" size="small" @click="addRouteTask()">新增区域任务</el-button>
                        <!-- <el-button type="primary" size="small" @click="addRouteTask()">上传任务文件</el-button> -->
                        <el-button type="primary" size="small" @click="doPartition()">任务区域划分</el-button>
                        <el-button type="primary" size="small" @click="removeDataSources()">清除区域划分</el-button>
                    </div>
                    <hr>
                    <div style="margin:10px 0px;">
                        <label for=""> 区域规划任务列表</label>
                    </div>
                    <div>
                        <el-card style="margin:10px 0px;" class="box-card" v-for="(item,index) in taksList" :key="index">
                            <div slot="header" class="clearfix">
                                <span @click="addTab()">{{item.name }}</span>

                                <el-dropdown>
                                    <el-button type="text" icon="el-icon-arrow-down el-icon--right">操作按钮</el-button>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item @click="opendialog">重命名</el-dropdown-item>
                                        <el-dropdown-item>上传无人机</el-dropdown-item>
                                        <el-dropdown-item disabled>删除</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>

                            </div>
                            <div class="flexStyle">
                                <el-row :gutter="12">
                                    <el-col :span="12" style="margin:8px 0px;">
                                        <label for="">任务类型：</label>
                                        <span>{{item.type}}</span>
                                    </el-col>
                                    <el-col :span="12" style="margin:8px 0px;">
                                        <label for="">文件大小：</label>
                                        <span>{{item.size}}</span>
                                    </el-col>
                                    <el-col :span="12" style="margin:8px 0px;">
                                        <label for="">飞行时间：</label>
                                        <span>12m</span>
                                    </el-col>
                                    <el-col :span="12" style="margin:8px 0px;">
                                        <label for="">创建时间：</label>
                                        <span>{{item.createTime}}</span>
                                    </el-col>
                                    <el-col :span="12" style="margin:8px 0px;">
                                        <label for="">修改时间：</label>
                                        <span>{{ item.editTime}}</span>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-card>
                    </div>

                </el-tab-pane>
                <el-tab-pane label="航飞成果" name="2">
                    <div style="margin:10px 0px;">
                        <label for=""> 规划任务成果列表</label>
                    </div>
                    <div>
                        <el-card style="margin:10px 0px;" class="box-card" v-for="index in 4" :key="index">
                            <div slot="header" class="clearfix">
                                <span>通山县航飞巡查任务{{index }}</span>

                                <el-dropdown>
                                    <el-button type="text" icon="el-icon-arrow-down el-icon--right">操作按钮</el-button>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item>重新上传</el-dropdown-item>
                                        <el-dropdown-item @click="showbigmap">全景图</el-dropdown-item>
                                        <el-dropdown-item disabled>删除</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>

                            </div>
                            <div class="flexStyle">

                                <el-row :gutter="10">
                                    <el-col :span="12" style="margin:8px 0px;">

                                        <label for="">任务类型：</label>
                                        <span>{{`kmz`}}</span>
                                    </el-col>
                                    <el-col :span="12" style="margin:8px 0px;">
                                        <label for="">文件大小：</label>
                                        <span>{{`kmz`}}</span>
                                    </el-col>
                                    <el-col :span="12" style="margin:8px 0px;">
                                        <label for="">飞行时间：</label>
                                        <span>12m</span>
                                    </el-col>
                                    <el-col :span="12" style="margin:8px 0px;">
                                        <label for="">创建时间：</label>
                                        <span></span>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-card>
                    </div>
                </el-tab-pane>
                <!-- <el-tab-pane label="正射图集处理" name="third">角色管理</el-tab-pane> -->
                <el-tab-pane v-for="(item, index) in editableTabs" :key="item.name" :label="item.title" :name="item.name">
                    <div>
                        <el-button type="primary" size="small" @click="addToSum()">自动拼图</el-button>
                        <el-button type="primary" size="small" @click="doPartition()">区域划分</el-button>
                        <el-button type="primary" size="small" @click="removeDataSources()">清除区域划分</el-button>
                        <el-button type="primary" size="small" @click="clearLines()">清除所有航线</el-button>
                    </div>
                    <hr>
                    <div style="margin:10px 0px;">
                        <label for="">正射图集:2011张</label>
                        <el-progress :percentage="count" :format="format"></el-progress>
                    </div>
                    <div>
                        <img width="400px" height="200px" :src="`http://127.0.0.1:9090/ceshi/image/12%20(${index}).JPG`" alt="" v-for="(index) in 4 " :key="index">

                    </div>
                </el-tab-pane>
            </el-tabs>
        </aside>
        <main class="main">
            <CesiumMap ref="CesiumMap" :visible="visibleMap"></CesiumMap>
        </main>

        <el-dialog :visible.sync="dialogFormVisible" width="35%" v-bind="$attrs" v-on="$listeners" @open="onOpen" @close="onClose" title="航飞区域划分任务">
            <el-row :gutter="15">
                <el-form ref="missionTask" :model="missionTask" :rules="rules" size="mini" label-width="100px">
                    <el-col :span="12">
                        <el-form-item label="无人机选择" prop="field131">
                            <el-select v-model="missionTask.field131" placeholder="请选择无人机选择" clearable :style="{width: '100%'}">
                                <el-option v-for="(item, index) in field131Options" :key="index" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="任务名" prop="field152">
                            <el-input v-model="missionTask.field152" placeholder="请输入任务名" clearable :style="{width: '100%'}">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="任务日期" prop="field132">
                            <el-date-picker type="datetime" v-model="missionTask.field132" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" :style="{width: '100%'}" placeholder="请选择任务日期" clearable>
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="任务类型" prop="field150">
                            <el-select v-model="missionTask.field150" placeholder="请选择任务类型" clearable :style="{width: '100%'}">
                                <el-option v-for="(item, index) in field150Options" :key="index" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="文件大小" prop="field151">
                            <el-input v-model="missionTask.field151" placeholder="请输入文件大小" clearable :style="{width: '100%'}">
                            </el-input>
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
import CesiumMap from '@/views/components/Cesium/cecesium.vue'

export default {
    name: '',
    //import引入的组件需要注入到对象中才能使用
    components: {
        CesiumMap,
    },
    data() {
        //这里存放数据
        return {
            count: 0,
            loading: false,

            taksList: [{
                name: '通山县航飞巡查任务1',
                type: 'kmz',
                size: '554kb',
                flyTime: '',
                createTime: '2024-03-10 02:00:00',
                editTime: '2024-03-10 02:00:00',

            }, {
                name: '通山县航飞巡查任务2',
                type: 'kml',
                size: '454kb',
                flyTime: '',
                createTime: '2024-03-10 02:00:00', //2024-03-10 02:00:00
                editTime: '2024-03-10 02:00:00',
            }, {
                name: '通山县航飞巡查任务3',
                type: 'kmz',
                size: '54kb',
                flyTime: '',
                createTime: '2024-03-10 02:00:00',
                editTime: '2024-03-10 02:00:00',

            }],
            visibleMap: false,

            form: {
                name: '任务一'
            },
            Visible: false,
            dialogFormVisible: false,
            value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],


            tableData: [{
                date: '2024-02-03',
                city: '通山县',
                address: '湖北省咸宁市通山县',
                coordinate: '[114.42592184,29.64466656]'
            }, {
                date: '2024-03-02',
                city: '通山县',
                address: '湖北省咸宁市通山县',
                coordinate: '[114.42592184,29.64466656]'
            }, {
                date: '2024-03-03',
                city: '通山县',
                address: '湖北省咸宁市通山县',
                coordinate: '[114.42592184,29.64466656]'
            },
            {
                date: '2023-05-04',
                city: '通山县',
                address: '湖北省咸宁市通山县',
                coordinate: '[114.42592184,29.64466656]'
            }, {
                date: '2024-02-03',
                city: '通山县',
                address: '湖北省咸宁市通山县',
                coordinate: '[114.42592184,29.64466656]'
            }, {
                date: '2024-03-02',
                city: '通山县',
                address: '湖北省咸宁市通山县',
                coordinate: '[114.42592184,29.64466656]'
            }, {
                date: '2024-03-03',
                city: '通山县',
                address: '湖北省咸宁市通山县',
                coordinate: '[114.42592184,29.64466656]'
            },
            {
                date: '2023-05-04',
                city: '通山县',
                address: '湖北省咸宁市通山县',
                coordinate: '[114.42592184,29.64466656]'
            },
            ],

            missionTask: {
                field131: 1,
                field152: "区域任务",
                field132: "2024-03-08 00:00:00",
                field150: "kmz",
                field151: "20kb",
            },
            rules: {
                field131: [{
                    required: true,
                    message: '请选择无人机选择',
                    trigger: 'change'
                }],
                field152: [{
                    required: true,
                    message: '请输入任务名',
                    trigger: 'blur'
                }],
                field132: [{
                    required: true,
                    message: '请选择任务日期',
                    trigger: 'change'
                }],
                field150: [{
                    required: true,
                    message: '请选择任务类型',
                    trigger: 'change'
                }],
                field151: [{
                    required: true,
                    message: '请输入文件大小',
                    trigger: 'blur'
                }],
            },
            field131Options: [{
                "label": "无人机1号",
                "value": 1
            }, {
                "label": "无人机2号",
                "value": 2
            }],
            field150Options: [{
                "label": "kmz",
                "value": 1
            }, {
                "label": "kml",
                "value": 2
            }, {
                "label": "其他",
                "value": 3
            }],

            multipleSelection: [],
            taskTypes: ['kmz', 'kml'],

            fullloading: false,
            loadingText: '正在划分区域中',
            activeName: '1',
            editableTabs: [],
            tabIndex: 2
        };
    },
    //让组件接收外部传来的数据
    props: {
    },
    //监听属性 类似于data概念
    computed: {

    },
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
            console.log('展示');
            const route = [
                [
                    114.42592184, 29.64466656
                ],
                [
                    114.42854515, 29.6331465
                ],
                [
                    114.43981184, 29.63551184
                ],
                [
                    114.44957998, 29.61471879
                ],
                [
                    114.44450287, 29.61228453
                ],
                [
                    114.44785938, 29.60710609
                ],
                [
                    114.48376676, 29.61532735
                ],

            ];
            this.drawLines(route)
        },

        drawLines(positions) {
            this.$refs.CesiumMap.drawLines(positions);
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
        addRouteTask() {
            this.showMessage("请规划航线区域任务", "success")
            this.visibleMap = true;
            // this.dialogFormVisible = true
        },
        /**划分区域 */
        doPartition() {
            // this.showMessage("请规划航线区域任务", "success")
            this.fullloading = true;
            this.loadingText='正在划分区域中',
                this.$refs.CesiumMap.doPartition();
            setTimeout(() => {
                this.fullloading = false;

            }, 1500);


        },

        removeDataSources() {
            this.$refs.CesiumMap.removeDataSources();

        },
        clearLines(){
            this.$refs.CesiumMap.clearLines();

        },
        /**打开编辑弹窗 */
        opendialog() {

        },
        sendsaverouteInfo(route) {
            console.log('image.png', route);
            this.dialogFormVisible = true
        },


        onOpen() { },
        onClose() {
            this.$refs['missionTask'].resetFields()
        },
        close(m) {
            const type = m.field150;
            const size = m.field151;
            const name = m.field152;
            const newData = {
                name,
                type,
                size,
                flyTime: '',
                createTime: '2024-03-10 02:00:00',
                editTime: '2024-03-10 02:00:00',

            }
            this.taksList.unshift(newData)
            this.$emit('update:visible', false)
            this.dialogFormVisible = false;
        },
        // handelConfirm() {
        //     this.$refs['missionTask'].validate(valid => {
        //         if (!valid) return
        //         this.close()
        //     })
        // },

        handelConfirm() {
            this.$refs['missionTask'].validate(valid => {
                if (valid) {
                    // 表单验证通过，提交数据 : 保存当前表单数据到副本
                    const originalMissionTask = Object.assign({}, this.missionTask);
                    const m = { ...this.missionTask };

                    // this.$emit('submit:missionTask', this.missionTask);
                    // 确保在表单验证通过后再关闭对话框
                    this.close(m);
                } else {
                    console.log('error submit!!');
                    return false;
                }
            })
        },
        addTab() {
            // activeName
            let newTabName = ++this.tabIndex + '';
            this.editableTabs.push({
                title: '正射图集处理',
                name: newTabName,
            });
            this.activeName = newTabName;
        },
        format(percentage) {
            return percentage === 100 ? '完成' : `${percentage}%`;
        },



        addToSum() {
            this.count++;
            if (this.count < 100) {
                setTimeout(this.addToSum(), 120); // 3秒后再次调用函数
            } else {
                this.$refs.CesiumMap.addimageryProvider();
            }
        },

        showbigmap() {

        },
        readKml(id) {
            if (id == 0) {
                const route2 = [
                    [114.42641791, 29.64555138, 0],
                    [114.44705984, 29.64850995, 0],
                    [114.44705984, 29.64850995, 0],
                    [114.42505622, 29.64339965, 0], //
                    [114.46835165, 29.64345345, 0],
                    [114.42672738, 29.63366245, 0], //
                    [114.46847544, 29.64175891, 0],
                    [114.42821286, 29.63177946, 0],//
                    [114.46859923, 29.63917672, 0],
                    [114.43823982, 29.63387765, 0],//
                    [114.46986807, 29.63253266, 0],
                    [114.44288193, 29.62580745, 0],//
                    [114.46702091, 29.63288236, 0],
                    [114.44585288, 29.62734084, 0],//
                    [114.46271922, 29.63226366, 0],
                    [114.44987605, 29.62838999, 0],//
                    [114.45894364, 29.63129526, 0],
                ];

                this.$refs.CesiumMap.op(route2, Cesium.Color.BLUE);

            } else if (id == 1) {
                const route3 = [
                    [114.47033228, 29.62785196, 0],
                    [114.46983713, 29.63261337, 0],
                    [114.46863018, 29.63914983, 0],
                    [114.47652176, 29.62951982, 0],//
                    [114.46832070, 29.64339965, 0],
                    [114.49174789, 29.63444253, 0],
                    [114.48685820, 29.63871945, 0],
                ];
                this.$refs.CesiumMap.op(route3, Cesium.Color.RED);
            } else if (id == 2) {
                const route3 = [
                    [114.47033228, 29.62785196, 0],
                    [114.46983713, 29.63261337, 0],
                    [114.46863018, 29.63914983, 0],
                    [114.47652176, 29.62951982, 0],//
                    [114.46832070, 29.64339965, 0],
                    [114.49174789, 29.63444253, 0],
                    [114.48685820, 29.63871945, 0],
                ];
                this.$refs.CesiumMap.op(route3, Cesium.Color.BROWN);
            } if (id == 3) {
                const route3 = [
                    [114.47039418, 29.62779816, 0],
                    [114.49177884, 29.63444254, 0],
                    [114.47023944, 29.62739465, 0],
                    [114.49635906, 29.63035374, 0],
                    [114.47107502, 29.62607647, 0],// 
                    [114.49660663, 29.62922392, 0],
                    [114.49543063, 29.62685661, 0],
                    [114.47153923, 29.62384361, 0], //
                    [114.49159315, 29.62395121, 0],
                    [114.47203439, 29.62158380, 0],//
                    [114.49047904, 29.62373600, 0],
                    [114.47234387, 29.61929702, 0], //
                    [114.48534177, 29.61628379, 0],
                    [114.47311756, 29.61762900, 0],//
                    [114.49199547, 29.61192521, 0],
                    [114.47327228, 29.61679498, 0], //
                    [114.48961252, 29.60864269, 0],
                    [114.48914831, 29.60845434, 0],
                    [114.47423166, 29.61421214, 0],//
                    [114.48110198, 29.61179068, 0],
                    [114.47834766, 29.61431977, 0],
                    [114.47401502, 29.61310904, 0],//
                    [114.47710976, 29.61434666, 0],
                ];
                this.$refs.CesiumMap.op(route3, Cesium.Color.BURLYWOOD);
            } else if (id == 4) {
                const route4 = [
                    [114.46494743, 29.59471772, 0],
                    [114.46439038, 29.59428716, 0],
                    [114.47738829, 29.59929231, 0],//
                    [114.46259543, 29.59509446, 0],
                    [114.47936893, 29.61333773, 0],//
                    [114.45999585, 29.59988431, 0],
                    [114.47850240, 29.61425250, 0],// 
                    [114.45838658, 29.60246751, 0],
                    [114.47720261, 29.61430631, 0],//
                    [114.45386826, 29.60451249, 0],
                    [114.47404597, 29.61301487, 0],//
                    [114.45349690, 29.60607310, 0],
                    [114.46538070, 29.61226153, 0],//
                    [114.44916426, 29.60591167, 0],
                    [114.45937690, 29.61403727, 0], //
                    [114.44736931, 29.60585785, 0],
                    [114.44408888, 29.61016289, 0],
                    [114.45733438, 29.61775006, 0],//
                    [114.44297478, 29.61290725, 0],
                    [114.44718362, 29.61538250, 0],
                    [114.45021647, 29.62829583, 0],//
                    [114.44278909, 29.62576710, 0],

                ];
                this.$refs.CesiumMap.op(route4, Cesium.Color.CADETBLUE);
            }
            else if (id == 5) {
                const route = [
                    [114.47726451, 29.59681668, 0],
                    [114.47737282, 29.59942686, 0],
                    [114.47842503, 29.60671887, 0],
                    [114.49100515, 29.59321074, 0],//
                    [114.47938440, 29.61339154, 0],
                    [114.49639000, 29.59466390, 0], //
                    [114.48111746, 29.61177723, 0],
                    [114.49837063, 29.60144500, 0],// 
                    [114.48914831, 29.60844090, 0],
                    [114.49657568, 29.60354382, 0], //
                    [114.48976726, 29.60865615, 0],
                    [114.49598768, 29.60472775, 0], //
                    [114.49205737, 29.61201938, 0],
                    [114.49803022, 29.60801039, 0],//
                    [114.50205338, 29.61070101, 0],
                    [114.50146538, 29.60852161, 0],
                ];
                this.$refs.CesiumMap.op(route, Cesium.Color.BLACK);
            }
            else if (id == 6) {
                const route = [
                    [114.52023498, 29.59423333, 0],
                    [114.51296234, 29.59923850, 0],
                    [114.51116739, 29.59999194, 0],
                    [114.52227751, 29.59619776, 0], //
                    [114.51085791, 29.59980358, 0],
                    [114.52190614, 29.59762396, 0], //
                    [114.50779413, 29.59996503, 0],
                    [114.52255604, 29.60004576, 0],//
                    [114.50185222, 29.60104138, 0],
                    [114.52367014, 29.59999194, 0], //
                    [114.49832422, 29.60144500, 0],
                    [114.52422720, 29.60217152, 0], // 
                    [114.49649832, 29.60343619, 0],
                    [114.51633561, 29.60879067, 0],//
                    [114.49597221, 29.60467394, 0],
                    [114.49804569, 29.60795658, 0],
                    [114.50206885, 29.61067410, 0],//
                    [114.50151180, 29.60852161, 0],
                ];
                this.$refs.CesiumMap.op(route, Cesium.Color.BURLYWOOD);
            }
            else if (id == 7) {
                const route2 = [
                    [114.52899309, 29.58360326, 0],
                    [114.52029688, 29.59269945, 0],
                    [114.53205689, 29.58435683, 0], //
                    [114.52011119, 29.59423334, 0],
                    [114.53360426, 29.58548716, 0],//
                    [114.52218467, 29.59619776, 0],
                    [114.53453269, 29.58933557, 0],//
                    [114.52187519, 29.59767777, 0],
                    [114.52264888, 29.60007267, 0],
                    [114.52428909, 29.60219842, 0],//
                    [114.52370109, 29.59999194, 0],
                ];
                this.$refs.CesiumMap.op(route2, Cesium.Color.RED);
            }
            this.showMessage("区域绘制中", "success")


        }

    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.$bus.$on('send:ceshiRouteToMinio', this.sendsaverouteInfo);  //发送保存至minio
        this.$bus.$on('send:readkml', this.readKml);  //发送保存至minio
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
.flexStyle {
    display: flex;
    flex-wrap: wrap;
}
.clearfix {
    display: flex;
    justify-content: space-between;
    align-content: center;
    align-items: center;
    & > span {
        flex: 1;
    }
}
label {
    font-size: 15px;
}
label + span {
    font-size: 13px;
}
</style>