import { Router } from "express"
import { nanoid } from "nanoid"
import User from "../models/user.model"
import jwtProvider from "../security/jwt.provider"
import userStorage from "../storage/user.storage"
import bcrypt from 'bcryptjs'

const router = Router()

router.post('/register', (req, res) => {

	let { name, lastname, username, password } = req.body

	let oldUser = userStorage.findUser(username)

	if (oldUser) {
		return res.status(403).send({ message: `username ${username} already exists.` })
	}
	
	let salt = bcrypt.genSaltSync(10)
	let hashPassword = bcrypt.hashSync(password, salt)

	let user: User = {
		id: nanoid(),
		name,
		lastname,
		username,
		password: hashPassword
	}

	userStorage.addUser(user)


	let token = jwtProvider.sing({
		userId: user.id,
		username: user.username
	})

	res.status(200).send({
		token,
		message: 'Successfuly register.'
	})
})


router.post('/login', (req, res) => {

	let { username, password } = req.body

	let user = userStorage.findUser(username)

	if (user === undefined) {
		return res.status(404).send({
			message: 'user with username: ' + username + ' not found.'
		})
	}

	if (!bcrypt.compareSync(password, user.password)) {
		return res.status(401).send({
			message: 'Login or password wrong!\n Maybe your password is ' + user.password
		})
	}
	
	let token = jwtProvider.sing({
		userId: user.id,
		username: user.username
	})

	res.status(200).send({
		token,
		message: 'Successfuly login.'
	})
	
})



export default router