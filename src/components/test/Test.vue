<template>
    <div class="register_container">
        <!-- 登录块 -->
        <div class="register_box">
            <!-- 表单组件 -->
            <el-form ref="registerFormRef" :model="registerForm" :rules="registerRules" class="register_form" status-icon label-width="0px">
                <!-- 用户名 -->
                <el-form-item prop="username">
                    <el-input v-model="registerForm.username" prefix-icon="iconfont icon-denglu"></el-input>
                </el-form-item>
                <!-- 按钮 -->
                <el-form-item class="btns">
                    <el-button type="success" @click="register('registerFormRef')">注册</el-button>
                    <el-button type="info" @click="resetregisterForm('registerFormRef')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        var checkUsername = (rule, value, callback) => {
            let reg = /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/;
            if (!value) {
                 callback(new Error('用户名为必填项'));
            } else if (value.length < 5 || value.length > 12) {
                callback(new Error('长度在 5 到 12 个字符'));
            } else if (!reg.test(value)) {
                callback(new Error('姓名不支持特殊字符'));
            // } else if (this.usernameRules()) {
            //     callback(new Error('用户名已存在'));
            } else {
                callback();
            }
        };
        return{
            //表单数据对象
            registerForm: {
                username:'',
            },
            //验证对象
            registerRules: {
                //校验用户名
                username:[
                    { validator: checkUsername, trigger: 'blur' }
                ],
            },
        };
    },
    methods: {
        // usernameRules(){
        //     this.$refs.registerFormRef.validate(async valid =>{
        //         const {data:res} = await this.$http.post("usernamerules?username=" + this.registerForm.username);//访问后台
        //         if( res.flag == "success") {
        //             this.$message.error("用户名已存在！！！");//信息提示
        //             return true;
        //         } else {
        //             return false;
        //         }
        //     });
        // },
        //注册方法
        register(formName){
            this.$refs[formName].validate(async valid=>{
                if(!valid) return;
                this.$message.success("注册成功！！！");
            });
        },
        //重置表单内容
        resetregisterForm(formName){
            this.$message.success("重置成功！！！");
            this.$refs[formName].resetFields();
        },
    },
}
</script>

<style lang="less" scoped>
//根节点样式
.register_container{
    background-color: #2b4b6b;
    height: 100%;
}
.register_box{
    width: 450px;
    height: 150px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}
.btns{
    display: flex;
    justify-content: flex-end;
}
.register_form{
    position: absolute;
    bottom: 0%;
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
}
</style>