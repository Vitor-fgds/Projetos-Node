
const registerForm = document.querySelector(".register");
const registerError = document.querySelector(".register-error");
const username = document.querySelector("#register-username");
const email = document.querySelector("#register-email");
const password = document.querySelector("#register-password");
registerForm.addEventListener("submit", async (event) => {

    // event.preventDefault();  // Previne o envio padrão do formulário
    event.preventDefault();
    try {
        const response = await axios.post("http://localhost:3000/api/v1/auth/register", {
            name: username.value.trim(),
            email: email.value.trim(),
            password: password.value.trim(),
        });

        console.log(response.data);  // Verifique a resposta do servidor

        // Redireciona para a página de sucesso após o registro
        window.location.replace("http://localhost:3000/jobs/register-succeeded");
    } catch (error) {
        console.error(error);  // Verifique o erro
        registerError.innerText = "Credenciais inválidas, tente novamente!";
        username.value = "";
        email.value = "";
        password.value = "";
    }
});