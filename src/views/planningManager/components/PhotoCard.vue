<!--
 * @Descripttion: 
 * @version: 
 * @Author: Eugene
 * @Date: 2024-03-14 11:58:44
 * @LastEditors: Andy
 * @LastEditTime: 2024-03-14 11:58:45
-->
<!--  -->
<template>
    <el-card class="photo-card">
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