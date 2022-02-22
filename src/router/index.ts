import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            name: 'home',
            component: () => import('@/views/home.vue')
        },
        {
            path: '/button',
            name: 'button',
            component: () => import('@/views/button.vue')
        }
    ]
})

export default router;