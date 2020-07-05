import page from "//unpkg.com/page/page.mjs";

const submitHandler = async (newWorkout) => {

    try{

        const response = await fetch('/api/workouts/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'                
              },
            body: JSON.stringify(newWorkout)
        });
        const data = await response.json();
        console.log(data);
        page.redirect(`/editWorkout/${data._id}`);

    } catch(e) {
        console.log(e);
    }

};
const addWorkout = async (ctx, next) => {
    const id = ctx.params.id; //id from URL paramater
    $('#app').append(`<h2>Create a workout </h2>
    
    <form id="workout">
  <div class="form-group">
    <label for="exampleInputEmail1">Workout name</label>
    <input type="text" class="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter workout name">
  </div>

  <button type="submit" class="btn btn-dark">Create new workout</button>
</form>
    `)

    $("#workout").submit(async (e) => {
        e.preventDefault();

        const newWorkout = {
                name: $("#name").val()
        };

        console.log(newWorkout);
        await submitHandler(newWorkout);
        page.redirect(`/editworkout/${data._id}`);
        
        
    });

}



export default addWorkout;