import React, {useState, useEffect} from 'react'
import {useLazyQuery} from '@apollo/client'
import {FIND_BOOKS_BY_GENRE} from '../queries'


const RecommendBooks = (({show, favoriteGenre }) => {
  

  const[getFavoritesBooks, result] = useLazyQuery(FIND_BOOKS_BY_GENRE)
  const [favoritesBooks, setFavoritesBooks] = useState(null)

  useEffect(()=> {
    getFavoritesBooks({variables : { genre: favoriteGenre}})
  },[]) //eslint-disable-line
    

  useEffect(() => {
    
    if(result.data) {
      setFavoritesBooks(result.data.allBooks)
    }
  }, [result])

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <strong>patterns</strong></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {favoritesBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )

})


export default RecommendBooks