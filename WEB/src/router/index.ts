import { createRouter, createWebHistory,Router } from 'vue-router';
const viewsData = import.meta.glob('../views/**.view.vue');
console.log(viewsData,45)
const router:Router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/home',
            name: 'home',
            component: () => import('@/views/home.vue'),
            children:[
                {
                    path:'test',
                    name:'Test',
                    component: () => import('../views/test.vue'),
                    meta: {
                        icon:'AddLocation'
                    }
                },
                {
                    path:'button',
                    name:'Button',
                    component: () => import('../views/button.vue'),
                    meta: {
                        icon:'AlarmClock'
                    }
                },
                {
                    path:'demo',
                    name:'Demo',
                    component: () => import('../views/demo.vue'),
                    meta: {
                        icon:'AddLocation'
                    },
                    children:[
                        {
                            path:'demo2',
                            name:'Demo2',
                            component: () => import('../views/demo2.vue'),
                            meta: {
                                icon:'Apple'
                            }
                        }
                    ]
                },
            ]
        },
        {
            path:'/login',
            name:'Login',
            component: () => import('../views/login.vue'),
        },
        {
            path: '/button',
            name: 'button',
            component: () => import('@/views/button.vue')
        },
        // {
        //     path: '/test',
        //     name: 'Test',
        //     component: () => import('@/views/test.vue')
        // }
    ]
})
for(let name in viewsData){
    let newName = name.replace(/\..\/views\/(.*?)\.view.vue/,'$1');
    let item = {
        path:newName,
        name:newName.charAt(0).toLocaleUpperCase() + newName.slice(1),
        component:viewsData[name],
    }
    router.options.routes[1].children?.push(item);
    router.addRoute('home',item);
}
// console.log(router,9000);   
export default router;