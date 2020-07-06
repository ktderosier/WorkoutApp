import page from "//unpkg.com/page/page.mjs";

const submitHandler = async (addExercises) => {

    try{

        const response = await fetch('/api/exercises/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'                
              },
            body: JSON.stringify(addExercises)
        });
        const data = await response.json();
        console.log(data);

    } catch(e) {
        console.log(e);
    }

};
const addExercises = async (ctx, next) => {
    const id = ctx.params.id; //id from URL paramater
    $('#app').append(`<h2> Create an exercise </h2>
    
    <form id="exercise">
  <div class="form-group">
    <label for="exampleInputEmail1">Exercise name</label>
    <input type="text" class="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter exercise name">
  </div>
  <div class="form-group">
  <label for="exampleInputEmail1">Muscle Group</label>
  <input type="text" class="form-control" id="muscleType" aria-describedby="emailHelp" placeholder="Enter muscle group">
  </div>
  <div class="form-group">
  <label for="exampleInputEmail1">Description</label>
  <input type="text" class="form-control" id="description" aria-describedby="emailHelp" placeholder="Enter a description">
  </div>

  <button type="submit" id="newExerciseButton" class="btn btn-dark">Create new exercise</button>
</form>
    `)

    $("#exercise").submit(async (e) => {
        e.preventDefault();

        const newExercise = {
                name: $("#name").val(),
                muscleType: $("#muscleType").val(),
                description: $("#description").val()
        };

        $("form").trigger("reset");

        console.log(newExercise);
        await submitHandler(newExercise);


        
    });

}



export default addExercises;