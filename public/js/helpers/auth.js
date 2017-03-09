export default {
	user: {
		authenticated: false
	},
	login(data, callBack) {
		axios.post('/api/v1/auth/login', {
			email: data.email,
			password: data.password
		}).then((response) => {
			this.user.authenticated = true;
			this.setToken(response.data.token);
			return callBack(null, response.data);
		}).catch((err) => {
			return callBack(err);
		});
	},
	setToken(token) {
		localStorage.setItem('token', token);
	},
	logOut() {
		this.user.authenticated = false;
		localStorage.removeItem('token');
	}
}