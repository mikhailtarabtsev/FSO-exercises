const {port} = require('./utils/config')
const app = require('./app')
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})