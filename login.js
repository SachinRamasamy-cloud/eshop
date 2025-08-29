class landing {
    constructor() {
        this.database = JSON.parse(localStorage.getItem("database")) || {};
    }
    getdata() {
        console.log(this.database);
    }
    savedata() {
        localStorage.setItem("database", JSON.stringify(this.database));
    }
    register() {
        const regnm = document.getElementById("regnm");
        const regpw = document.getElementById("regpw");
        const regem = document.getElementById("regem");
        if (regnm.value == "" || regem.value == "" || regpw.value == "") {
            alert("The Field Are Empty please fill the blank area")
        } else {
            if (regnm.value in this.database) {
                alert("User name already taken!!!")
            } else {
                this.database[regnm.value] = {
                    usernm: regnm.value,
                    passwrd: regpw.value,
                    email: regem.value
                }
                this.savedata();
                alert("REgistraion compleated now login to your accoount")
                login1();
            }
        }
    }
    login() {
        const loginur = document.getElementById("loginm");
        const loginpw = document.getElementById("loginpw");
        this.getdata();
        if (loginur.value == "" || loginpw.value == "") {
            alert("Please Fill the blank area");
        } else {
            if (loginur.value in this.database) {
                if (this.database[loginur.value].passwrd == loginpw.value) {
                    alert("login Successfull");
                    localStorage.setItem("log", loginur.value);
                    window.location = "index.html"
                } else {
                    alert("fail")
                }
            } else {
                alert("Account not found")
            }
        }
    }
}

const obj = new landing();

// Event delegation for dynamically injected buttons
document.addEventListener("click", function(e) {
    if (e.target && e.target.id === "loginbtn") { // <— was "logbtn"
        e.preventDefault();
        obj.login();
    }
    if (e.target && e.target.id === "regbtn") {
        e.preventDefault();
        obj.register();
    }
});