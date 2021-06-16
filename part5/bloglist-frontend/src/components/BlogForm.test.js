import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'


test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const  createBlog =  jest.fn()
  const  componentBlogForm = render (
    <BlogForm createBlog={createBlog} />
  )
  const inputTitle = componentBlogForm.container.querySelector('#title')
  const inputAuthor = componentBlogForm.container.querySelector('#author')

  const inputUrl = componentBlogForm.container.querySelector('#url')

  const form = componentBlogForm.container.querySelector('form')

  fireEvent.change(inputTitle, {
    target: { value: 'testing Title' }
  })

  fireEvent.change(inputAuthor, {
    target: { value: 'testing Author' }
  })


  fireEvent.change(inputUrl, {
    target: { value: 'testing Url' }
  })

  const blogToCompare = {
    title: 'testing Title',
    author: 'testing Author',
    url: 'testing Url'
  }

  fireEvent.submit(form)
  expect(createBlog.mock.calls).toHaveLength(1)
  console.log('VALOR', createBlog.mock.calls[0][0])
  expect(createBlog.mock.calls[0][0]).toEqual(blogToCompare)

})
