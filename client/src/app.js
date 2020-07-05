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

const presetExerciseDescriptions = [
  {
    name: "barbellSquats",
    displayName: "Barbell Squats",
    muscleType: "glutes",
    description:
      "The press, overhead press or shoulder press is a weight training exercise with many variations,typically performed while standing, in which a weight is pressed straight upwards from racking position until the arms are locked out overhead, while the legs, lower back and abs maintain balance.",
  },
  {
    name: "bicepCurls",
    displayName: "Bicep curls",
    muscleType: "biceps",
    description:
      "Stand holding a dumbbell in each hand with your arms hanging by your sides. Ensure your elbows are close to your torso and your palms facing forward. Keeping your upper arms stationary, exhale as you curl the weights up to shoulder level while contracting your biceps. Use a thumb-less grip, advises Edgley. Placing your thumb on the same side of the bar as your fingers increases peak contraction in the biceps at the top point of the movement. Hold the weight at shoulder height for a brief pause, then inhale as you slowly lower back to the start position.",
  },
  {
    name: "reverseLunge",
    displayName: "Reverse lunge",
    muscleType: "glutes",
    description:
      `Stand with feet hip-width apart, then step backwards with your right leg until your knees are at 90-degree angles -
      your right knee should be pointing towards the ground, your right knee should be in line with your toes. ... Push yourself forward to the start position and repeat with your left leg.`,
  },
  {
    name: "Deadlifts",
    displayName: "Deadlifts",
    muscleType: "glutes, hamstrings",
    description: `With your feet flat beneath the barbell, squat down and grasp it with your hands roughly shoulder-width apart.
  Keep your chest up, pull your shoulders back and look straight ahead rather than up or down.
  Lift the bar, keeping it close to your legs and focus on taking the weight back onto your heels (rather than your toes). Think about pulling the weight towards you on the way up. Lift to thigh level, pause, then return under control to the start position.
  Let the weight come to a complete rest between each rep. While it's on the floor, take a second or two to make sure your body is in the correct position – chest up, upper back tight and eyes looking forward – before lifting it up again.`,
  },
];

// console.log(presetExerciseDescriptions[0].name)



const showPages = () => {
  //routes

  page("/", () => {
    page.redirect("/home");
  });
  page("/home", nav, () => {
    $("#app").append(`<div id="headers"><h1>BYOW</h1>
        <h5>build your own workout</h5></div>

<div class ="col">
<div class="list-group" id="chooseExerciseList">
  

</div>
</div>
<h6><b>Ready to save your first workout? <br> <a href="/signup" id="signUpLink"> Sign up here</a></b></h6>


<ul id="exercises"></ul>
        
        `);
 
presetExerciseDescriptions.forEach((exercise, index)=>{
$("#chooseExerciseList").append(`<a href="#" class="list-group-item list-group-item-action defaultExercises" id="${exercise.name}" index="${index}">${exercise.displayName}</a>`)

// $(`#list-tab a`).on('click', (e) => {
//   e.preventDefault();
//   console.log('preset exercise descrip:', presetExerciseDescriptions[id].name)
//   // $(`#list-${presetExerciseDescriptions[id].name}`).tab('show')
// })

// $(`#list-tab a`).on('click', () => {
//   $(`#list-${presetExerciseDescriptions[id].name}`).toggle();
// })

})        

    pushExercises();
  });
  page("/login", nav, login);

  page("/login/:id", nav, login);

  page("/signup", nav, signup);

  page("/workout", nav, workout);

  page("/logout", nav, logout);

  page("/editProfile", nav, editProfile);

  page("/editworkout/:id", nav, editWorkout);

  page("/addWorkout", nav, addWorkout);

  page("/addExercises", nav, addExercises);

  page({ hashbang: true });
};



const pushExercises = (list) => {
  const exercises = "";

  const e1 = $(".defaultExercises").on("click", (e) => {
    console.log(e);
    e.preventDefault();

    const removeButton = $(`<div><button type="button" class="btn btn-dark">X</button></div>`).on("click", (e) => {
      e.preventDefault();
      console.log(e);
      $(e.target).parent().parent().remove();
    });

   const id = $(e.target).attr("index");
  //  console.log(presetExerciseDescriptions[id].description);

    $("#exercises").append(
      $(`
        <div class="row" id="homepageExercises">
        <div class="col-4">
        <div class="list-group" id="list-tab" role="tablist"> 
        <a class="list-group-item list-group-item-action" id="list-${presetExerciseDescriptions[id].name}-list" data-toggle="list" href="#list-${presetExerciseDescriptions[id].name}" role="tab" aria-controls="${presetExerciseDescriptions[id].name}">${presetExerciseDescriptions[id].displayName}</a>
        </div>
        </div>

        
        <div class="col-8">
        <div class="tab-content" id="nav-tabContent">
          <div class="tab-pane fade hide" id="list-${presetExerciseDescriptions[id].name}" role="tabpanel" aria-labelledby="list-${presetExerciseDescriptions[id].name}-list">${presetExerciseDescriptions[id].description}</div>
          </div>
          </div>
        </div>

        `).prepend(removeButton)

    );
    
  });




};

$(() => {
  showPages();
});
