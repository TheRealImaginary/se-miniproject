<template>
	<nav class="navbar navbar-inverse">
        <div class="container-fluid">
            <div class="navbar-header">
                <a class="navbar-brand" href="#">
                    <img alt="Logo" src="">
                </a>
                </div>
                <ul class="nav navbar-nav pull-right">
                    <li><router-link to="/home">Home</router-link></li>
                    <li><router-link to="/login">Login</router-link></li>
                    <li><router-link to="/signup">Sign Up</router-link></li>
                    <li><router-link to="/profile">Profile</router-link></li>
                    <li><router-link to="/logout">Logout</router-link></li>
            </ul>
        </div>
    </nav>
</template>

<script>
 	export default {
 	}
</script>

<style>

</style>