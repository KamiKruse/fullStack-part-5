import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlogForm from './NewBlogForm'

test('Testing NewBlogForm', async () => {
  const user = userEvent.setup()
  const newBlog = {
    title: 'a new blog',
    author: 'testuser',
    url: 'www.test.com',
  }
  const mockHandlerTitle = vi.fn()
  const mockHandlerAuthor = vi.fn()
  const mockHandlerURL = vi.fn()
  const mockHandlerHandleBlog = vi.fn()

  render(
    <NewBlogForm
      handleBlog={mockHandlerHandleBlog}
      newBlog={newBlog}
      handleOnTitleChange={mockHandlerTitle}
      handleOnAuthorChange={mockHandlerAuthor}
      handleOnURLChange={mockHandlerURL}
    />
  )
  
  const addBlogBtn = screen.getByRole('button', {name: 'Add Blog'})

  await user.click(addBlogBtn)

  expect(mockHandlerHandleBlog).toHaveBeenCalledTimes(1)
})
