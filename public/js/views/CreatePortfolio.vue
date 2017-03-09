<template>
	<div class="row">
        <div class="col-md-6 col-md-offset-3">
            <h3 class="text-center">Create Portfolio</h3>

            <div v-show="errors.length > 0">
                <h3 class="text-center">The Following Error(s) Occurred</h3>
                <div v-text="errors[0]" class="alert alert-danger"></div>
            </div>

            <div v-show="created">
                <h3 v-text="createdMsg" class="text-center alert alert-success"></h3>
            </div>

            <form @submit.prevent="onSubmit">
                <label class="control-label" for="portfolioImage">Portfolio Cover</label>
                <div class="form-group">
                    <input @change="changePortfolioPicture" type="file" name="portfolioImage" accept="image/*">
                </div>
                <div class="form-group text-center">
                    <button type="submit" class="btn btn-primary">Create Portfolio</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                portfolioPicture: '',
                errors: [],
                created: false,
                createdMsg: ''
            }
        },
        methods: {
            onSubmit() {
                this.created = false;
                this.errors = [];
                this.createdMsg = '';
                let payload = new FormData();
                payload.append('portfolioImage', this.portfolioPicture);
                let headers = {
                    headers: {
                        Authorization: `JWT ${localStorage.getItem('token')}`
                    }
                };
                axios.post('/api/v1/portfolio/new', payload, headers).then((response) => {
                    this.created = true;
                    this.createdMsg = response.data.message;
                    setTimeout(() => this.created = false, 1500);
                }).catch((err) => {
                    this.errors = [err.response.data.error || err.response.data.message];
                });
            },
            changePortfolioPicture(event) {
                if (event.target.files && event.target.files.length > 0) {
                    this.portfolioPicture = event.target.files[0];
                }
            }
        }
    }
</script>

<style>

</style>