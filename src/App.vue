<template>
	<div class="main">
		<keep-alive>
			<router-view v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive"></router-view>
	</div>
</template>

<script>
	export default {
		name: 'app'
	}
</script>

<style>
	body{ font-size: 14px; color: #333}
	body, ul, li{ margin: 0; padding: 0}
	li{ list-style: none}
</style>