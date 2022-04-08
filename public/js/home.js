function loginPageHandler (event) {
  document.getElementById('login_container').style.display = 'flex'
}
function closeButtonHandler (event) {
  document.getElementById('login_container').style.display = 'none'
}
function signUpHandler (event) {
  document.getElementById('login_container').innerHTML = `
  <div class="container_login">
  <div class="screen">
    <div class="screen__content">
      <a href="#" class="close" onclick="closeButtonHandler()"></a>
      <form class="login__" style="padding-top:70px;">
        <div class="login__field">
          <i class="login__icon fas fa-user"></i>
          <input type="text" class="login__input" placeholder="Full Name" />
        </div>
        <div class="login__field">
          <i class="login__icon fas fa-user"></i>
          <input type="text" class="login__input" placeholder="Email" />
        </div>
        <div class="login__field">
          <i class="login__icon fas fa-user"></i>
          <input type="text" class="login__input" placeholder="Create Username" />
        </div>
        <div class="login__field">
          <i class="login__icon fas fa-lock"></i>
          <input
            type="password"
            class="login__input"
            placeholder="Create Password"
          />
        </div>
        <button class="button login__submit">
          <span class="button__text">Sign Up</span>
          <i class="button__icon fas fa-chevron-right"></i>
        </button>
      </form>
    </div>
    <div class="screen__background">
      <span class="screen__background__shape screen__background__shape4"></span>
      <span class="screen__background__shape screen__background__shape3"></span>
      <span class="screen__background__shape screen__background__shape2"></span>
      <span class="screen__background__shape screen__background__shape1"></span>
    </div>
  </div>
</div>
    `
}



//validations for login page;



//validations for SignUp page;