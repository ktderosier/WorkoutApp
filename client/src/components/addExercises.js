import page from "//unpkg.com/page/page.mjs";

const submitHandler = async (addExercises) => {

    try{

        const response = await fetch('/api/exercises/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'                
              },
            body: JSON.stringify(newExercise)
        });
        const data = await response.json();
        console.log(data);

    } catch(e) {
        console.log(e);
    }

};
const addExercises = async (ctx, next) => {
    const id = ctx.params.id; //id from URL paramater
    $('#app').append(`<h2> Add workout </h2>
    
    <form id="exercise">
  <div class="form-group">
    <label for="exampleInputEmail1">Name</label>
    <input type="text" class="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter name">
  </div>

  <button type="submit" class="btn btn-dark">Create new exercise</button>
</form>
    `)

    $("#exercise").submit(async (e) => {
        e.preventDefault();

        const newWorkout = {
                name: $("#name").val()
        };

        console.log(newExercise);
        await submitHandler(newExercise);
        
        
    });

}



export default addExercises;