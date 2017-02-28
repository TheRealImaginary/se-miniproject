<template>
	<div class="row">
        <div class="col-md-6 col-md-offset-3">
            <h3 class="text-center">Add Work</h3>
            <form action="" method="">
                <label class="control-label" for="workName">Work Name</label>
                <div class="form-group">
                    <input type="text" name="workName" class="form-control">
                </div>
                <label class="control-lavel" for="workLink">Work Link</label>
                <div class="form-group">
                    <input type="password" name="workLink" class="form-control">
                </div>
                <label class="control-label" for="workDescription">Work Description</label>
                <div class="form-group">
                    <input type="text" name="workDescription" class="form-control">
                </div>
                <label class="control-label" for="workImage">Screen Shot</label>
                <div class="form-group">
                    <input type="file" name="workImage" accept="image/*">
                </div>
                <div class="form-group text-center">
                    <button type="submit" class="btn btn-primary">Add Work</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
	export default {

	}
</script>

<style>

</style>