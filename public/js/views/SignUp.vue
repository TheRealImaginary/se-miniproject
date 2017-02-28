<!--suppress HtmlUnknownTarget -->
<template>
	<div class="row">
        <div class="col-md-6 col-md-offset-3">
            <h3 class="text-center">Sign Up</h3>
            <div v-show="errors.length > 0">
                <h3 class="text-center">Please Fix The Following Errors</h3>
                <div v-text="errors[0]" class="alert alert-danger"></div>
            </div>
            <div v-show="signedUp">
                <h3 v-text="signUpMessage" class="text-center alert alert-success"></h3>
            </div>
            <form @submit.prevent="onSubmit">
                <label class="control-label" for="name">Name</label>
                <div class="form-group">
                    <input v-model="name" type="text" name="name" class="form-control">
                </div>
                <label class="control-label" for="email">Email</label>
                <div class="form-group">
                    <input v-model="email" type="text" name="email" class="form-control" required>
                </div>
                <label class="control-lavel" for="password">Password</label required>
                <div class="form-group">
                    <input v-model="password" type="password" name="password" class="form-control">
                </div>
                <label class="control-label" for="guc_id">GUC ID</label>
                <div class="form-group">
                    <input v-model="guc_id" type="text" name="guc_id" class="form-control">
                </div>
                <div class="form-group text-center">
                    <button type="submit" class="btn btn-primary">Sign Up</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
	export default {
        data(){
            return {
                name: '',
                email: '',
                password: '',
                guc_id: '',
                signedUp: false,
                signUpMessage: '',
                errors: []
            }
        },
        methods: {
            onSubmit() {
                this.signUpMessage = '';
                this.signedUp = '';
                this.errors = [];
                axios.post('http://localhost:8000/api/v1/auth/signup', {
                    email: this.email,
                    name: this.name,
                    password: this.password,
                    guc_id: this.guc_id
                }).then((response) => {
                    console.log(response.data);
                    this.signUpMessage = response.data.message;
                    this.signedUp = true;
                    setTimeout(() => {
                        this.$router.push('/login');
                    }, 1000);
                }).catch((err) => {
                    console.log(err.response.data.error);
                    this.errors = [err.response.data.error];
                });
            }
        }
	}
</script>

<style>

</style>