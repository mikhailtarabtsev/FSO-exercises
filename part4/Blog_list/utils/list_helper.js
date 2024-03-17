const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, value) => ( sum + value.likes||0)
    return  blogs.reduce(reducer, 0)
}
const favBlog = (blogs) =>{
    let fav = blogs[0]
    blogs.forEach(blog =>{
        if(fav.likes< blog.likes){
            fav = blog
        }
        
    })
    return fav
}
module.exports = {
    dummy,
    totalLikes,
    favBlog
}