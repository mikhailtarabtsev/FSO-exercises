const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, value) => ( sum + value.likes||0)
    return  blogs.reduce(reducer, 0)
}

module.exports = {
    dummy,
    totalLikes
}