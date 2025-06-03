const token = localStorage.getItem("token");
const taskId = document.querySelector(".id");
const taskPosition = document.querySelector("#task-position");
const taskCompany = document.querySelector("#task-company");
const updateForm = document.querySelector(".update-form");
const pathname = window.location.pathname;
const jobId = pathname.split("/").pop(); // Pega o último elemento da array formada pela divisão do pathname nas barras
window.addEventListener("DOMContentLoaded", async () => {
    const response = await axios.get(`http://localhost:3000/api/v1/jobs/${jobId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    const job = response.data.job;
    taskId.innerText = job._id;
    taskCompany.value = job.company;
    taskPosition.value = job.position;
})

updateForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
        const response = await axios.patch(`http://localhost:3000/api/v1/jobs/${jobId}`, {
            company: taskCompany.value.trim(),
            position: taskPosition.value.trim()
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        window.location.replace("http://localhost:3000/jobs")
    } catch (error) {
        console.error(error);
    }

})
