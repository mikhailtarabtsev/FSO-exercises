const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, value) => ( sum + value.likes||0)
    return  blogs.reduce(reducer, 0)
}
const favBlog = (blogs) =>{
    return blogs.reduce((most, value)=> value.likes>most.likes ? value : most, blogs[0])
}

const mostBlogs = (blogs) =>{
    let authors = []
    
    blogs.map(blog =>{
        let existingAuthorIndex = authors.findIndex(val => val.name === blog.author)
        if(existingAuthorIndex !== -1){
            authors[existingAuthorIndex].blogs ++;
        }
        else{
            const newAuthor = {
                name: blog.author,
                blogs: 1
                }
            authors.push( newAuthor )
        }
    })
   return authors.reduce((most, value) =>{
        return value.blogs > most.blogs? value : most
    }, authors[0])
}
module.exports = {
    dummy,
    totalLikes,
    favBlog,
    mostBlogs
}