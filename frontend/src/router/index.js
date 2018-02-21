import Home from '../pages/main/main';
import Reservation from '../pages/reservation/reservation';
import Confirmation from '../pages/confirmation/index';
import VueRouter from 'vue-router';

export default new VueRouter({
    routes: [
        {
            path: '/',
            component: Home,
            name: 'home'
        },
        {
            path: '/:id/reservation',
            component: Reservation,
            name: 'reservation',
            props: true
        },
        {
            path: '/confirmation',
            component: Confirmation ,
            name: 'confirmation',
            props: true
        },
    ]
});
