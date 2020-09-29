<template>
    <div class="register_container">
        <!-- 登录块 -->
        <div class="register_box">
            <!-- 头像 -->
            <div class="avatar_box">
                <img src="../assets/logo.png" alt/>
            </div>

            <!-- 表单组件 -->
            <el-form ref="registerFormRef" :model="registerForm" :rules="registerRules" class="register_form" label-width="0px">
                <!-- 用户名 -->
                <el-form-item prop="username">
                    <el-input v-model="registerForm.username" prefix-icon="iconfont icon-denglu"></el-input><!--  @blur="usernameRules()" -->
                </el-form-item>

                <!-- 密码 -->
                <el-form-item prop="password">
                    <el-input v-model="registerForm.password" prefix-icon="iconfont icon-mima" type="password"></el-input>
                </el-form-item>

                <!-- 邮箱 -->
                <el-form-item prop="email">
                    <el-input v-model="registerForm.email" prefix-icon="iconfont icon-youxiang"></el-input>
                </el-form-item>

                <!-- 按钮 -->
                <el-form-item class="btns">
                    <!-- <el-button type="success" @click="$router.push('/register')">注册</el-button> -->
                    <el-button type="success" @click="register()">注册</el-button>
                    <el-button type="primary" @click="login()">登录</el-button>
                    <el-button type="info" @click="resetregisterForm()">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            //表单数据对象
            registerForm: {
                username:"admin",//admin
                password:"123456",//123456
                email:'wjs123@163.com'//wjs123@163.com
            },
            //验证对象
            registerRules: {
                //校验用户名
                username:[
                    { required: true, message: '用户名为必填项', trigger: 'blur' },//必填项验证
                    { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' },//长度验证
                    { pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/, message: '姓名不支持特殊字符', trigger: 'blur' }
                ],
                //校验密码
                password:[
                    { required: true, message: '用户密码为必填项', trigger: 'blur' },//必填项验证
                    { min: 6, max: 10, message: '长度在 6 ~ 10 个字符', trigger: 'blur' }//长度验证
                ],
                //校验邮箱
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    { min: 5, max: 22, message: '请输入正确邮箱地址', trigger: 'blur' },
                    { pattern: /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/, message: '邮箱格式不正确', trigger: 'blur' },
                ],
            },
        };
    },
    methods: {
        usernameRules(){
            // this.$refs.registerFormRef.validate(async valid =>{
            //     if( !valid ) return;//验证失败
            //     const {data:res} = await this.$http.post("usernamerules?username=" + this.registerForm.username);//访问后台
            //     if( res.flag == "success") this.$message.error("用户名已存在！！！");//信息提示
            // })
            this.$message.success("ok");
        },
        //注册方法
        register(){
            this.$refs.registerFormRef.validate(async valid=>{
                if(!valid) return;
                const {data:res} = await this.$http.post("adduser",this.registerForm);
                if(res != "success"){
                    return this.$message.error("注册失败！！！");
                }
                this.$message.success("注册成功！！！");
            });
        },
        //跳转到登录页面
        login(){
            //验证校验规则
            this.$refs.registerFormRef.validate(valid =>{
                this.$message.success("欢迎来到登录页面！！！");//信息提示
                this.$router.push({path: "/login"});//页面路由跳转 不打开新窗口，留在本页面 or this.$router.push("/login");
                //  let routeData = this.$router.resolve({path: "/login"});//页面路由跳转
                //  window.open(routeData.href, '_blank');//打开新窗口，不留在本页面
            })
        },
        //重置表单内容
        resetregisterForm(){
            this.$message.success("重置成功！！！");
            this.$refs.registerFormRef.resetFields();//clearValidate() 仅清空校验；resetFields() 不仅清空校验，还重置字段值
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
    height: 350px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    .avatar_box{
        width: 130px;
        height: 130px;
        border: 1px solid #eee;
        border-radius: 50%;
        padding: 5px;
        box-shadow: 0 0 2px #ddd;
        position: absolute;
        left: 50%;
        transform: translate(-50%,-50%);
        background-color: #0ee;
        img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #eee;
        }
    }
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