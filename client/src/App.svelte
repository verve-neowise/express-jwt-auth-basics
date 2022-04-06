<script lang="ts">
import { Router, Route, navigate } from 'svelte-navigator'
import Login from './pages/Login.svelte';
import Main from './pages/Main.svelte';
import Register from './pages/Register.svelte';
	
</script>
<main class="bg-neutral">
	<Router>

		<Route path="login" >
			<Login/>
		</Route>
	
		<Route path="register">
			<Register/>
		</Route>

		<Route>
			<Main/>
		</Route>
	</Router>
</main>
