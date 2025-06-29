export default function Blog(props){
  return (
    <li
      id={props.blog.id}
      title={props.blog.title}
      author={props.blog.author}
      style={{
        border: '1px solid black',
        listStyle: 'none',
        padding: '8px',
        marginBottom: '16px',
      }}
      className='blog'
    >
      {props.blog.title} by {props.blog.author}
      <button onClick={() => props.toggleVisible(props.blog.id)}>
        {props.isHidden[props.blog.id] ? 'hide' : 'view'}
      </button>
      {props.isHidden[props.blog.id] && (
        <div className='urlLikesVisible'>
          <div className='url'>
            <span>URL: {props.blog.url} </span>
          </div>
          <div className='likes'>
            <span>
              Likes:
              {props.localLikes[props.blog.id] !== undefined
                ? props.localLikes[props.blog.id]
                : props.blog.likes}
            </span>
            <button onClick={() => props.handleLikes(props.blog.id)}>Like</button>
          </div>
          <div>
            <span>User: {props.blog.user.username} </span>
          </div>
          <button onClick={() => props.handleDelete(props.blog.id)}>Delete Blog</button>
        </div>
      )}
    </li>
  )
}
