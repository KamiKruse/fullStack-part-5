import { render, screen } from '@testing-library/react'
import { prettyDOM } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
  test('does not show url by default', () => {
    const urlContainer = container.querySelector('.url')
    expect(urlContainer).toBe(null)
  })
  test('does not show likes by default', () => {
    const urlContainer = container.querySelector('.likes')
    expect(urlContainer).toBe(null)
  })
  test('url visible upon clicking view button', async ()=>{
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const div = container.querySelector('.urlLikesVisible')
    expect(div).not.toHaveStyle('display:none')
  })
  test('likes visible upon clicking view button', async ()=>{
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const div = container.querySelector('.urlLikesVisible')
    expect(div).not.toHaveStyle('display:none')
  })
})
