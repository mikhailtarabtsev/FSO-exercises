const {port} = require('./utils/config')
const app = require('./app')
const {info, error} = require('./utils/logger')
app.listen(port, () => {
 info(`Server running on port ${port}`)
})