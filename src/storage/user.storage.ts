import { LocalStorage } from "node-localstorage";
import User from "../models/user.model";

const localStorage = new LocalStorage('./db')

function addUser(user: User) {

	let data: User[] = JSON.parse(localStorage.getItem('users')!)

	let users = data ? data : []

	users.push(user)

	localStorage.setItem('users', JSON.stringify(users))
}

function findUser(username: string): User | undefined {

	let users: User[] = JSON.parse(localStorage.getItem('users')!)

	return users ? users.find(user => user.username === username) : undefined
}

export default {
	addUser,
	findUser
}