<script>
    import Button from '@atom/button/button.svelte';
</script>

<section class="grid flex-1 grid-cols-2">
    <div>
        <img
            src="/index.webp"
            alt="Revar Alpha Clothing"
            class="h-full w-full object-cover"
        />
    </div>

    <div class="flex flex-col items-center justify-center p-8">
        <h1>Login</h1>

        <form>
            <div class="flex flex-col space-y-4">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" />

                <label for="password">Password</label>
                <input type="password" id="password" name="password" />

                <Button type="submit" variant="primary">Login</Button>
            </div>
        </form>
    </div>
</section>
