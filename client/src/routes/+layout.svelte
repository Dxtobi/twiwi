<script>
	import Header from './Header.svelte';
	import './styles.css';
	import {navigating} from '$app/stores';

	import {loading} from '$lib/loading';
    import Loader from '../components/loader.svelte';

	console.log($loading)
	$: $loading = !!$navigating
	let active = '/';

</script>

<div class="app">
	<Header />


	<main>
		<div class="nave-holder">
			<a href='/' class={`link-button ${active === '/'&&'active-link'}`} on:click={()=>active='/'}>
				<img src="/twitter-round.svg" class="link-image" alt=""/>
			</a>
			<a href='/twiimage' class={`link-button ${active === '/twiimage'&&'active-link'}`} on:click={()=>active='/twiimage'}>
				<img src="/picture-svgrepo-com (1).svg" class="link-image" alt=""/>
			</a>
			<a href='/ad' class={`link-button ${active === '/ad'&&'active-link'}`} on:click={()=>active='/ad'}>
				<img src="/ads-advertising-color-svgrepo-com.svg" class="link-image" alt=""/>
			</a>
			<a href='/reply' class={`link-button ${active === '/reply'&&'active-link'}`} on:click={()=>active='/reply'}>
				<img src="/reply-svgrepo-com.svg" class="link-image" alt=""/>
			</a>
		</div>
		<slot />
	</main>

	<footer>
		<p>visit <a href="https://twitter.com/programmer_dex">@programmer_dex</a> Twitter</p>
	</footer>
</div>
<Loader/>
<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 3rem auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
