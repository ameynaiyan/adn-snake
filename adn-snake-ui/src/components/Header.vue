<template>
	<header>
		<div class="back btn btn-dark"></div>
		<div class="title">SNAKE!</div>
		<div class="reset btn btn-dark"></div>
	</header>
</template>

<style scoped lang="scss">

header{
	height:48px;
	width:100%;
	background:#2c3e50;
	color:#66b2b2;
	position:fixed;
	left:0px;
	top:0px;
	z-index:9;
	display:flex;
	flex-direction: row;
	justify-content: space-between;
	align-items:center;
	@media (min-width:768px){
		height:72px;
	}
}

</style>