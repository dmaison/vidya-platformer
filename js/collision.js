function Collision( obj ) {
	var that		= this;
	this.character	= obj.character;
	this.objects 	= obj.objects;
	this.controls	= new Controls( obj );	
	this.movement	= this.controls.movement;
}

// watch & wait for objects to touch
Collision.prototype.init = function(){

	var that 		= this;

	// check positions every 100ms
	setInterval(function(){

		// character positioning and coords
		var platforms 			= 0; // # of platforms where contact has been made
	    var hazards 			= 0; // # 0f hazards where contact has been made
	    var impassable			= 0;
		var cCoords				= {
									left 	: that.character.offset().left,
							      	top 	: that.character.offset().top,
							      	height 	: that.character.outerHeight( true ),
							      	width 	: that.character.outerWidth( true )
								}
		cCoords.right 			= ( cCoords.left + cCoords.width );
		cCoords.bottom			= ( cCoords.top + cCoords.height );

		// sift through the objects
		that.objects.each(function(){

			// object positioning and coords
			var obj 		= $( this );
			var oCoords		= {
					left 	: obj.children('div').offset().left,
			      	top 	: obj.children('div').offset().top,
			      	height 	: obj.children('div').outerHeight(true),
			      	width 	: obj.children('div').outerWidth(true),
			     	bottom 	: ( this.top + this.height ),
			      	right 	: ( this.left + this.width )
				}
			oCoords.right 	= ( oCoords.left + oCoords.width );
			oCoords.bottom	= ( oCoords.top + oCoords.height );

			// get collision information
		    var collided = that.detect({ c: cCoords, o: oCoords });

		    // character landed on a platform or impassable object
		    if(  $( this ).hasClass( 'platform' ) || $( this ).hasClass( 'impassable' )  ) {		    	
		    	if( collided.horizontal && ( collided.bottom || collided.inside ) ) ++platforms;
		    }

		    // stop character from passing through an object horizontally
		    if( $( this ).hasClass( 'impassable' ) ) {
		    	if( collided.vertical && !collided.bottom ) {
	  				if( collided.right ) that.controls.disable( 'moveRight' ); // from the right
	  				if( collided.left ) that.controls.disable( 'moveLeft' ); //from the left
	  				
	  				//figure out which side character is closest to and disable it
	  				if( collided.inside ) console.log( 'inside' );

	  				if( collided.right || collided.left || collided.inside ) ++impassable;

	  			}
		    }

		    // character collided with a hazard
		    if( $( this ).hasClass( 'hazard' ) ) {
		    	if( collided.inside ) ++hazards;
		    }

		});

  		//fall
  		if( platforms == 0 ) {
  			that.movement.state.falling = true;
  			that.movement.fall();
  		} else {
  			that.movement.state.falling = false;
  		}

  		//damage
  		( hazards > 0 ) ? that.character.addClass( 'damage' ) : that.character.removeClass( 'damage' );

  		//stop horizontal
  		if( impassable == 0 && that.controls.disabled.check == true ) that.controls.enable();
  		
	}, 1);
	
}

// Detect if objects are touching, in any capacity
Collision.prototype.detect = function( obj ){

	//detection relative to character not object
	var detection 	= {
						any			: false,
						left		: false,
						right		: false,
						top			: false,
						bottom 		: false,
						inside		: false,
						horizontal	: false,
						vertical 	: false
					};

	// is it inside?
	if( obj.c.left < obj.o.right && obj.c.right > obj.o.left ) detection.horizontal = true;	
	if( obj.c.top < obj.o.bottom && obj.c.bottom > obj.o.top ) detection.vertical = true;
	if( detection.horizontal && detection.vertical ) detection.inside = true;

	// the further right, the greater the number
	if( obj.c.right < ( obj.o.left + 5 ) && obj.c.right > ( obj.o.left - 5 ) ) detection.right = true;
	if( obj.c.left < ( obj.o.right + 5 ) && obj.c.left > ( obj.o.right - 5 ) ) detection.left = true;
	
	// the further up, the lesser the number
	if( obj.c.bottom < ( obj.o.top + 5 ) && obj.c.bottom > ( obj.o.top - 5 ) ) detection.bottom = true;
	if( obj.c.top < ( obj.o.bottom + 5 ) && obj.c.bottom > ( obj.o.bottom - 5 ) ) detection.top = true;	

	if( detection.right || detection.left || detection.bottom || detection.top || detection.inside ) detection.any = true;

  	return detection;
}