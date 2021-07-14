import React, {useState, useEffect} from 'react'
const Books = (props) => {
  
  

  const [filteredBooks, setFilteredBooks] = useState(props.books)
  
  const books = props.books
  useEffect(() => {
    setFilteredBooks(books)
  },[books])

  if (!props.show) {
    return null
  }

  
  const unfilteredGenres = props.books.map(book => book.genres.toString())
  
  const genres = unfilteredGenres.filter((item, index) => {
    return unfilteredGenres.indexOf(item) === index
  })

  

  const filterByGenres = (genre) => {

    genre === 'all genres'
    ? setFilteredBooks(props.books)
    : setFilteredBooks(props.books.filter(book => book.genres.includes(genre)))
    
  }

  return (
    <div>
      <h2>books</h2>
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
          {filteredBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        {genres.map(genre => <button key={genre} onClick ={() => filterByGenres(genre)}>{genre}</button>)}
        <button key='allgenres' onClick={() => filterByGenres('all genres')}>all genres</button>
      </div>
    </div>
  )
}

export default Books