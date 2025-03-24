
const loginForm = document.querySelector(".login");
const loginEmail = document.querySelector("#login-email");
const loginPassword = document.querySelector("#login-password");
const loginButton = document.querySelector(".login-button");
const loginError = document.querySelector(".login-error");


loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
        const response = await axios.post("http://localhost:3000/api/v1/auth/login", {
            email: loginEmail.value,
            password: loginPassword.value,
        })
        const token = response.data.token;
        localStorage.setItem("token", token);
        window.location.replace("http://localhost:3000/jobs")
    } catch (error) {
        loginError.innerText = "Credenciais Inválidas, tente novamente!";
        loginEmail.value = "";
        loginPassword.value = "";
    }
})