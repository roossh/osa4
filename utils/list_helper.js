const _ = require('lodash')

const dummy = (blogs) => {
  return(1)
}

const totalLikes = (blogs) => {
  const total = blogs.reduce((sum, blog) => sum + blog.likes, 0)
  return(total)
}

const favoriteBlog = (blogs) => {
  const maxLikes = blogs.reduce((max, blog) => blog.likes > max ? blog.likes : max, 0)
  const favBlog = blogs.find(blog => blog.likes === maxLikes)
  if (favBlog !== undefined) {
    const { title, author, likes } = favBlog
    return { title, author, likes }
  } else {
    return { title: undefined, author: undefined, likes: undefined }
  }

}

const mostBlogs = (blogs) => {
  const authorArray = _.map(blogs, 'author')
  const mostCommonAuthor = _.chain(authorArray)
    .countBy()
    .toPairs()
    .max(_.last)
    .head()
    .value()
  const blogCount = blogs.filter(blog => blog.author === mostCommonAuthor).length
  if (blogCount > 0) {
    const mostBlogsWritten = { author: mostCommonAuthor, blogs: blogCount }
    return mostBlogsWritten
  } else {
    const mostBlogsWritten = { author: '', blogs: 0}
    return mostBlogsWritten
  }
}

const mostLikes = (blogs) => {
  const totalLikesArray = _.chain(blogs)
    .groupBy('author')
    .map((blog, key) => ({
      'author': key,
      'likes': _.sumBy(blog, 'likes')
    }))
    .value()
  const mostLikesAuthor = totalLikesArray.reduce((max, blog) => blog.likes > max.likes ? blog : max, {author: '', likes:0})
  return mostLikesAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}