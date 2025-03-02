<script>
	import Nav from '@organism/nav/nav.svelte';
	import Button from '../stories/Button.svelte';
</script>

<section class=" relative flex flex-1 items-center justify-center bg-stone-100">
	<Nav></Nav>
	<div class="header-img absolute top-0 left-0 h-full w-full bg-cover"></div>
	<span class="absolute top-0 left-0 h-full w-full bg-black/60"></span>
	<div class="relative flex flex-col items-center justify-center">
		<span class="text-[20rem] leading-none text-[#ffffff61]">REVAR</span>
		<h1 class="mb-6 text-center text-3xl text-white">Performace and Ultra lightweight Clothing</h1>
		<Button size="large" label="Show Products" />
	</div>
</section>

<style>
	.header-img {
		background-image: url('/clothes.jpg');
	}
</style>
