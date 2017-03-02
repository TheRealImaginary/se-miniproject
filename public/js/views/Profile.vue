<template>
	<div class="row">
		<div class="col-md-6 col-md-offset-3">
			<h1>Profile</h1>

			<div v-show="errors.length > 0">
	            <h3 class="text-center">The Following Error(s) Occurred</h3>
	            <div v-text="errors[0]" class="alert alert-danger"></div>
	        </div>

	        <div v-show="success">
	            <h3 v-text="successMsg" class="text-center alert alert-success"></h3>
	        </div>

	        <div class="row">
	            <div class="thumbnail text-center">
		            <img :src="imageURL(avatarName)" alt="Profile Picture">
					<input @change="avatarChange" type="file" name="profilePic" accept="image/*">
					<button @click="onClick" type="button" class="btn btn-primary">Edit</button>
	            </div>
	        </div>
        </div>
    </div>
</template>

<script>
	export default {
		data() {
			return {
				avatar: '',
				avatarName: '',
				errors: [],
				success: false,
				successMsg: ''
			}
		},
		methods: {
			onClick() {
				this.success = false;
				this.errors = [];
				this.successMsg = '';
				let payload = new FormData();
				payload.append('avatar', this.avatar);
				let headers = {
					headers: {
						Authorization: `JWT ${localStorage.getItem('token')}`
					}
				};
				axios.post('http://localhost:8000/api/v1/student/profile/picture', payload, headers).then((response) => {
					console.log(response.data);
					this.success = true;
					this.successMsg = response.data.message;
					this.Update();
				}).catch((err) => {
					console.log(err);
					this.errors = [err.response.data.error];
				});
			},
			Update(){
				let headers = {
					headers: {
						Authorization: `JWT ${localStorage.getItem('token')}`
					}
				};
				axios.get('http://localhost:8000/api/v1/student/profile/picture', headers).then((response) => {
					console.log(response.data.message);
					this.avatarName = response.data.avatar;
				}).catch((err) => {
					console.log(err);
					this.errors = [err.response.data.error];
				});
			},
			avatarChange(event) {
				console.log(event.target.files[0]);
				if (event.target.files && event.target.files.length) {
					this.avatar = event.target.files[0];
				}
			},
			imageURL(image){
				// console.log(Image, image);
				return `avatars/${image || 'profile-default-male.jpg'}`;
			}
		},
		mounted(){
			this.Update();
		}
	}
</script>

<style>

</style>