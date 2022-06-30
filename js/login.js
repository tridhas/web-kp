function validate() {
    var username = document.getElementById('username').value;
    var pass = document.getElementById('pass').value;

    if (username!="" && pass!="") {  

        var rootRef = firebase.database().ref().child("tb_admin"); 
        rootRef.once('value').then(function(snapshot) {

            var username1 = snapshot.child(username).child("username").val();
            var password1 = snapshot.child(username).child("password").val();

            if (username==username1)
            {   
                if(pass==password1)
                {
                    alert("Login Sukses!");
                    window.location = "home.html";
                }
                else{
                    alert("Password Salah!")
                }
            }
            else{
                alert("Akun tidak ditemukan!")
            }
        });

    }
    else {
        alert("Form tidak boleh kosong!");
    }
}

