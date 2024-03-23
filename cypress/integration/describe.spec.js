/// <reference types="cypress" />

it.skip('a external test...', () => {

})

describe('Should group tests', () => {
    describe('Should group more specfic tests...', () => {
        it('A specific test...', () => {

        })
    }) 
    describe('Should group more specfic tests 2...', () => {
        it.only('A specific test 2...', () => {

        })
    }) 

    it.skip('A external test...', () => {

    })
})