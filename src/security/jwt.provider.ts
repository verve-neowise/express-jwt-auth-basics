import jwt from 'jsonwebtoken'

function sing(data: Payload) {
	return jwt.sign(data, 'codership', { expiresIn: '1h' })
}

function decode(token: string): Payload {
	return jwt.decode(token)! as Payload
}

function verify(token: string): Payload {
	return jwt.verify(token, 'codership')! as Payload
}

export type Payload = {
	userId: string,
	username: string
}

export default {
	sing,
	decode,
	verify,
}