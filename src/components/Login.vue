<template>
    <div class="login_container">
        <!-- 登录块 -->
        <div class="login_box">
            <!-- 头像 -->
            <div class="avatar_box">
                <img src="../assets/logo.png" alt/>
            </div>

            <!-- 表单组件 -->
            <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" class="login_form" label-width="0px">
                <!-- 用户名 -->
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" prefix-icon="iconfont icon-denglu" @blur="usernameRules()"></el-input>
                </el-form-item>

                <!-- 密码 -->
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" prefix-icon="iconfont icon-mima" type="password"></el-input>
                </el-form-item>

                <!-- 按钮 -->
                <el-form-item class="btns">
                    <!-- <el-button type="success" @click="$router.push('/register')">注册</el-button> -->
                    <el-button type="primary" @click="login()">登录</el-button>
                    <el-button type="success" @click="register()">注册</el-button>
                    <el-button type="info" @click="resetLoginForm()">重置</el-button>
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
            loginForm: {
                username:"admin",//admin
                password:"123456"//123456
            },
            //验证对象
            loginRules: {
                //校验用户名
                username:[
                    { required: true, message: '用户名为必填项', trigger: 'blur' },//必填项验证
                    { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' },//长度验证
                    { required: true, pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/, message: '姓名不支持特殊字符', trigger: 'blur' },
                ],
                //校验密码
                password:[
                    { required: true, message: '用户密码为必填项', trigger: 'blur' },//必填项验证
                    { min: 6, max: 10, message: '长度在 6 ~ 10 个字符', trigger: 'blur' }//长度验证
                ],
            },
        };
    },
    methods: {
        usernameRules(){
            this.$refs.loginFormRef.validate(async valid =>{
                if( !valid ) return;//验证失败
                const {data:res} = await this.$http.post("usernamerules?username=" + this.loginForm.username);//访问后台
                if( res.flag != "success") this.$message.error("用户名不存在！！！");//信息提示
                
            })
        },
        //跳转到注册页面
        register(){
            this.$refs.loginFormRef.validate(valid =>{
                this.$message.success("欢迎来到注册页面！！！");//信息提示
                this.$router.push({path: "/register"});//页面路由跳转
            })
        },
        //登录方法
        login(){
            //验证校验规则
            this.$refs.loginFormRef.validate(async valid =>{
                if( !valid ) return;//验证失败
                const {data:res} = await this.$http.post("login",this.loginForm);//访问后台
                if( res.flag == "ok"){//成功
                    this.$message.success("登录成功！！！");//信息提示
                    window.sessionStorage.setItem("user",res.user);//存储user对象
                    this.$router.push({path:"/home"});//页面路由跳转
                }else{//失败
                    this.$message.error("登录失败！！！");//错误提示
                }
            })
        },
        //重置表单内容
        resetLoginForm(){
            this.$message.success("重置成功！！！");
            this.$refs.loginFormRef.resetFields();//clearValidate() 仅清空校验；resetFields() 不仅清空校验，还重置字段值
        },
    },
}
</script>

<style lang="less" scoped>
//根节点样式
.login_container{
    background-color: #2b4b6b;
    height: 100%;
}
.login_box{
    width: 450px;
    height: 300px;
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
.login_form{
    position: absolute;
    bottom: 0%;
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
}
</style>