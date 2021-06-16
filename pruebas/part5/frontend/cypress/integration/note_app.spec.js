describe('Note app',  function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Xerach Casanova  ',
      username: 'xermam',
      password: 'cabrera'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })



  it('front page can be opened',  function() {
    cy.visit('http://localhost:3000')
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki')
  })

  it('user can log in', function() {
    cy.contains('log in').click()
    cy.get('#username').type('xermam')
    cy.get('#password').type('cabrera')
    cy.get('#login-button').click()

    cy.contains('Xerach Casanova logged in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'xermam', password: 'cabrera' })
    })

    it('a new note can be created', function() {
      cy.contains('new note').click()
      cy.get('input').type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('show all').click()
      cy.contains('a note created by cypress')

    })

    describe('and several notes exist', function() {
      beforeEach(function() {
        cy.createNote({ content: 'first note', important: false })
        cy.createNote({ content: 'second note', important: false })
        cy.createNote({ content: 'third note', important: false })

      })
      it('one of those can be made important', function(){

        cy.contains('show all').click()

        cy.contains('second note').parent().find('button').as('theButton')
        cy.get('@theButton').click()
        cy.get('@theButton').should('contain', 'make not important')

      })
    })
  })

  it('login fails with wrong password', function() {
    cy.contains('log in').click()
    cy.get('#username').type('xermam')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error').should('contain', 'wrong credentials')
    cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    cy.get('.error').should('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'Xerach Casanova logged in')
  })


})