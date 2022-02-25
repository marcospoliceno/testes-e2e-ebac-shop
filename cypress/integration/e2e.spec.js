/// <reference types="cypress" />

import checkoutPage from '../support/page_objects/checkout.page'
const dadosCheckout = require('../fixtures/cadastro.json')

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('produtos')
    });
    it('Deve adicionar a lista de produtos ao carrinho e realizar o checkout', function () {
        cy.fixture('produtos').then(produtos => {
            produtos.forEach((produtos, index) => {
                cy.addProdutos(produtos.produto, produtos.tamanho, produtos.cor, produtos.quantidade)
            })
        })
        checkoutPage.realizaCheckout(
            dadosCheckout.nome,
            dadosCheckout.sobrenome,
            dadosCheckout.empresa,
            dadosCheckout.pais,
            dadosCheckout.endereco,
            dadosCheckout.numero,
            dadosCheckout.cidade,
            dadosCheckout.estado,
            dadosCheckout.cep,
            dadosCheckout.telefone,
            dadosCheckout.email)
            cy.get('.page-title').should('have.text', 'Pedido recebido')
            cy.get('.woocommerce-notice').contains('Obrigado. Seu pedido foi recebido')
    })
})