<template>

</template>

<script>
	export default {
		mounted(){
			axios.get('http://localhost:8000/api/v1/portfolio/page/1').then(function(response){
				alert('Done');
				console.log(response);
			}).catch((function(err){
				alert('Error');
				console.log(err);
			}));
		}
	}
</script>

<style>

</style>