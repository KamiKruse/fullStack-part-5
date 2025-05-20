const _ = require('lodash')
const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
]

//non Lodash version for finding  max occurences of an object in an array of objects
const mostBlogs = (blogs) => {
  let visited = {}
  let extname = ''
  for (let i = 0; i < blogs.length; i++) {
    extname = blogs[i].author
    if (!Object.hasOwn(visited, extname)) {
      visited[extname] = 1
    } else {
      visited[extname] = visited[extname] + 1
    }
  }
  let max = 0
  let topAuthor = ''

  if (Object.keys(visited).length === 0) {
    return { author: '', count: 0 }
  }
  for (const [author, count] of Object.entries(visited)) {
    if (count > max) {
      max = count
      topAuthor = author
    }
  }
  return {
    author: topAuthor,
    count: max,
  }
}
console.log(mostBlogs(blogs))

//Lodash version of the above

// eslint-disable-next-line no-unused-vars
const mostBlogLodash = (blogs) => {
  if (_.isEmpty(blogs)) {
    return 'Invalid blog'
  }
  return _.chain(blogs)
    .countBy('author')
    .map((count, author) => ({ author, count }))
    .maxBy('count')
    .value()
}

//non Lodash version for computing the most likes an author has received

// eslint-disable-next-line no-unused-vars
const mostLikes = (blogs) => {
  let visited = {}
  let extname = ''
  let upVotes = 0
  for (let i = 0; i < blogs.length; i++) {
    extname = blogs[i].author
    upVotes = blogs[i].likes
    if (!Object.hasOwn(visited, extname)) {
      visited[extname] = upVotes
    } else {
      visited[extname] = visited[extname] + upVotes
    }
  }

  let max = 0
  let topAuthor = ''

  if (Object.keys(visited).length === 0) {
    return { author: '', likes: 0 }
  }
  for (const [author, count] of Object.entries(visited)) {
    if (count > max) {
      max = count
      topAuthor = author
    }
  }
  return {
    author: topAuthor,
    likes: max,
  }
}

//Lodash version of the above:

// eslint-disable-next-line no-unused-vars
const mostLikesLodash = (blogs) => {
  if (_.isEmpty(blogs)) {
    return 'Invalid blog'
  }
  const like = _.reduce(
    blogs,
    function (val, obj) {
      const key = obj.author
      const valToAdd = _.isNumber(obj.likes) ? obj.likes : 0
      val[key] = (val[key] || 0) + valToAdd
      return val
    },
    {}
  )
  const arrMap = _.map(like, (totalLikes, author) => {
    return {
      author: author,
      likes: totalLikes,
    }
  })
  const bestAuthor = _.maxBy(arrMap, 'likes')
  return bestAuthor
}
