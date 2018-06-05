<template>
	<section class="menu-list">
		<router-link to="/new">
			<div class="btn btn-dark btn-menu">
				New Game
			</div>
		</router-link>
	    <router-link to="/scores">
	    	<div class="btn btn-dark btn-menu">
	    		High Scores
	    	</div>
	    </router-link>
	    <router-link to="/about">
	    	<div class="btn btn-dark btn-menu">
	    		About
	    	</div>
	    </router-link>
	</section>
</template>




<style scoped lang="scss">
.menu-list{
  height:100vh;
  width:100%;
  background: #FFFFFF;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
  .btn-menu{
  	margin-bottom:16px;
  	height:48px;
  	line-height:48px;
  	width:100%;
  	@media (min-width:576px) and (max-width:767px){
		width:80%;
	}
  	@media (min-width:768px){
  		width:400px;
  		line-height:72px;
		height:72px;
	}
  }
}
</style>