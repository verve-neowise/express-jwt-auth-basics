<script lang="ts">
    import axios from "axios";
    import { navigate } from "svelte-navigator";

    let message = undefined;

    export const mapFormData = (formData: FormData) => {
        const data = {};
        for (let field of formData) {
            const [key, value] = field;
            data[key] = value;
        }

        return data;
    };

    function register(event: Event) {
        let form = event.target as HTMLFormElement;
        let data = mapFormData(new FormData(form));

        console.log(data);
        console.log(form);

        axios
            .post("http://localhost:8081/register", data)
            .then((res) => {
                message = res.data.message;

                setTimeout(() => navigate("/login"), 1000);
            })
            .catch((err) => {
                message = err.response.data.message;
                setTimeout(() => (message = undefined), 1000);
            });
    }
</script>

<div class="flex justify-center items-center h-screen">
    <div class="card w-96 bg-base-100 shadow-xl">
        <div class="card-header">
            <h1 class="text-xl p-3 text-center font-bold">Register</h1>
        </div>
        <figure>
            <img
                src="https://api.lorem.space/image/shoes?w=400&h=225"
                alt="Shoes"
            />
        </figure>
        <div class="card-body">
            <form
                id="form"
                class="flex flex-col gap-3"
                autocomplete="off"
                on:submit|preventDefault={register}
            >
                <div class="form-control w-full max-w-xs">
                    <input
                        name="name"
                        type="text"
                        placeholder="Name"
                        class="input input-bordered w-full max-w-xs"
                        autocomplete="off"
                    />
                </div>

                <div class="form-control w-full max-w-xs">
                    <input
                        name="lastname"
                        type="text"
                        placeholder="lastName"
                        class="input input-bordered w-full max-w-xs"
                        autocomplete="off"
                    />
                </div>

                <div class="form-control w-full max-w-xs">
                    <input
                        name="username"
                        type="text"
                        placeholder="Username"
                        class="input input-bordered w-full max-w-xs"
                        autocomplete="off"
                    />
                </div>

                <div class="form-control w-full max-w-xs">
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        class="input input-bordered w-full max-w-xs"
                        autocomplete="off"
                    />
                </div>

                <button type="submit" class="btn w-full btn-primary mt-3"
                    >Register</button
                >
            </form>
        </div>
    </div>
</div>
