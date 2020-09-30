<template>
    <div class="register_container">
        <!-- 登录块 -->
        <div class="register_box">
            <!-- 头像 -->
            <div class="avatar_box">
                <img src="../assets/logo.png" alt/>
            </div>

            <!-- 表单组件 -->
            <el-form ref="registerFormRef" :model="registerForm" :rules="registerRules" class="register_form" status-icon label-width="0px">
                <!-- 用户名 -->
                <el-form-item prop="username">
                    <el-input v-model="registerForm.username" prefix-icon="iconfont icon-denglu"></el-input><!--  @blur="usernameRules('registerFormRef')" -->
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="pass">
                    <el-input v-model="registerForm.pass" prefix-icon="iconfont icon-mima" type="password" autocomplete="off"></el-input>
                </el-form-item>
                <!-- 确认密码 -->
                <el-form-item prop="checkPass">
                    <el-input v-model="registerForm.checkPass" prefix-icon="iconfont icon-mima" type="password" autocomplete="off"></el-input>
                </el-form-item>
                <!-- 年龄 -->
                <el-form-item prop="age">
                    <el-input v-model.number="registerForm.age" prefix-icon="iconfont icon-nianling"></el-input>
                </el-form-item>
                <!-- 邮箱 -->
                <el-form-item prop="email">
                    <el-input v-model="registerForm.email" prefix-icon="iconfont icon-youxiang"></el-input>
                </el-form-item>

                <!-- 按钮 -->
                <el-form-item class="btns">
                    <!-- <el-button type="success" @click="$router.push('/register')">注册</el-button> -->
                    <el-button type="success" @click="register('registerFormRef')">注册</el-button>
                    <el-button type="primary" @click="login('registerFormRef')">登录</el-button>
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
        var checkAge = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('年龄不能为空'));
            }
            setTimeout(() => {
                if (!Number.isInteger(value)) {
                    callback(new Error('请输入数字值'));
                } else {
                    if (value < 18) {
                        callback(new Error('必须年满18岁'));
                    } else {
                        callback();
                    }
                }
            }, 1000);
        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            }else {
                if (this.registerForm.checkPass !== '') {
                    this.$refs.registerFormRef.validateField('checkPass');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.registerForm.pass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return{
            //表单数据对象
            registerForm: {
                username:'',//admin
                pass: '',//123456
                checkPass: '',//123456
                age: '',//18
                email:'',//wjs123@163.com
            },
            //验证对象
            registerRules: {
                //校验用户名
                username:[
                    { validator: checkUsername, trigger: 'blur' }
                ],
                //校验密码
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                //校验确认密码
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
                //校验年龄
                age: [
                    { validator: checkAge, trigger: 'blur' }
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
                // 后台未实现
                // const {data:res} = await this.$http.post("adduser",this.registerForm);
                // if(res != "success"){
                //     return this.$message.error("注册失败！！！");
                // }
                this.$message.success("注册成功！！！");
                this.$router.push({path: "/login"});
            });
        },
        //跳转到登录页面
        login(formName){
            //验证校验规则
            this.$refs[formName].validate(valid =>{
                this.$message.success("欢迎来到登录页面！！！");//信息提示
                this.$router.push({path: "/login"});//页面路由跳转 不打开新窗口，留在本页面 or this.$router.push("/login");
                //  let routeData = this.$router.resolve({path: "/login"});//页面路由跳转
                //  window.open(routeData.href, '_blank');//打开新窗口，不留在本页面
            })
        },
        //重置表单内容
        resetregisterForm(formName){
            this.$message.success("重置成功！！！");
            this.$refs[formName].resetFields();//clearValidate() 仅清空校验；resetFields() 不仅清空校验，还重置字段值
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
    height: 450px;
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