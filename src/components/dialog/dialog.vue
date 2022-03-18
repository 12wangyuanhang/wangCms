<template>
    <div v-if="open" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.5)" v-loading="loading" class="dialogBox">
        <el-dialog :top="top" :title="title" v-model="open" :width="width" :show-close="true"
            :before-close="handleClose">
            <component :is="components" :props="props" @doCancel="doCancel"></component>
        </el-dialog>
    </div>
</template>

<script lang='ts'>
    import { defineComponent, computed } from 'vue';
    import Bus from '../../utils/eventBus'
    export default defineComponent({
        props: {
            show: {
                type: Boolean,
                default: false,
            },
            title: {
                type: String
            },
            width: {
                type: String,
                default: '500px'
            },
            components: {
                type: Object
            },
            props: {
                type: Object
            },
            top: {
                type: String,
                default: () => '15vh'
            },
            callback: {
                type: Function
            },
        },
        data() {
            return {
                open: this.$props.show,
                loading: false,
            };
        },
        created() {
            Bus.$on('changeLoading', (val: boolean) => {
                this.loading = val;
            })
        },
        onBeforeUnmount() {
            Bus.$off('changeLoading');
        },
        methods: {
            // 修改loading
            changeLoading(val: boolean) {
                this.loading = val;
            },
            handleClose(done: any) {
                done();
                return
                this.$confirm('确认关闭？')
                    .then(() => {
                        done();
                    })
                    .catch(() => {});
            },
            doCancel(action: any) {
                this.open = false;
                (this as any).callback(action);
            },
        }
    })
</script>

<style lang='scss'>
    .dialogBox {
        width: 100%;
        height: 100%;
        position: absolute !important;
        top: 0;
        left: 0;

        .el-dialog__body {
            padding: 0;
        }

        .el-loading-mask {
            z-index: 9999;
        }

    }
</style>