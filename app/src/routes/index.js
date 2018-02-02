import Home from '../pages/main/main';
import Reservation from '../pages/reservation/reservation';

export default
[
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
]
