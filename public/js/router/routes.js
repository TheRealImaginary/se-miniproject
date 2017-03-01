import VueRouter from 'vue-router'
import Home from '../views/Home'
import SignUp from '../views/SignUp'
import Login from '../views/Login'
import Logout from '../views/Logout'
let routes = [
	{
		path: '/signup',
		component: SignUp

	},
	{
		path: '/login',
		component: Login
	},
	{
		path: '/logout',
		component: Logout
	},
	{
		path: '/home',
		component: Home
	}
];

export default new VueRouter({
	routes
});