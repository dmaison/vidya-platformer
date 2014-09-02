function Vidya( obj ) {

	if( typeof obj.controls != 'object') obj.controls = {};
	if( typeof obj.movement != 'object') obj.movement = {};

	this.collision = new Collision( obj );
	this.collision.init();
	this.collision.controls.init();
}