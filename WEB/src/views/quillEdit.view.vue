<script lang="tsx">
import { defineComponent,Ref, ref, reactive,computed,onMounted,getCurrentInstance,watch } from 'vue';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import Test5 from './test5.vue'
export default defineComponent({
    components:{
        QuillEditor,
        Test5
    },
    setup(){
        const { proxy } = getCurrentInstance();
        let subContent = ref('')
        let myQuillEditor: Ref<HTMLElement | null> = ref(null)
        // const editor = computed(()=>subContent.value.$refs.myQuillEditor.quill)
        // const toolbarOptions = [
        //     ['bold', 'italic', 'underline'],
        //     [{ size: ['small', false, 'large', 'huge'] }],
        //     [{ color: [] }, { background: [] }],
        //     [{ font: [] }],
        //     [{ align: [] }],
        //     ['image']
        // ]
        
        let editorOption = reactive({
            placeholder: "请在这里输入",
            modules:{
                toolbar:[
                    ['bold', 'italic', 'underline', 'strike'],    //加粗，斜体，下划线，删除线
                    ['blockquote', 'code-block'],     //引用，代码块
                    [{ 'header': 1 }, { 'header': 2 }],        // 标题，键值对的形式；1、2表示字体大小
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],     //列表
                    [{ 'script': 'sub'}, { 'script': 'super' }],   // 上下标
                    [{ 'indent': '-1'}, { 'indent': '+1' }],     // 缩进
                    [{ 'direction': 'rtl' }],             // 文本方向
                    [{ 'size': ['small', false, 'large', 'huge'] }], // 字体大小
                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],     //几级标题
                    [{ 'color': [] }, { 'background': [] }],     // 字体颜色，字体背景颜色
                    [{ 'font': [] }],     //字体
                    [{ 'align': [] }],    //对齐方式
                    ['clean'],    //清除字体样式
                    ['image','video']    //上传图片、上传视频
                ]
            }
        },)
        // reactive({ // 富文本编辑器的工具栏
        //     modules: {
        //     toolbar: {
        //         container: toolbarOptions, // 工具栏
        //         handlers: {
        //             image: (value) => { // 对图片进行改造，默认是通过base64 ,现通过iview 去传。
        //                 if (value) {
        //                     (document.querySelector('#iviewUp input') as any).click()
        //                 } else {
        //                     this.quill.format('image', false)
        //                 }
        //             }
        //         }
        //     }
        // }})
        let quillEditData = reactive({
            content: ``,
            editorOption: {},
            myQuillEditor:null as any,
        })
        onMounted(() => {
            if (quillEditData.myQuillEditor) { // 因为dom可能为null,而null是没有HTMLElement的属性的，所以需要先判断一下dom.value是否等于null,避免为Null时执行dom方法
                const data = quillEditData.myQuillEditor
                console.log(data,87272456)
            }
            console.log(proxy.$refs,89988)
        })
        watch(()=>quillEditData.content,(value)=>{
            console.log(value,876)
        })
        // const onEditorChange = (e:any)=> {
        //     const _this = this
        //     quillEditData.content = e.html // 标签以<p></p> 形式渲染 （重点）
        //     quillEditData.contentTxt = e.text.substr(0, 100)
        // }
        const submit = ()=>{
            console.log(myQuillEditor.value,8999)
        }
        return () => (
            <>
                <div>
                     <quillEditor
                        v-model:content={quillEditData.content}
                        ref={(ref:any)=>{ myQuillEditor.value = ref}}
                        options={editorOption}
                        theme="snow"
                        class={['quill', 'ql-editor']}
                        placeholder="请输入公告内容"
                        contentType="html"
                        // onChange={($event:any)=>onEditorChange($event)}
                    />
                    <div v-html={quillEditData.content}></div>
                    <el-button onClick={()=>submit()}></el-button>
                </div>
            </>
        )
    }
})
</script>

<style lang="scss" scoped>
    :deep(.ql-editor) {
        min-height: 300px;
    }
</style>