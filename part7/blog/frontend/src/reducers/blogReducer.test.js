//import React from 'react'
import { initializeBlogs } from './blogReducer'

describe('Blog Reducer', () => {

  let blogs
  beforeEach (() => {
    blogs = {
      title: 'title test 1',
      author: 'author test 1',
      url: 'url test 1',
      likes: 0

    },
    {
      title: 'title test 2',
      author: 'author test 2',
      url: 'url test 2',
      likes: 0

    }


  })
  test ('blogs initializes correctly', async () => {

    const action = {
      type: 'INIT_BLOGS',
      data: blogs
    }

    const newState = await initializeBlogs(blogs, action)
    console.log('PRUEBAAAAAAAAAAAA', newState)
    expect(newState).toHaveLength(2)
    expect(newState).toContainEqual(blogs)

  })
})