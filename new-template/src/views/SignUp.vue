<template>
  <h2 class="fw-bold text-secondary">Sign up</h2>
  <!-- Sing Up form -->
  <form action="" method="" class="text-secondary">
    <!-- User Name -->
    <div class="form-group text-start py-2">
      <label for="Name">User Name</label>
      <input
        type="text"
        class="form-control shadow"
        placeholder="Enter UserName"
        required
      />
    </div>
    <!-- User ID -->
    <div class="form-group text-start py-2">
      <label for="Name">User ID</label>
      <input
        type="text"
        class="form-control shadow"
        placeholder="Enter UserID"
        required
      />
    </div>
    <!-- Password -->
    <div class="form-group text-start py-2">
      <label for="password">Password</label>
      <input
        type="password"
        class="form-control shadow"
        placeholder="Password"
        required
      />
    </div>
    <!-- Email Address -->
    <div class="form-group text-start py-2">
      <label for="email">Email adress</label>
      <input
        type="email"
        class="form-control shadow"
        placeholder="Enter Email"
        required
      />
    </div>
    <!-- Privacy Policy -->
    <div class="form-check text-start py-2">
      <input
        class="form-check-input"
        type="checkbox"
        value=""
        id="flexCheckIndeterminate"
      />
      <label class="form-check-label pointer" for="flexCheckIndeterminate">
        I agree with the
        <a href="#" class="text-decoration-none"
          ><span class="text-pink">Privacy Policy</span>
        </a>
      </label>
    </div>
    <!-- Submit -->
    <button class="btn btn-primary shadow mb-4 px-3">Create Account</button>
  </form>
</template>

<script>
export default {
  name: "SignUp",
};
</script>

<style scoped>
.text-pink {
  color: #ec65a6;
}
.pointer {
  cursor: pointer;
}
</style>
