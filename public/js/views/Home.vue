<template>
	<div>
		<div v-show="errors.length > 0">
            <h3 class="text-center">An Error Occured</h3>
            <div v-text="errors[0]" class="alert alert-danger"></div>
        </div>
        <div v-if="count > 0" class="text-center">
			<portfolio-card v-for="p in portfolio" :image="p.thumbnail" :username="p.creator.name" :work1="getWork(p.work[0])" :work2="getWork(p.work[1])"></portfolio-card>
		</div>
		<div v-else class="text-center">
			<img src="misc/nothing_to_see_here.png">
		</div>
		<nav class="navbar-fixed-bottom text-center" aria-label="Portfolio Navigation">
	        <ul class="pagination">
	            <li v-for="p in Math.ceil(count/10)" :class="{active: p == page}"><a @click="queryPage">{{ p }}</a></li>
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
				this.page = event ? event.target.innerHTML : page;
				this.errors = [];
				axios.get(`http://localhost:8000/api/v1/portfolio/page/${event?event.target.innerHTML:page}`).then((response) => {
					this.count = response.data.count;
					this.portfolio = response.data.portfolios;
				}).catch((err) => {
					this.errors = [err.response.data.error || err.response.data.message];
				});
			},
			getWork(work) {
				return work ? work.name : '';
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