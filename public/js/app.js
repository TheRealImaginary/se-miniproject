import Vue from 'vue';
import VueRouter from 'vue-router'
import axios from 'axios'

Vue.use(VueRouter);

window.axios = axios;

new Vue({
	el: '#root',
	data: {
		message: 'Test'
	},
	components: {

	}
});