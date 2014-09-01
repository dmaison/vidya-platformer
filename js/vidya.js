function Vidya( obj ) {
	this.collision = new Collision( obj );
	this.collision.init();
	this.collision.controls.init();
}