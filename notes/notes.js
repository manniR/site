// tween max tip (https://www.youtube.com/watch?v=qYNZVTAqZnc)
// TweenMax.to ..... startAt:{} -> faster!!!!! than .fromTo 

TweenMax.to(particle[0], 1,{
	startAt:{
		width:25,
		height:25,
		top:550,
		left:357,
		scale: 1,
		opacity: 1
	},
	top: 960, scale:.5,
	force3D:true,
	ease:Quad.easeIn,
	onComplete: function(){
		//if necessary tween to 0 on complete
		TweenMax.set((this.target), (opacity:0));
	}	
});
