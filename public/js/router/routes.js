import VueRouter from 'vue-router'
import Home from '../views/Home'
import SignUp from '../views/SignUp'
import Login from '../views/Login'
import Logout from '../views/Logout'
import Profile from '../views/Profile'
import AddWork from '../views/AddWork'
import CreatePortfolio from '../views/CreatePortfolio'

let routes = [
	{
		path:'/',
		redirect: '/home'
	},
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
	},
	{
		path: '/profile',
		component: Profile
	},
	{
		path: '/AddWork',
		component: AddWork
	},
	{
		path: '/CreatePortfolio',
		component: CreatePortfolio
	}
];

export default new VueRouter({
	routes
});