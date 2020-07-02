const nav = (ctx, next) => {
    $('#app').empty();
    $("#app").append(`<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="/home">Home</a>
        </li>
        <li class="nav-item">
        <a class="nav-link" href="/workout">Profile</a>
      </li>
      <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Account</a>
      <div class="dropdown-menu">
        <a class="dropdown-item" href="/login">Login</a>
        <a class="dropdown-item" href="/signup" name="createAccount">Create account</a>
        <div class="dropdown-divider"></div>
        <a class="dropdown-item" id="logoutbutton" href="/logout">Log out</a>
      </div>
    </li>
      </ul>
    </div>
  </nav>`);

  next(); // move onto next middleware
}

export default nav;