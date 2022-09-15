
<template>
    <div class="edit_container">
        <quill-editor 
            v-model:content="content" 
            ref="dom" 
            :options="editorOption" 
            @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
            @change="onEditorChange($event)">
        </quill-editor>
    </div>
</template>
<script lang="ts">
import { Ref } from 'vue'
import { defineComponent, ref, onMounted } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
export default {
    components: {
        QuillEditor
    },
    setup(){
        const dom: Ref<HTMLElement | null> = ref(null)
        onMounted(() => {
            if (dom.value) { // 因为dom可能为null,而null是没有HTMLElement的属性的，所以需要先判断一下dom.value是否等于null,避免为Null时执行dom方法
                const data = dom.value;
                console.log(data)
            }
        })
        return {
            dom
        }
    },
    data() {
        return {
            content: `<p></p><p><br></p><ol><li><strong><em>Or drag/paste an image here.</em></strong></li><li><strong><em>rerew</em></strong></li><li><strong><em>rtrete</em></strong></li><li><strong><em>tytrytr</em></strong></li><li><strong><em>uytu</em></strong></li></ol>`,
            editorOption: {
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
        }
        }
    },
    watch:{
        content(value:any){
            console.log(123545,value)
        },
    },
    methods: {
        onEditorReady(editor) { // 准备编辑器
 
        },
        onEditorBlur(){}, // 失去焦点事件
        onEditorFocus(){}, // 获得焦点事件
        onEditorChange(){}, // 内容改变事件
    },
    computed: {
        // editor() {
        //     return this.$refs.myQuillEditor.quill;
        // },
    }
}
</script>

<style lang="scss" scoped>
    :v-deep(.ql-editor) {
        min-height: 300px;
    }
</style>