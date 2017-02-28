<template>
	<div class="row">
        <div class="col-md-6 col-md-offset-3">
            <h3 class="text-center">Login</h3>
            <div v-show="errors.length > 0">
                <h3 class="text-center">Please Fix The Following Errors</h3>
                <div v-text="errors[0]" class="alert alert-danger"></div>
            </div>
            <div v-show="loggedIn">
                <h3 v-text="loggedInMessage" class="alert alert-success text-center"></h3>
            </div>
            <form @submit.prevent="onSubmit">
                <label class="control-label" for="email">Email</label>
                <div class="form-group">
                    <input v-model="email" type="email" name="email" class="form-control" required>
                </div>
                <label class="control-lavel" for="password">Password</label>
                <div class="form-group">
                    <input v-model="password" type="password" name="password" class="form-control" required>
                </div>
                <div class="form-group text-center">
                    <button type="submit" class="btn btn-primary">Login</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
	export default {
        data(){
            return {
                email: '',
                password: '',
                loggedIn: false,
                loggedInMessage: '',
                errors: []
            }
        },
        methods: {
            onSubmit(){
                this.loggedIn = false;
                this.loggedInMessage = '';
                this.errors = [];
                axios.post('http://localhost:8000/api/v1/auth/login', {
                    email: this.email,
                    password: this.password
                }).then((response) => {
                    console.log(response.data);
                    this.loggedInMessage = response.data.message;
                    this.loggedIn = true;
                }).catch((err) => {
                    console.log(err.response.data);
                    this.errors = [err.response.data.error];
                });
            }
        }
	}
</script>

<style>

</style>