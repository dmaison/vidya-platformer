function Collision( environment ) {
	this.controls	= environment.controls;
	this.character	= this.controls.character;
	this.objects 	= environment.objects;
	this.options	= { fallSpeed : 30 };
	this.state		= { falling: false };
}

Collision.prototype.detect = function(){

	var that 		= this;

	// check positions every 100ms
	setInterval(function(){

		// character poitioning and coords
		var characterX 			= that.character.offset().left;
      	var characterY 			= that.character.offset().top;
      	var characterHeight 	= that.character.outerHeight(true);
      	var characterWidth 		= that.character.outerWidth(true);
     	var characterDepth 		= characterY + characterHeight;
      	var characterParameter 	= characterX + characterWidth;
      	var platformCount		= 0; // # of platforms where contact has been made
      	var hazardCount			= 0; // # 0f hazards where contact has been made

		that.objects.each(function(){

			// object positioning and coords
		    var x = $( this ).children('div').offset().left;
		    var y = $( this ).children('div').offset().top;
		    var h = $( this ).children('div').outerHeight(true);
		    var w = $( this ).children('div').outerWidth(true);
		    var d = y + h;
		    var p = x + w;
		    

		    // no collision
	      	if (d < characterY || y > characterDepth || p < characterX || x > characterParameter) {
	      		
	      		

	      	// collision
	      	} else {

	      		// Impassable objects
	      		if( $( this ).hasClass( 'impassable' ) ){

	      			console.log( 'this nigga\'s impassable' );

	      		}

	      		// Platform
	      		if( $( this ).hasClass( 'platform' ) ) {

	      			// need to check if bottom of MC & top of platform
	      			// need to change MC Y position if not top of platform
	      			++platformCount;
	      			if( that.state.falling ) {
	      				that.state.falling = false;
	      				that.character.removeClass( 'fall' );

	      				if( that.character.hasClass( 'moveLeft' ) ) that.controls.move( 'Left' );
	      				if( that.character.hasClass( 'moveRight' ) ) that.controls.move( 'Right' ) ;
	      			}
	      		} 

	      		// Hazard
	      		if( $( this ).hasClass( 'hazard' ) ) {
	      			++hazardCount;
	      			that.character.addClass( 'damage' );
	      		}
	      	}
		
		});

		// if mc is not in contact with any object, then its safe to assume he is in mid air
  		if( !that.state.falling && platformCount == 0 && !that.character.hasClass( 'jump' ) ) {
  			that.state.falling = true;
  			that.fall();
  		}

  		if( hazardCount == 0 ) that.character.removeClass( 'damage' );

	}, 10);
	
}

Collision.prototype.fall = function() {
	var that = this;

	var movement = { bottom: '-=10px' };

	if( that.controls.controls.state.moveLeft ) movement.left = '-=10px';
	if( that.controls.controls.state.moveRight ) movement.left = '+=10px';

	if( that.state.falling ) that.character.animate( movement, that.options.fallSpeed, function(){
		that.fall();
	}).addClass( 'fall' );

}