import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('testing', () => {
  let container
  const blogs = {
    id: '12345',
    title: 'Testing react-testing-libray for Blog component',
    author: 'test',
    url: 'www.test.com',
    likes: 9999,
    user: { username: 'testuser' },
  }
  const mockToggleVisible = vi.fn()
  const mockHandleLikes = vi.fn()
  const mockHandleDelete = vi.fn()
  beforeEach(() => {
    container = render(
      <Blog
        blog={blogs}
        toggleVisible={mockToggleVisible}
        handleLikes={mockHandleLikes}
        handleDelete={mockHandleDelete}
        isHidden={{}}
        localLikes={{}}
      />
    ).container
  })

  test('Blog: renders content', () => {
    const element = screen.getByText(
      /Testing react-testing-libray for Blog component/i
    )
    expect(element).toBeInTheDocument()
  })
  test('Blog: does not show url by default', () => {
    const urlContainer = container.querySelector('.url')
    expect(urlContainer).toBe(null)
  })
  test('Blog: does not show likes by default', () => {
    const urlContainer = container.querySelector('.likes')
    expect(urlContainer).toBe(null)
  })
  test('Blog: url and likes visible upon clicking view button', async () => {
    const container = render(
      <Blog
        blog={blogs}
        toggleVisible={mockToggleVisible}
        handleLikes={mockHandleLikes}
        handleDelete={mockHandleDelete}
        isHidden={{ 12345: true }}
        localLikes={{}}
      />
    ).container
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const div = container.querySelector('.urlLikesVisible')
    expect(div).not.toHaveStyle('display:none')
  })
  test('like button clicked twice, event handler is called twice', async () => {
    const container = render(
      <Blog
        blog={blogs}
        toggleVisible={mockToggleVisible}
        handleLikes={mockHandleLikes}
        handleDelete={mockHandleDelete}
        isHidden={{ 12345: true }}
        localLikes={{}}
      />
    ).container
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const div = container.querySelector('.urlLikesVisible')
    const likeButton = screen.getByText('Like')
    let clickCount = 0
    while (clickCount < 2) {
      try {
        await user.click(likeButton)
      } catch (error) {
        console.error(error)
      } finally {
        clickCount++
      }
    }
    expect(mockHandleLikes.mock.calls).toHaveLength(2)
  })
})
