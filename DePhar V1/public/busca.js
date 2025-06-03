const formularioBusca = document.querySelector(".buscador")
const searchInput = document.querySelector(".principios-input")
const containersPrincipios = document.querySelector(".containers-principios")
const botaoSearch = document.querySelector(".submit-btn")

const start = async () => {
try{
const pesquisaInicial = await axios.get("http://localhost:3000/api/v1/dephar");
const principios = pesquisaInicial.data.principio // Pego os dados da response do get
if(principios.length === 0){
    containersPrincipios.innerHTML = "<h4>Nenhum princípio ativo encontrado!></h4>"
    return;
}

principios.forEach((principio) => {
    const divPrincipio = document.createElement("div");
    divPrincipio.classList.add("principio")
    divPrincipio.innerText = principio.nome
    divPrincipio.addEventListener("click", () => {
        window.open(`principio.html?id=${principio._id}`, "_blank")
    })
    containersPrincipios.appendChild(divPrincipio)
})
} catch(error){
    console.error("Erro na busca!", error);
    containersPrincipios.innerHTML = "<h4> Erro ao buscar dados!</h4>"
}
}

start()

botaoSearch.addEventListener("click", async (event) => {
    event.preventDefault()
    const name = searchInput.value.trim();
    try{
    const pesquisa = await axios.get(`http://localhost:3000/api/v1/dephar/?nome=${name}`)
    const principios = pesquisa.data.principio;
    containersPrincipios.innerHTML = ""
    if(principios.length === 0){
        containersPrincipios.innerHTML = "<h4>Nenhum princípio ativo encontrado!></h4>"
        return;
    }

    principios.forEach((principio) => {
        const divPrincipio = document.createElement("div");
        divPrincipio.classList.add("principio")
        divPrincipio.innerText = principio.nome
        divPrincipio.addEventListener("click", () => {
            window.open(`principio.html?id=${principio._id}`, "_blank")
        })
        containersPrincipios.appendChild(divPrincipio)
    })
    } catch(error){
        console.error("Erro na busca!", error);
        containersPrincipios.innerHTML = "<h4> Erro ao buscar dados!</h4>"
    }
    }
)

