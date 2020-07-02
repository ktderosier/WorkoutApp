import page from "//unpkg.com/page/page.mjs";
import login from "./login.js";

const logoutHandler = async () => {
  try {
    const response = await fetch("/api/user/logout", {});
  } catch (e) {
    console.log(e);
  }
};

const logout = (ctx, next) => {
  logoutHandler();

  $("#app").append(`   
  <h1>You've logged out</h1>
        `);
    login();
};

export default logout;
