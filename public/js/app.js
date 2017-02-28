import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import router from './router/routes';
import NavBar from './components/NavBar';
import Portfolio from './components/Portfolio';
import Login from './views/Login';
import SignUp from './views/SignUp';
import AddWork from './views/AddWork';
import CreatePortfolio from './views/CreatePortfolio';

Vue.use(VueRouter);

window.axios = axios;

new Vue({
	el: '#root',
	router,
	data: {},
	components: {
		'nav-bar': NavBar,
		'login-form': Login,
		'sign-form': SignUp,
		'work-form': AddWork,
		'create-portfolio': CreatePortfolio,
		'portfolio-item': Portfolio
	},
	methods: {}
});