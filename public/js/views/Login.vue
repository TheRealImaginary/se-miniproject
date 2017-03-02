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
                <label class="control-label" for="email">GUC Email</label>
                <div class="form-group">
                    <input v-model="email" type="email" name="email" class="form-control" placeholder="feitan@student.guc.edu.eg" required>
                </div>
                <label class="control-lavel" for="password">Password</label>
                <div class="form-group">
                    <input v-model="password" type="password" name="password" class="form-control" placeholder="******" required>
                </div>
                <div class="form-group text-center">
                    <button type="submit" class="btn btn-primary">Login</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import auth from '../helpers/auth'
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
                auth.login({
                    email: this.email,
                    password: this.password
                }, (err, response) => {
                    console.log(2222, this);
                    if (err) {
                        console.log(1, err);
                        this.errors = [err.response.data.error];
                        return console.log(err.response.data);
                    }
                    this.loggedIn = true;
                    this.loggedInMessage = response.message;
                    setTimeout(() => {
                        this.$router.push('/home');
                    }, 800);
                });
            }
        }
	}
</script>

<style>

</style>