import { render, screen } from '@testing-library/react'
import { prettyDOM } from '@testing-library/react'
import Blog from './Blog'

describe('Blog list component', () => {
  let container
  const blogs = [
    {
      id: '12345',
      title: 'Testing react-testing-libray for Blog component',
      author: 'test',
      url: 'www.test.com',
      likes: 9999,
      user: { username: 'testuser' },
    },
  ]
  beforeEach(() => {
    container = render(
      <Blog
        blogs={blogs}
        user={{}}
        setErrorMessage={{}}
        onBlogUpdate={{}}
        onBlogDelete={{}}
      />
    ).container
  })
  test('renders content', () => {
    const element = screen.getByText(
      /Testing react-testing-libray for Blog component/i
    )
    expect(element).toBeInTheDocument()
  })
  test('does not show url', () => {
    const urlContainer = container.querySelector('.url')
    expect(urlContainer).toBe(null)
  })
  test('does not show likes', () => {
    const urlContainer = container.querySelector('.likes')
    expect(urlContainer).toBe(null)
  })
})
