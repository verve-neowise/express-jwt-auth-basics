import express from 'express'
import path from 'path'

import authRoutes from './routes/auth.routes'
import homeRoutes from './routes/home.routes'

// express config
const app = express()
app.use(express.json())
app.use(express.urlencoded( { extended: true } ))
app.use(express.static(path.join(__dirname, "../public")))

type User = {
	name: string, lastname: string
}

let user: User | undefined = undefined

app.use('/', authRoutes)
app.use('/', homeRoutes)

app.get('/', (req, res) => {
	if (user) {
		res.status(200).send(user)
	}
	else {
		res.status(403).send({
			message: 'Hali malumotlar yo`q'
		})
	}
})

app.post('/', (req, res) => {

	user = req.body

	res.status(200).send({
		 message: 'Hammasi zo`r. Ma`lumotlar yetib keldi.' 	
	})
})

app.listen(8080, () => console.log("Server is running on http://localhost:8080"))