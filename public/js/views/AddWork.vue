<template>
	<div class="row">
        <div class="col-md-6 col-md-offset-3">
            <h3 class="text-center">Add Work</h3>

            <div v-show="errors.length > 0">
                <h3 class="text-center">Please Fix The Following Errors!</h3>
                <div v-text="errors[0]" class="alert alert-danger"></div>
            </div>

            <div v-show="success">
                <h3 v-text="successMsg" class="text-center alert alert-success"></h3>
            </div>

            <form @submit.prevent="onSubmit">
                <label class="control-label" for="workName">Work Name</label>
                <div class="form-group">
                    <input v-model="workName" type="text" name="workName" class="form-control" placeholder="Work Name">
                </div>
                <label class="control-lavel" for="workLink">Work Link</label>
                <div class="form-group">
                    <input v-model="workLink" type="text" name="workLink" class="form-control" placeholder="Work Link">
                </div>
                <label class="control-label" for="workDescription">Work Description</label>
                <div class="form-group">
                    <input v-model="workDescription" type="text" name="workDescription" class="form-control" placeholder="Work Description">
                </div>
                <label class="control-label" for="workImage">Screen Shot</label>
                <div class="form-group">
                    <input @change="workImageChange" type="file" name="workImage" accept="image/*">
                </div>
                <div class="form-group text-center">
                    <button type="submit" class="btn btn-primary">Add Work</button>
                </div>
            </form>

        </div>
    </div>
</template>

<script>
	export default {
		data(){
			return {
				errors: [],
				success: false,
				successMsg: '',
				workName: '',
				workLink: '',
				workDescription: '',
				workImage: ''
			}
		},
		methods: {
			onSubmit(){
				this.errors = [];
				this.success = false;
				this.successMsg = '';

				let payload = new FormData();
				payload.append('workImage', this.workImage);
				payload.append('workName', this.workName);
				payload.append('workLink', this.workLink);
				payload.append('workDescription', this.workDescription);

				let headers = {
					headers: {
						Authorization: `JWT ${localStorage.getItem('token')}`
					}
				};

				axios.put('/api/v1/portfolio/add', payload, headers).then((response) => {
					console.log(response.data.message);
					this.success = true;
					this.successMsg = response.data.message;
					setTimeout(() => this.success = false, 1500);
					this.clear();
				}).catch((err) => {
					console.log(err.response.data.error);
					this.errors = [err.response.data.error || err.response.data.message];
				});

				this.workImage = '';
			},
			workImageChange(event){
				if(event.target.files && event.target.files.length){
					this.workImage = event.target.files[0];
				}
			},
			clear(){
				this.workName = '';
				this.workLink = '';
				this.workDescription = '';
			}
		}
	}
</script>

<style>

</style>