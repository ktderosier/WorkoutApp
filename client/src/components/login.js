import page from "//unpkg.com/page/page.mjs";

const submitHandler = async (formData) => {

    try{

        const response = await fetch('/api/user/login', {
            method: 'POST',
            mode: 'cors',
            credentials: 'same-origin',
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

const login = (ctx, next) => {

    $('#app').append(`
    <form id="form-login">
        <div class="form-group">
            <label for="username">Username</label>
            <input type="text" class="form-control" id="username" 
                            placeholder="username..." name="username">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" 
                    id="password" name="password" placeholder="password...">
        </div>
        <button type="submit" class="btn btn-secondary">Log in</button>
    </form>
    `);


    $("#form-login").submit(async (e) => {
        e.preventDefault();

        const formData = {
            username: $("#username").val(),
            password: $("#password").val()
        };

        console.log(formData);
        await submitHandler(formData);
        
    });

}

export default login;