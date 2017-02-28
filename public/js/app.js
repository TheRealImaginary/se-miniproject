import Vue from 'vue';
import VueRouter from 'vue-router'
import axios from 'axios'
import NavBar from './components/NavBar'
import Login from './views/Login'
import SignUp from './views/SignUp'
import AddWork from './views/AddWork'

Vue.use(VueRouter);

window.axios = axios;

new Vue({
	el: '#root',
	data: {},
	components: {
		'nav-bar': NavBar,
		'login-form': Login,
		'sign-form': SignUp,
		'work-form': AddWork
	},
	methods: {}
});