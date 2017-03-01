<template>
	<div>
		<div v-show="errors.length > 0">
                <h3 class="text-center">An Error Occured</h3>
                <div v-text="errors[0]" class="alert alert-danger"></div>
            </div>
		<portfolio-card v-for="p in portfolio" :image="p.creator.profilePic" :username="p.creator.name" :work1="p.work[0].name" :work2="p.work[1].name"></portfolio-card>

		<nav class="navbar-fixed-bottom text-center" aria-label="Portfolio Navigation">
	        <ul class="pagination">
	            <li v-for="p in Math.ceil(count)" :class="{active: p == page}"><a @click="queryPage">{{ p }}</a></li>
	        </ul>
    	</nav>
	</div>
</template>

<script>
	import Portfolio from '../components/Portfolio'
	export default {
		components: {
			'portfolio-card': Portfolio,
		},
		data() {
			return {
				portfolio: [],
				count: 0,
				page: 0,
				errors: []
			}
		},
		methods: {
			queryPage(event, page) {
				this.page = page;
				this.errors = [];
				axios.get(`http://localhost:8000/api/v1/portfolio/page/${event?event.target.innerHTML:page}`).then((response) => {
					alert('Done');
					this.count = response.data.count;
					this.portfolio = response.data.portfolios;
					console.log(response);
				}).catch((err) => {
					alert('Error');
					this.errors = [err.response.data.error];
					console.log(err.response);
				});
				console.log(this.portfolio);
			}
		},
		mounted() {
			this.queryPage(null, 1);
		}
	}
</script>

<style>
	.pagination {
	    margin: 30px !important;
	}
</style>