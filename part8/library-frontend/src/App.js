

import React, { useState, useEffect } from 'react'
import {useApolloClient} from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import RecommendBooks from './components/RecommendBooks'

import { ALL_AUTHORS, ALL_BOOKS, ME, BOOK_ADDED } from './queries'

import {useQuery, useSubscription} from '@apollo/client'

const App = () => {
  
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const resultAuthors = useQuery(ALL_AUTHORS)
  const resultBooks = useQuery(ALL_BOOKS)
  const favoriteGenre = useQuery(ME)

  const client = useApolloClient()

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    if ( token ) {
      setToken(token)
    }
  }, [])
  
  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }   
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      updateCacheWith(addedBook)
    }
  })



  if (resultAuthors.loading ) return <div>loading authors...</div>
  if (resultBooks.loading ) return <div>loading books...</div>

  
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()

  }
  
  const showLogedOptions = () => {
    return (
    <>
      <button onClick={() => setPage('add')}>add book</button>
      <button onClick={() => setPage('recommend')}>recommend</button>
      <button onClick={logout}>logout</button>

      <NewBook show={
        page === 'add'} 
        updateCacheWith={updateCacheWith}
        />

      <RecommendBooks 
        show={page === 'recommend'} 
        favoriteGenre={favoriteGenre.data.me.favoriteGenre}
        books={resultBooks.data.allBooks}/>
    </>
    )
  }
    
  return (
    <div>
      
      <div>
        <button onClick={() => setPage('authors')} >authors</button>
        <button onClick={() => setPage('books') } >books</button>
        
        {token !== null
          ? showLogedOptions()
          : <button onClick={() => setPage('login')}>login</button>
        }
      </div>

      <Authors
        show={page === 'authors'}
        authors={resultAuthors.data.allAuthors}
      />

      <Books
        show={page === 'books'}
        books={resultBooks.data.allBooks}
        
      />
      
      <LoginForm
        show={page ==='login' }
        setToken = {setToken}
        setPage = {setPage}

      />


    </div>
  )
}

export default App