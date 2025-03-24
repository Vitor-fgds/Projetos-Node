
const jobsList = document.querySelector(".jobs");
const token = localStorage.getItem("token");
const searchButton = document.querySelector(".search-button");
const searchInput = document.querySelector(".search-input");

if (!token) {
    window.location.replace("http://localhost:3000/jobs/login");
}

// Função para exibir os trabalhos na tela
const displayJobs = (jobs) => {
    jobsList.innerHTML = "";  // Limpa a lista de trabalhos antes de exibir os novos
    jobs.forEach(job => {
        const div = document.createElement("div");
        div.classList.add("job");
        const h3 = document.createElement("h3");
        h3.innerText = job.company;
        const h2 = document.createElement("h2");
        h2.innerText = job.position;
        const buttonsDiv = document.createElement("div");
        const update = document.createElement("button");
        update.innerText = "Update";
        update.classList.add("update");
        update.dataset.id = job._id;
        const erase = document.createElement("button");
        erase.innerText = "Delete";
        erase.classList.add("delete");
        erase.dataset.id = job._id;
        div.appendChild(h3);
        div.appendChild(h2);
        buttonsDiv.appendChild(update);
        buttonsDiv.appendChild(erase);
        div.appendChild(buttonsDiv);
        jobsList.appendChild(div);
    });
};

const displayError = (mensagem) => {
    jobsList.innerHTML = "";
    const div = document.createElement("div");
    div.classList.add("job");
    const h3 = document.createElement("h3");
    h3.innerText = mensagem;
    div.appendChild(h3);
    jobsList.appendChild(div);
}

// Função para buscar os trabalhos da API
const start = async () => {
    try {
        const response = await axios.get("http://localhost:3000/api/v1/jobs", {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        const jobs = response.data.jobs;
        displayJobs(jobs);
    } catch (error) {
        displayError("Ocorreu um erro, tente novamente!");
    }
};

// Inicializa a página com todos os trabalhos
start();

// Função de busca por nome de trabalho
searchButton.addEventListener("click", async (event) => {
    event.preventDefault();
    const searchQuery = searchInput.value.trim();
    if (!searchQuery) {
        start();
    }

    try {
        const response = await axios.get(`http://localhost:3000/api/v1/jobs/name/${searchQuery}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        // Verifica se algum trabalho foi encontrado
        if (response.data.job) {
            const job = response.data.job;
            displayJobs([job]);  // Passa o trabalho encontrado para a função displayJobs
        } else {
            displayError("Não foram encontrados trabalhos com esse nome!");
        }
    } catch (error) {
        displayError("Ocorreu um erro, tente novamente!");
        console.error(error);  // Para depuração
    }
});


document.addEventListener("click", async (event) => {
    const button = event.target;
    console.log(button)

    if(button.classList.contains("delete")) {
        const jobId = button.dataset.id;
        try {
            const response = await axios.delete(`http://localhost:3000/api/v1/jobs/${jobId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            button.closest(".job").remove();
        } catch (error) {
            console.error("Erro ao deletar o trabalho", error);
        }
    }
})

document.addEventListener("click", async (event) => {
    const button = event.target;
    console.log(button)

    if(button.classList.contains("update")) {
        const jobId = button.dataset.id;
        window.location.replace(`http://localhost:3000/job/update/${jobId}`);
    }
})

