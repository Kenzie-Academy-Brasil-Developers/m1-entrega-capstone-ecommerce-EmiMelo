const main = document.querySelector(".products-content")

function listaCards(array) {

    const ul = document.createElement("ul")
    ul.className = "ul"
    main.appendChild(ul)

    for (let i = 0; i < array.length; i++) {

        const li = document.createElement("li")
        const img = document.createElement("img")
        const div = document.createElement("div")
        const button = document.createElement("button")

        li.className = "product"
        img.className = "img-product"
        img.src = array[i].img
        div.className = "details"
        button.className = "btn-add"
        button.id = array[i].id
        button.innerText = "Adicionar ao carrinho"

        div.innerHTML = `
        <div class="category">${array[i].tag}</div>
         <h3>${array[i].nameItem}</h3> 
         <p>${array[i].description}</p> 
         <p class="price">${array[i].value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p> 
         `
        ul.appendChild(li)
        li.appendChild(img)
        li.appendChild(div)
        div.appendChild(button)

        criarEventos(array[i].id)
    }

    carrinhoVazio()
}
listaCards(data)

function criarEventos(id) {

    const btn = document.getElementById(id)
    btn.addEventListener("click", (event) => {
        selecionarProduto(id)
        totalCarrinho()
    })
}

function selecionarProduto(id) {

    for (let i = 0; i < data.length; i++) {

        if (data[i].id == id) {
            const produto = data[i]
            carrinhoDeCompras(produto)
        }
    }
}

let remover = "remover-"
let id = 1
let somaTotal = 0
let quantidadeItens = 0

function carrinhoDeCompras(produto) {

    const divVazio = document.querySelector(".carrinhoVazio")
    const ul = document.querySelector(".ul-carrinho")
    const ulT = document.querySelector(".ul-total")

    if (divVazio.style.display == "block") {
        divVazio.style.display = "none"
        ul.style.display = "flex"
        ulT.style.display = "flex"
    }

    const ulCarrinho = document.querySelector(".ul-carrinho")
    const liCarrinho = document.createElement("li")
    const imgCarrinho = document.createElement("img")
    const divDetails = document.createElement("div")
    const btnRemove = document.createElement("button")

    liCarrinho.className = "list-carrinho"
    liCarrinho.id = `item-${id}`
    imgCarrinho.className = "img-carrinho"
    imgCarrinho.src = produto.img
    divDetails.className = "details-carrinho"
    btnRemove.className = "btn-carrinho"
    btnRemove.id = remover + id
    btnRemove.innerText = "Remover produto"

    divDetails.innerHTML = `
        <h3 class="product-carrinho">${produto.nameItem}</h3> 
        <p class="price-carrinho">${produto.value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p> 
        `

    ulCarrinho.appendChild(liCarrinho)
    liCarrinho.appendChild(imgCarrinho)
    liCarrinho.appendChild(divDetails)
    divDetails.appendChild(btnRemove)

    id++
    somaTotal += produto.value
    quantidadeItens++
    eventRemove(btnRemove.id, produto.value)
}

function eventRemove(id, preco) {

    const btnRemove = document.getElementById(id)
    btnRemove.addEventListener("click", (event) => {

        removerProduto(id, preco)
    })
}

function removerProduto(idButton, preco) {

    for (let i = 1; i <= id; i++) {

        if (idButton == `remover-${i}`) {

            const li = document.getElementById(`item-${i}`)
            li.remove()

            quantidadeItens--
            somaTotal -= preco
            totalCarrinho()

            if (quantidadeItens == 0) {
                const divVazio = document.querySelector(".carrinhoVazio")
                const ul = document.querySelector(".ul-carrinho")
                const ulT = document.querySelector(".ul-total")
                divVazio.style.display = "block"
                ul.style.display = "none"
                ulT.style.display = "none"
            }
        }
    }
}

const ulTotal = document.querySelector(".ul-total")
const liQuantidade = document.createElement("li")
const liPreco = document.createElement("li")

ulTotal.className = "ul-total"
liQuantidade.className = "li-total"
liPreco.className = "li-total"
liQuantidade.innerHTML = `<h3 class="h3">Quantidade:</h3> <p class="p" id="quantidade">${quantidadeItens}</p>`
liPreco.innerHTML = `<h3 class="h3">Total:</h3> <p class="p" id="total">${somaTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>`

ulTotal.appendChild(liQuantidade)
ulTotal.appendChild(liPreco)

function totalCarrinho() {

    const quantidade = document.querySelector("#quantidade")
    const total = document.querySelector("#total")

    quantidade.innerText = quantidadeItens
    total.innerText = somaTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
}

function carrinhoVazio() {

    const divCarrinho = document.querySelector("#divCarrinho")
    const div = document.createElement("div")
    div.className = "carrinhoVazio"
    div.style.display = "block"
    div.innerHTML = ` <h3 class="vazio">Carrinho vazio</h3>
                <p class="addItens">Adicione itens</p>
                `
    divCarrinho.appendChild(div)
}