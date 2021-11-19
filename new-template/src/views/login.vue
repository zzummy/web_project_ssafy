<template>
    <h2 class="fw-bold text-secondary">Sign in</h2>
    <!-- Sing in form -->
    <form action="" method="" class="text-secondary">
        <!-- Email Address -->
        <div class="form-group text-start py-2">
            <label for="email">ID</label>
            <input type="email" class="form-control shadow" placeholder="Enter Email" required>
        </div>
        <!-- Password -->
        <div class="form-group text-start py-2">
            <label for="password">Password</label>
            <input type="password" class="form-control shadow" placeholder="Password" required>
        </div>
        <!-- Remember this section or device -->
        <div class="form-check text-start py-2">
            <input class="form-check-input " type="checkbox" value="" id="flexCheckIndeterminate">
            <label class="form-check-label pointer" for="flexCheckIndeterminate">
                Remember ID
            </label>
        </div>
        <!-- Submit -->
        <button class="btn btn-primary shadow mb-4 px-3 ">Login</button>
    </form>
</template>

<script>
    export default {
        name:'login'
    }
</script>

<style >
.pointer{
    cursor: pointer;
}
</style>
