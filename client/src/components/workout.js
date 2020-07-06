import page from "//unpkg.com/page/page.mjs";

const getWorkouts = async () => {
    try{

        const response = await fetch('/api/workouts', {
            method: 'GET',
            mode: 'cors',
            credentials: 'same-origin'
        });

        const data = await response.json();
        console.log(data);    
        addWorkoutsToDom(data);

    } catch(e) {
        console.log(e);
        page.redirect("/login/1");
    }
}

const getProfile = async () => {
    const profile = await fetch ('/api/user/profile')
    const data = profile.json();
    console.log(data);
    return data;
}

const showProfile = async () => {
    const user = await getProfile();
    console.log('user on workoutpage', user);
    $('#app').append(`<div class="card" style="width: 18rem;"><ul class="list-group-flush"><li class="list-group-item">Name: ${user.name}</li>
    <li class="list-group-item">Age: ${user.age}</li>
    <li class="list-group-item">Weight: ${user.weight} kg</li>
    <li class="list-group-item">Height: ${user.height} cm</li></ul></div>`)
};


const addWorkoutsToDom = (workouts) => {

    $('#app').append(`<div id="cardDiv" style="display:flex; flex-wrap:wrap; justify-content:center;"></div>`)

    workouts.forEach((workout) => {
        const ul = $('<div class="card" style="width: 18rem;"><ul class="list-group list-group-flush"></ul></div>');
        const li = $(`<div class="card" style="width: 18rem;"><li class="list-group-item"><h3>${workout.name}</h3></li></div>`);
        const btn = $(`<button class="btn btn-dark">edit</button>`).on('click', () => {
            page.redirect(`/editworkout/${workout._id}`);
        });
        li.append(btn);

        const exerciseWorkout = $('<div class="card" style="width: 18rem;"><ul class="list-group list-group-flush"></ul><div>');
        workout.exercises.forEach((exercise) => {
            exerciseWorkout.append(`<div class="card" style="width: 18rem;"><li class="list-group-item">${exercise.name}</li></div>`);
        });

        li.append(exerciseWorkout); 
        ul.append(li);
        $("#cardDiv").append(ul);
    });


}

const workout = (ctx, next) => {
    showProfile();

    $('#app').append(`<h1>build your own workout</h1>`);
    $('#app').append(`<div class="container" id="workoutbuttons"><a type="button" class="btn btn-info" href="/editProfile"> Edit Profile </a>
    <a type="button" class="btn btn-info" href="/addWorkout"> Create new workout </a>
    <a type="button" class="btn btn-info" href="/addExercises"> Create new exercise </a></div>
    `);

    getWorkouts();

}

export default workout;