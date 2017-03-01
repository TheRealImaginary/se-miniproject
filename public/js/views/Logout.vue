<template>

</template>

<script>
	import auth from '../helpers/auth'
	export default {
		mounted(){
			auth.logOut();
			this.$router.push('/home');
		}
	}
</script>

<style>

</style>