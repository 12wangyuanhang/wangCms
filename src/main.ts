import { createApp } from 'vue';
import type {App} from 'vue';
import AppDom from './App.vue'
import './assets/index.css';
import router from './router/index'
import ElementPlus from 'element-plus'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import 'element-plus/dist/index.css'
import * as ElIcons from '@element-plus/icons-vue';

function useTable(app:App){
    app.use(VXETable)
}
declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $http: any;
        $service: any;
        $message: any;
        $confirm: any;
        $dialog: any;
        $cityNameCache: any;
    }

}

declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'

const app = createApp(AppDom);
app.use(useTable);
app.use(ElementPlus);
app.use(router);
// for (const name in ElIcons){
// 	app.component(name,(ElIcons as any)[name])
// }
app.mount('#app');