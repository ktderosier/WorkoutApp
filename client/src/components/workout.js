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
    $('#app').append(`<ul class="list-group-flush"><li class="list-group-item">Name: ${user.name}</li>
    <li class="list-group-item">Age: ${user.age}</li>
    <li class="list-group-item">Weight: ${user.weight} kg</li>
    <li class="list-group-item">Height: ${user.height} cm</li></ul>`)
};


const addWorkoutsToDom = (workouts) => {
    

    workouts.forEach((workout) => {
        const ul = $('<ul class="list-group"></ul>');
        const li = $(`<li class="list-group-item">${workout.name}</li>`);
        const btn = $(`<button class="btn btn-dark">edit</button>`).on('click', () => {
            page.redirect(`/editworkout/${workout._id}`);
        });
        ul.prepend(btn);

        const exerciseWorkout = $('<ul></ul>');
        workout.exercises.forEach((exercise) => {
            exerciseWorkout.append(`<li>${exercise.name}</li>`);
        });

        li.append(exerciseWorkout); 
        ul.append(li);
        $("#app").append(ul);
    });


}

const workout = (ctx, next) => {

    $('#app').append(`<h1>Stats</h1>`);
    $('#app').append(`<div class="container"><a type="button" class="btn btn-info" href="/editProfile"> Edit Profile </a>
    <a type="button" class="btn btn-info" href="/addWorkout"> Add new workout </a>
    <a type="button" class="btn btn-info" href="/addExercises"> Add new exercise </a></div>`);

    getWorkouts();
    


}
showProfile();

export default workout;