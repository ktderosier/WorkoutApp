import page from "//unpkg.com/page/page.mjs";

page.configure({ window: window }); // bind to main window

//components
import nav from "./components/nav.js";
import login from "./components/login.js";
import signup from "./components/signup.js";
import workout from "./components/workout.js";
import logout from "./components/logout.js";
import editProfile from "./components/editProfile.js";
import editWorkout from "./components/editWorkout.js";
import addWorkout from "./components/addWorkout.js";
import addExercises from "./components/addExercises.js";

const showPages = () => {
  //routes

  page("/", () => {
    page.redirect("/home");
  });
  page("/home", nav, () => {
    $("#app").append(`<div id="headers"><h1>BYOW</h1>
        <h5>build your own workout</h5></div>

<div class ="col">
<div class="list-group">
  <a href="#" class="list-group-item list-group-item-action defaultExercises" id="barbell">Barbell squats</a>
  <a href="#" class="list-group-item list-group-item-action defaultExercises" id="bicep">Bicep curls</a>
  <a href="#" class="list-group-item list-group-item-action defaultExercises" id="revLunge">Reverse lunges</a>
  <a href="#" class="list-group-item list-group-item-action defaultExercises" id="deadlift">Deadlifts</a>
</div>
</div>
<h6><b>Ready to save your first workout? <br> <a href="/signup" id="signUpLink"> Sign up here</a></b></h6>


<ul id="exercises"></ul>


        
        `);
        pushExercises();
  });
  page("/login", nav, login);

  page("/signup", nav, signup);

  page("/workout", nav, workout);

  page("/logout", nav, logout);

  page("/editProfile", nav, editProfile);

  page('/editworkout/:id', nav, editWorkout);

  page('/addWorkout', nav, addWorkout);

  page('/addExercises', nav, addExercises);


  page({ hashbang: true });
};

const pushExercises = ((list) => {
    const exercises = "";

    const e1 = $('.defaultExercises').on("click", (e) => {
        console.log(e)
        e.preventDefault();

         const removeButton = $(`<button>X</button>`).on("click", (e) => {
             e.preventDefault();
             console.log(e);
            $(e.target).parent().remove();
         })

        $('#exercises').append($(`
        <div class="row">
        <div class="col-4">
        <div class="list-group" id="list-tab" role="tablist"> 
        <a class="list-group-item list-group-item-action" id="list-${e.target.text}-list" data-toggle="list" href="#list-${e.target.text}" role="tab" aria-controls="${e.target.text}">${e.target.text}</a>
        </div>
        </div>

        <div class="col-8">
        <div class="tab-content" id="nav-tabContent">
          <div class="tab-pane fade show active" id="list-${e.target.text}" role="tabpanel" aria-labelledby="list-${e.target.text}-list">...</div>
          </div>
          </div>
        </div>

        `).append(removeButton))
    });

})



$(() => {
  showPages();
});
