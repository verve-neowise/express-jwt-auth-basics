import { Router } from "express"
import jwtProvider from "../security/jwt.provider"

const router = Router()

router.get('/home', (req, res) => {

	let token = req.header('Authorization')

	if (!token) {
		return res.status(401).send({ message: 'Access denied!' })
	}

	let payload = jwtProvider.verify(token)

	if (!payload) {
		return res.status(401).send({ message: 'Access denied!' })
	}

	res.status(200).send({ message: 'salom aleykum!', payload })
})


export default router