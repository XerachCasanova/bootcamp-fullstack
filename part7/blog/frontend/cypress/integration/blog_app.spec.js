describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Xerach Casanova',
      username: 'xermam',
      password: 'cabrera'
    }
    cy.request('POST', 'http://localhost:3000/api/users', user )
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to the application')
    cy.contains('Username')
    cy.contains('Password')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function(){
      cy.get('[placeholder="username"]').type('xermam')
      cy.get('[placeholder="password"]').type('cabrera')
      cy.get('button').should('contain', 'login').click()

      cy.contains('Xerach Casanova logged in')
    })

    it('fails with wrong credentials', function(){
      cy.get('[placeholder="username"]').type('xermam')
      cy.get('[placeholder="password"]').type('wrong')
      cy.get('button').should('contain', 'login').click()

      cy.get('.message')
        .should('contain', 'Wrong Credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

    })
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'xermam', password: 'cabrera' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()

      cy.get('[placeholder="title"]').type('Title of one blog')
      cy.get('[placeholder="author"]').type('Miguel de Cervantes')
      cy.get('[placeholder="url"]').type('www.mcervantes.com')
      cy.get('button').contains('create').click()

      cy.get('.message')
        .should('contain', 'a new Blog added')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
    })

    it('A blog created can receive likes', function() {
      cy.createBlog({
        title: 'Title of one blog',
        author: 'Miguel de Cervantes',
        url: 'www.mcervantes.com'
      })
      cy.contains('view').click()
      cy.contains('like').click()
    })

    it('a blog can be deleted by user who created it', function() {

      cy.createBlog({
        title: 'Title of one blog',
        author: 'Miguel de Cervantes',
        url: 'www.mcervantes.com'
      })
      cy.contains('view').click()
      cy.contains('remove').click()
    })

    it('a blog cannot be deleted by user who did not create it', function() {

      const user = {
        name: 'Other User',
        username: 'otheruser',
        password: 'otherpass'
      }
      cy.request('POST', 'http://localhost:3000/api/users', user )

      cy.createBlog({
        title: 'Title of one blog',
        author: 'Miguel de Cervantes',
        url: 'www.mcervantes.com'
      })

      cy.contains('logout').click()
      cy.login({ username: 'otheruser', password: 'otherpass' })
      cy.contains('view').click()
      cy.contains('remove').should('not.exist')
    })

    it.only('blogs are ordered by likes', function(){

      cy.createBlog({
        title: 'Test blog 1',
        author: 'Miguel de Cervantes',
        url: 'www.mcervantes.com'
      })

      cy.createBlog({
        title: 'Test blog 2',
        author: 'Shakespeare',
        url: 'www.shakespeare.com'
      })

      cy.createBlog({
        title: 'Test blog 3 third blog',
        author: 'Thomas Malory',
        url: 'thomas Malory'
      })

      const likesBlog1 = 1
      const likesBlog2 = 3
      const likesBlog3 = 6

      cy.contains('Test blog 1').contains('view').click()
      Cypress._.times(likesBlog1, () => cy.contains('Test blog 1').contains('like').click())

      cy.contains('Test blog 2').contains('view').click()
      Cypress._.times(likesBlog2, () => cy.contains('Test blog 2').contains('like').click())

      cy.contains('Test blog 3').contains('view').click()
      Cypress._.times(likesBlog3, () => cy.contains('Test blog 3').contains('like').click())



      cy.get('[data-test-id="blog-likes"]').then(likes => {

        cy.wrap(likes).its(0).should('contain', `likes ${likesBlog3}`)
        cy.wrap(likes).its(1).should('contain', `likes ${likesBlog2}`)
        cy.wrap(likes).its(2).should('contain', `likes ${likesBlog1}`)
      })


    })
  })
})