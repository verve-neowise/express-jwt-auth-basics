<script lang="ts">
import { Link } from "svelte-navigator";
import axios from 'axios'

let message = undefined


function login(event: Event) {
    let form = event.target as HTMLFormElement
    let data = new FormData(form)

    console.log("login");

    axios.post('http://localhost:8081/login', data)
        .then((res) => {
			console.log(res.data);
        })
        .catch(err => {
			message = err.response.data.message
			setTimeout(() => message = undefined, 1000)
   		 })
}

</script>

	<div class="flex justify-center items-center h-screen">

		<div class="card w-96 bg-base-300 shadow-xl">
			<div class="card-header">
				<h1 class="text-xl p-3 text-center font-bold">Login</h1>
			</div>
			<figure><img src="https://api.lorem.space/image/shoes?w=400&h=225" alt="Shoes" /></figure>
			<div class="card-body">

				{#if message}
				<div class="alert shadow-lg">
					<div>
					  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
					  <span>{message}</span>
					</div>
				  </div>
				 {/if}

				<form id="form" class="flex flex-col gap-3" autocomplete="off" on:submit|preventDefault={login}>

					<div class="form-control w-full max-w-xs">
						<input name="username" type="text" placeholder="Username" class="input input-bordered w-full max-w-xs" autocomplete="off">
					</div>
	
					<div class="form-control w-full max-w-xs">
						<input  name="password" type="password" placeholder="Password" class="input input-bordered w-full max-w-xs" autocomplete="off">
					</div>
	
					<button type="submit" class="btn w-full btn-primary mt-3">Login</button>
                    <Link class="btn w-full btn-secondary mt-3" to="/register"> Register </Link>
				</form>
			</div>
		</div>
	</div>