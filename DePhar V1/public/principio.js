const nomePrincipio = document.querySelector(".nome-principio")
const formulaQuimica = document.querySelector(".formula-quimica")
const pesoMolar = document.querySelector(".peso-molar")
const classeTerapeutica = document.querySelector(".classe-terapeutica")
const indicacoesTerapeuticas = document.querySelector(".indicacoes-terapeuticas")
const contraindicacoes = document.querySelector(".contraindicacoes")
const efeitosColaterais = document.querySelector(".efeitos-colaterais")
const classeFarmacologica = document.querySelector(".classe-farmacologica")

window.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if(id){
        try {
            const pesquisa = await axios.get(`http://localhost:3000/api/v1/dephar/${id}`);
            const principio = pesquisa.data.principio;
            nomePrincipio.innerText = principio.nome;
            formulaQuimica.innerText = principio.formula;
            pesoMolar.innerText = principio.pesoMolar;
            classeTerapeutica.innerText = principio.classeTerapeutica;
            indicacoesTerapeuticas.innerText = principio.indicacoesTerapeuticas.join(", ");
            contraindicacoes.innerText = principio.contraIndicacoes.join(", ")
            efeitosColaterais.innerText = principio.efeitosColaterais.join(", ")
            classeFarmacologica.innerText = principio.classeFarmacologica;
        } catch (error) {
            console.error("Erro ao buscar informações do princípio ativo:", error);
        }
    }
})

