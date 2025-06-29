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
  // const inputTitle = screen.getByPlaceholderText('Blog Title')
  // const inputAuthor = screen.getByPlaceholderText('Blog Author')
  // const inputURL = screen.getByPlaceholderText('Blog URL')
  const addBlogBtn = screen.getByRole('button', {name: 'Add Blog'})

  // await user.type(inputTitle, 'New Blog added')
  // await user.type(inputAuthor, 'testuser')
  // await user.type(inputURL, 'www.testuser.com')
  await user.click(addBlogBtn)

  // expect(mockHandlerTitle.mock.calls).toHaveLength('New Blog added'.length)
  // expect(mockHandlerAuthor.mock.calls).toHaveLength('testuser'.length)
  // expect(mockHandlerURL.mock.calls).toHaveLength('www.testuser.com'.length)
  

  expect(mockHandlerHandleBlog).toHaveBeenCalledTimes(1)
})
