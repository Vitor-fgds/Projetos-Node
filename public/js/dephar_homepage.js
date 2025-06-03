const searchInput = document.querySelector("#searchInput");
const searchButton = document.querySelector(".search-button");
const containerPrincipio = document.querySelector(".results-grid");
const resultados = document.querySelector(".results-section");

const goHome = () => {
    window.location.href = "/dephar";
};

const pesquisaPrincipios = async (event) => {
    event.preventDefault()
    const name = searchInput.value.trim();
    try{
    const pesquisa = await axios.get(`http://localhost:3000/api/v1/dephar/?nome=${name}`);
    const principios = pesquisa.data.principio;
    containerPrincipio.innerHTML = "";
    if(principios.length === 0){
        principioNaoEncontrado();
        return;
    }
    principios.forEach((principio) => {
        buscaPrincipios(principio);
    })
}catch(error){
    erroBusca(error);
}
searchInput.value = "";
}

const principioNaoEncontrado = () => {
    containerPrincipio.innerHTML = "";
    const erro = document.createElement("div");
   erro.classList.add("error-message");
   const mensagemErro = document.createElement("h3");
   mensagemErro.classList.add("error-message");
   mensagemErro.textContent = "Nenhum príncipio ativo foi encontrado...";
   erro.appendChild(mensagemErro);
   containerPrincipio.appendChild(erro);
    return;
}

const buscaPrincipios = (principio) => {
    const divPrincipio = document.createElement("div");
   divPrincipio.classList.add("principle-card");
   const nomePrincipio = document.createElement("h3");
   nomePrincipio.innerText = principio.nome;
   nomePrincipio.classList.add("principle-name");
   const descricaoPrincipio = document.createElement("p");
   descricaoPrincipio.classList.add("principle-description");
   descricaoPrincipio.innerText = principio.descricao
   divPrincipio.appendChild(nomePrincipio);
   divPrincipio.appendChild(descricaoPrincipio);

    divPrincipio.addEventListener("click", () => {
        window.open(`/dephar/principio?id=${principio._id}`, "_blank")
    })

    containerPrincipio.appendChild(divPrincipio)
}

const erroBusca = (error) => {
     containerPrincipio.innerHTML = "";
    console.error("Erro na busca!", error);
    const erro = document.createElement("div");
   erro.classList.add("error-message");
   const mensagemErro = document.createElement("h3");
   mensagemErro.classList.add("error-message");
   mensagemErro.textContent = "Ocorreu erro na busca!";
   erro.appendChild(mensagemErro);
   containerPrincipio.appendChild(erro);
}

const start = async () => {
try{
const pesquisaInicial = await axios.get("http://localhost:3000/api/v1/dephar");
const principios = pesquisaInicial.data.principio // Pego os dados da response do get

if(principios.length === 0){
   principioNaoEncontrado();
    return;
}

principios.forEach((principio) => {
   buscaPrincipios(principio);
})
} catch(error){
    erroBusca(error);
}
}

start()

searchButton.addEventListener("click", pesquisaPrincipios);
searchInput.addEventListener("keypress", async (event)=> {
    if (event.key === "Enter"){
        pesquisaPrincipios(event);
    }
})


