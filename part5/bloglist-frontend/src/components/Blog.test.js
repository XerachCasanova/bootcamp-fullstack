import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {

  let componentBlog
  let mockHandler
  beforeEach(() => {
    const blog = {
      title: 'title testing',
      author: 'author testing',
      url: 'url testing',
      likes: 10,
      user: {
        username: 'userTesting'
      }
    }

    mockHandler = jest.fn()

    componentBlog = render (
      <Blog blog={blog} handleChange={mockHandler}/>

    )
  })


  test('at start url and likes are not displayed', () => {
    const div = componentBlog.container.querySelector('.togglableContent')

    expect(div).toHaveStyle('display: none')
  })

  test('renders Blog', () => {
    expect(componentBlog.container).toHaveTextContent(
      'title testing'
    )

  })

  test('after clicking the button, author and url are displayed', () => {
    const button = componentBlog.getByText('view')
    fireEvent.click(button)

    const div = componentBlog.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('clicking the button like twice, handle is called twice', () => {
    const button = componentBlog.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    console.log(mockHandler.mock)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })





})



/*describe ('<Blog />', () => {

  let component
  beforeEach(() => {
    component = render (
      <Blog ">
        <div className="testDivTogglelable">
          <div className="blogDivTogglelable"/>
        </div>
      </Blog>
    )
  })
})*/