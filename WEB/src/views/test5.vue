

<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    props: ["refCallback"],
    setup(props) {
        return () => (
            <el-button ref={props.refCallback}>
            </el-button>
        )
    }
})
</script>
