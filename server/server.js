const express = require('express')
const app = express()
const UserModel = require('./models/user')
const bcrypt = require('bcrypt')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/user', async (req, res) => {
  console.log(req.body)
  try {
      const newUser = await UserModel.create({
        ...req.body,
        password: encryptUserPassword(req.body.password)
      })
      console.log(newUser)
      res.status(200)
  } catch (error) {
    console.error(error)
  }
})

app.post('/signin', async (req, res) => {
  const userEmail = req.body.email
  const plainPasswordAttempt = req.body.password
  const errorTray = []
  let passwordsMatch
  try {
    const userAccount = await UserModel.findOne({'email': userEmail})
    if (!userAccount) errorTray.push('User not found')
    else {
      passwordsMatch = bcrypt.compareSync(plainPasswordAttempt, userAccount.password)
      if (!passwordsMatch) errorTray.push('Password failed')
    }
    res.json({passwordsOrErrors: passwordsMatch ? userAccount.passwordList : errorTray, loggedIn: passwordsMatch}).status(201)
  } catch (error) {
    console.error(error)
  }
})

app.listen(3000, () => {
    console.log('Server Running...')
})

function encryptUserPassword(plainTextPassword) {
  return bcrypt.hashSync(plainTextPassword, 12);
}