import { createVNode, render} from 'vue';
import type {App} from 'vue'
import DialogDom from './dialog.vue'
function createDialog(app:App, opt:any){
    return new Promise((resolve, reject)=>{
        // 容器
        const container = document.createElement('div');
        opt.show = true;

        opt.callBack = (dialogData:any)=>{
            resolve(dialogData);
        }
        console.log(opt,'opt')
        const vm = createVNode(
            DialogDom,
            opt as any,
        )
        vm.appContext = app._context;
        render(vm, container)
        document.body.appendChild(container);
    })
}

export default (app:App)=>{
    app.config.globalProperties.$dialog = (opt:any) => createDialog(app,opt);
}