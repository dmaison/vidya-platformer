function Collision( obj ) {
	var that		= this;
	this.character	= obj.character;
	this.objects 	= obj.objects;
	this.controls	= new Controls( obj );	
	this.movement	= this.controls.movement;
	this.init();
}

Collision.prototype.init = function(){

	var that 		= this;

	// check positions every 100ms
	setInterval(function(){

		// character positioning and coords
		var cCoords	= {
			left 	: that.character.offset().left,
	      	top 	: that.character.offset().top,
	      	height 	: that.character.outerHeight( true ),
	      	width 	: that.character.outerWidth( true )
		}
		cCoords.right 	= ( cCoords.left + cCoords.width );
		cCoords.bottom	= ( cCoords.top + cCoords.height );

		var platformCount		= 0; // # of platforms where contact has been made
	    var hazardCount			= 0; // # 0f hazards where contact has been made		

		that.objects.each(function(){

			var obj = $( this );

			var oCoords	= {
				left 	: obj.children('div').offset().left,
		      	top 	: obj.children('div').offset().top,
		      	height 	: obj.children('div').outerHeight(true),
		      	width 	: obj.children('div').outerWidth(true),
		     	bottom 	: ( this.top + this.height ),
		      	right 	: ( this.left + this.width )
			}
			oCoords.right 	= ( oCoords.left + oCoords.width );
			oCoords.bottom	= ( oCoords.top + oCoords.height );

		    var collided = that.detect({ c: cCoords, o: oCoords });

		    if( obj.prop( 'id' ) != 'ground' ) console.log( collided.left );
		
		});

		// if mc is not in contact with any object, then its safe to assume he is in mid air
  		if( !that.movement.state.falling && platformCount == 0 && !that.character.hasClass( 'jump' ) ) {
  			that.movement.state.falling = true;
  			that.movement.fall();
  		}

  		if( hazardCount == 0 ) that.character.removeClass( 'damage' );

	}, 100);
	
}

Collision.prototype.detect = function( obj ){

	//detection relative to character not object
	var detection = {
		left	: false,
		right	: false,
		top		: false,
		bottom 	: false,
		inside	: false
	}

	// the further right, the greater the number
	if( obj.c.right >= obj.o.left && obj.c.left <= obj.o.left ) detection.right = true;
	if( obj.c.left <= obj.o.right && obj.c.right >= obj.o.right ) detection.left = true;

	//the further up, the lesser the number
	if( obj.c.bottom <= obj.o.top && ) detection.top = true;
	

	

  	return detection;
}