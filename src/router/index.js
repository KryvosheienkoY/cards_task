import Vue from 'vue'
import VueRouter from 'vue-router'
import CardInfoView from "@/views/CardInfoView";
import CardsListView from "@/views/CardsListView";
Vue.use(VueRouter)

const routes = [
    {
        path: '/card/:id',
        name: 'CardInfoView',
        component: CardInfoView,
        props: (route) => {
            return {
                id: +route.params.id,
            };
        },
    },
    {
        path: '/',
        name: 'CardsListView',
        component: CardsListView
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
