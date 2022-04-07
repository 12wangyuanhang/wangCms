<script lang="tsx">
import { defineComponent, reactive, ref, getCurrentInstance } from 'vue';
import type { ElForm } from 'element-plus';
import { useRouter } from 'vue-router'; 
type FormInstance = InstanceType<typeof ElForm>;
export default defineComponent({
    setup(){
        const { proxy }:any = getCurrentInstance();
        const router = useRouter();
        const ruleFormRef = ref<FormInstance>()
        const ruleForm = reactive({
            userName:'12345678',
            passWord: '666666',
        })
        // const validatePass = (rule: any, value: any, callback: any) => {
        //     if (value === '') {
        //         callback(new Error('请输入密码'))
        //     } else {
        //         callback()
        //     }
        // }
       
        const rules = reactive({
            userName:[
                { required: true, message: '请输入用户名', trigger: 'blur' },
            ],
            passWord: [
                // { validator: validatePass, trigger: 'blur' },
                { required: true, message: '请输入密码', trigger: 'blur' },
                ],
        })
        
        let obj = {
            fun1:()=><>123</>
        }
        
        const submitForm = (formEl:any) => {
            if (!formEl) return
            formEl.validate(async (valid:boolean) => {
                if (valid) {
                    console.log('submit!')
                    let params = {
                        userName:ruleForm.userName,
                        passWord:ruleForm.passWord
                    }
                    let res = await proxy.$http.post('/api/login',params)
                    if(res.status == 0){
                        localStorage.setItem('token',res.result.token)
                        router.push('/home/test')
                    } else {
                        proxy.$message.error(res.msg)
                    }

                } else {
                    console.log('error submit!')
                    return false
                }
            })
        }
        const btnSlots = {
            label:()=>(
                <><div></div></>
            )
        }
        return ()=>(
            <>
                <div class="login-box">
                    <div class="login-content">
                        <h3 class="login-title">后台管理系统</h3>
                         <el-form
                            ref={ruleFormRef}
                            model={ruleForm}
                            status-icon
                            rules={rules}
                            label-width="65px"
                            class="demo-ruleForm"
                        >
                            <el-form-item label="用户名" prop="userName">
                                <el-input
                                    v-model={ruleForm.userName}
                                    autocomplete="off"
                                />
                            </el-form-item>
                            <el-form-item label="密码" prop="passWord">
                                <el-input v-model={ruleForm.passWord} type="password" autocomplete="off" />
                            </el-form-item>
                            <el-form-item label-width="0px">
                                <el-button style="width:100%;" type="primary" onClick={()=>submitForm(ruleFormRef.value)}>Submit</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </>
        )
    }  
})
</script>

<style lang="scss" scoped>
    ::v-deep .el-form-item--default {
        margin-bottom: 22px;
    }
    .login-box {
        width: 100%;
        height: 100%;
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-image: url('../assets/a.jpeg');
        background-repeat: no-repeat;
        background-size: cover;
        -webkit-box-align: center;
        -webkit-box-pack: center;
        .login-content {
            border-radius: 6px;
            background: #fff;
            width: 400px;
            padding: 25px 25px 55px 25px;
            .login-title {
                margin: 30px auto 30px auto;
                text-align: center;
                color: #707070;
            }
        }
    }
</style>