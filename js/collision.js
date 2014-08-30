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
		var characterLeft 		= that.character.offset().left;
      	var characterTop 		= that.character.offset().top;
      	var characterHeight 	= that.character.outerHeight(true);
      	var characterWidth 		= that.character.outerWidth(true);
     	var characterBottom 	= characterTop + characterHeight;
      	var characterRight 		= characterLeft + characterWidth;
      	var platformCount		= 0; // # of platforms where contact has been made
      	var hazardCount			= 0; // # 0f hazards where contact has been made

		that.objects.each(function(){

			// object positioning and coords
		    var objLeft 	= $( this ).children('div').offset().left;
		    var objTop 		= $( this ).children('div').offset().top;
		    var objHeight	= $( this ).children('div').outerHeight(true);
		    var objWidth 	= $( this ).children('div').outerWidth(true);
		    var objBottom 	= objTop + objHeight;
		    var objRight 	= objLeft + objWidth;
		    

		    // if no bottom collision, check for side collision
	      	if (objBottom < characterTop || objTop > characterBottom || objRight < characterLeft || objLeft > characterRight) {
	      		
	      		if( ( objLeft + 2 ) < characterRight && ( objRight - 2 ) > characterLeft && ( objTop + 5 ) <= characterBottom) {	      			
	      			
	      			var right = false;

	      			if( ( objRight - 2 ) > characterLeft ) {
	      				right = true;
	      				that.character.stop().animate( { left: '+=2px' }, 1 );
	      			}

	      			console.log( right );

	      			if( ( objLeft + 2 ) < characterRight && right == false ) {
	      				that.character.stop().animate( { left: '-=2px' }, 1 );
	      			}
	      		}


	      	// bottom collision
	      	} else {

	      		//if()


	      		// Platform (check top +5 so if mc is standing below the top, he doesn't stand in mid air)
	      		if( $( this ).hasClass( 'platform' ) && ( objTop + 5 ) >= characterBottom ) {
	      			++platformCount;
	      			if( that.state.falling ) {
	      				that.state.falling = false;
	      				that.character.removeClass( 'fall' );

	      				//necessary because it corrects issue w/ not being able to walk after falling
	      				if( that.character.hasClass( 'moveLeft' ) ) that.controls.move( 'Left' );
	      				if( that.character.hasClass( 'moveRight' ) ) that.controls.move( 'Right' ) ;
	      			}
	      		} 

	      		// Impassable objects
	      		if( $( this ).hasClass( 'impassable' ) ){

	      			console.log( '\n objLeft : ' + objLeft + '\n characterRight : ' + characterRight  );

	      			//if( objLeft >= characterBottom ) console.log( 'right' );

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