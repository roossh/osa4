const listHelper = require('../utils/list_helper')

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const emptyBlogs = []

describe('dummy', () => {
  test('dummy returns one', () => {
    const blogs = []
  
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })
})

describe('totalLikes', () => {

  test('totalLikes calculates 1 blog array', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('totalLikes calculates properly likes for multiple blogs', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })

  test('totalLikes works with an empty array', () => {
    const result = listHelper.totalLikes(emptyBlogs)
    expect(result).toBe(0)
  })
})

describe('favoriteBlog', () => {
  test('returns correct blog in a list of multiple blogs', () => {
    const blog = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    }
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(blog)
  })

  test('returns correct blog from an array of one blog', () => {
    const blog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    }
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(blog)
  })

  test('returns something from on empty array', () => {
    const blog = {
      title: undefined,
      author: undefined,
      likes: undefined
    }
    const result = listHelper.favoriteBlog(emptyBlogs)
    expect(result).toEqual(blog)
  })
})

describe('mostBlogs', () => {
  test('returns most common author correctly', () => {
    const author = {
      author: 'Robert C. Martin',
      blogs: 3
    }
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual(author)
  })

  test('returns correct object from an array with one object', () => {
    const author = {
      author: 'Edsger W. Dijkstra',
      blogs: 1
    }
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual(author)
  })

  test('returns something from empty array', () => {
    const author = {
      author: '',
      blogs: 0
    }
    const result = listHelper.mostBlogs(emptyBlogs)
    expect(result).toEqual(author)
  })
})

describe('mostLikes', () => {
  test('returns correct object from an array with several objects', () => {
    const author = {
      author: 'Edsger W. Dijkstra',
      likes: 17
    }
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual(author)
  })

  test('returns correct object from an array of one object', () => {
    const author = {
      author: 'Edsger W. Dijkstra',
      likes: 5
    }
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual(author)
  })

  test('returns correct object from an empty array', () => {
    const author = {
      author: '',
      likes: 0
    }

    const result = listHelper.mostLikes(emptyBlogs)
    expect(result).toEqual(author)
  })
})