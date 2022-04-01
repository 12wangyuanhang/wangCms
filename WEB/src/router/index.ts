import { createRouter, createWebHistory } from 'vue-router';
console.log(import.meta.glob('../views/**.view.vue'),444444)
const router = createRouter({
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
                    component: () => import('../views/test.vue')
                },
                {
                    path:'button',
                    name:'Button',
                    component: () => import('../views/button.vue')
                },
                {
                    path:'demo',
                    name:'Demo',
                    component: () => import('../views/demo.vue'),
                    children:[
                        {
                            path:'demo2',
                            name:'Demo2',
                            component: () => import('../views/demo2.vue'),
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

export default router;