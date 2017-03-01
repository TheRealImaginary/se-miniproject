<template>
	<nav class="navbar navbar-inverse">
        <div class="container-fluid">
            <div class="navbar-header">
                <a class="navbar-brand" href="#">
                    <img alt="Logo" src="">
                </a>
            </div>
                <ul class="nav navbar-nav pull-right">
                    <li :class="{active: flags.home}"><router-link to="/home" @click.native="setFlag('home')">Home</router-link></li>
                    <li v-show="!user.authenticated" :class="{active: flags.login}"><router-link to="/login" @click.native="setFlag('login')">Login</router-link></li>
                    <li v-show="!user.authenticated" :class="{active: flags.signup}"><router-link to="/signup" @click.native="setFlag('signup')">Sign Up</router-link></li>
                    <li v-show="user.authenticated" :class="{active: flags.profile}"><router-link to="/profile" @click.native="setFlag('profile')">Profile</router-link></li>
                    <li v-show="user.authenticated" :class="{active: flags.logout}"><router-link to="/logout" @click.native="setFlag('logout')">Logout</router-link></li>
            	</ul>
        </div>
    </nav>
</template>

<script>
	import auth from '../helpers/auth'
 	export default {
 		data(){
 			return {
 				user: auth.user,
 				flags: {
 					home: false,
 					login: false,
 					signup: false,
 					profile: false,
 					logout: false
 				}
 			}
 		},
 		methods: {
 			setFlag(tab){
 				for(let key in this.flags){
 					this.flags[key] = false;
 				}
 				this.flags[tab] = true;
 			}
 		}
 	}
</script>

<style>

</style>