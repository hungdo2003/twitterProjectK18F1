import express from 'express'
import usersRouter from './routes/users.routes'
import databaseService from './services/database.services'
const app = express()
app.use(express.json())
const PORT = 3000

databaseService.conect()
app.get('/', (req, res) => {
  res.send('HeLLo world')
})

app.use('/users', usersRouter)
//localhost:3000/users/tweets
app.listen(PORT, () => {
  console.log(`Server dang open : ${PORT}`)
})
