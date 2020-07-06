import page from "//unpkg.com/page/page.mjs";

const getExercises = async () => {

    try{
        const response = await fetch('/api/exercises', {
            method: 'GET',
            mode: 'cors',
            credentials: 'same-origin'
        });

        const data = await response.json();
        console.log(data);    
        return data;

    } catch(e) {
        console.log(e);
        return [];
    }
}

const addItemToWorkout = async (exerciseID, workoutID) => {
    console.log(exerciseID);
    console.log(workoutID);

    try{
        const response = await fetch('/api/workouts/exercises/add', {
            method: 'POST',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'                
              },
            body: JSON.stringify({
                workoutID: workoutID,
                exerciseID: exerciseID
            })
        });

        const data = await response.json();
        console.log(data);
        console.log("update done");

    } catch(e) {
        console.log(e);
    }
}

const editWorkout = async (ctx, next) => {
    const id = ctx.params.id; //id from URL paramater
    const exercises = await getExercises();

    const exerciseWorkout = $('<ul class="list-group list-group-flush"></ul>');
    $('#app').append(`<div id="cardDiv" style="display:flex; flex-wrap:wrap; justify-content:center;"></div>`)

    exercises.forEach((exercise) => {
        const addBtn = $(`<div><button class="btn btn-secondary">add</button></div>`).on('click', () => {
            //add exercise to the workout
            addItemToWorkout(exercise._id, id);
        });

        exerciseWorkout.append($(`<div class="card" style="width: 18rem;"><li class="list-group-item">${exercise.name}</li></div>`).append(addBtn));
    });

    $("#cardDiv").append(exerciseWorkout);
    $("#cardDiv").append(`<a href="/workout"> <button type="button" class="btn btn-dark">Done</button></a>`);
}

export default editWorkout;