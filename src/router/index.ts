import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/home'
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
                    component: () => import('../views/demo.vue')
                },
            ]
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