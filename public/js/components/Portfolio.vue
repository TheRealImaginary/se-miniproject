<template>
	<div class="row">
        <div class="col-md-4 col-md-offset-4">
            <div class="thumbnail">
                <img :src="imageURL(image)" alt="Portfolio Image">
                <div class="caption">
                    <h3>{{ username }}</h3>
                    <ul>
                    	<li>{{ work1 }}</li>
                    	<li>{{ work2 }}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['image', 'username', 'work1', 'work2'],
        methods: {
            imageURL(image){
                return `portfolio/${image}`
            }
        }
    }
</script>

<style>

</style>