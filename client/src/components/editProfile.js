import page from "//unpkg.com/page/page.mjs";

const submitHandler = async (formData) => {

    try{

        const response = await fetch('/api/user/profile/update', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'                
              },
            body: JSON.stringify(formData)
        });
        page.redirect('/workout');

    } catch(e) {
        console.log(e);
    }

};

const getProfile = async () => {
    const profile = await fetch ('/api/user/profile')
    const data = profile.json();
    console.log(data);
    return data;
}

const editProfile = async () => {
    const user = await getProfile();
    console.log('user', user);
    $('#app').append(`<h2> Edit profile </h2>
    
    <form id="profile">
  <div class="form-group">
    <label for="exampleInputEmail1">Name</label>
    <input type="text" class="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter name" value="${user.name}">
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Age</label>
    <input type="text" class="form-control" id="age" placeholder="Age">
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Weight</label>
    <input type="text" class="form-control" id="weight" placeholder="Weight">
  </div>
  <div class="form-group">
  <label for="exampleInputPassword1">Height</label>
  <input type="text" class="form-control" id="height" placeholder="Height">
</div>

  <button type="submit" class="btn btn-secondary">Save profile</button>
</form>
    `)

    $("#profile").submit(async (e) => {
        e.preventDefault();

        const formData = {
            profile:{
                name: $("#name").val(),
                age: $("#age").val(),
                weight: $("#weight").val(),
                height: $("#height").val()
            }
        };

        console.log(formData);
        await submitHandler(formData);
        
    });

}


export default editProfile;