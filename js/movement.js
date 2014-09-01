function Movement( obj ){
	this.character 	= obj.character;
	this.options	= {
						walkSpeed : obj.movement.walkSpeed || 15,
						fallSpeed : obj.movement.fallSpeed || 20,
						jumpSpeed : obj.movement.jumpSpeed || 300
					};
	this.state 		= {
						moveLeft	: false,
						moveRight	: false,
						jump 		: false,
						climb		: false,
						crouch		: false,
						falling		: false
					};
}

// Move vertically
Movement.prototype.jump = function(){

	var animation 	= { bottom: '+=100px' };
	var jumpStart	= this.character.offset().top; + this.character.outerHeight(true);
	var that 		= this;

	if( this.state.moveLeft ) animation.left = '-=100px';
	if( this.state.moveRight ) animation.left = '+=100px';

	this.character
		.data( 'jumpStart', jumpStart )
		.addClass( 'jump' )
		.animate( animation, that.options.jumpSpeed, 'linear', function(){
			$( this ).removeClass( 'jump' );
			that.fall();
		});
}

// Move horizontally
Movement.prototype.walk = function( direction ){

	var incType		= ( direction.toLowerCase() === 'left' ) ?  '-' : '+';
	var that 		= this;
	var animation	= { left: incType + '=10px' };

	if( this.state[ 'move' + direction ] && !this.character.hasClass( 'fall' ) ) {
		
		this.character
			.addClass( direction.toLowerCase() )
			.animate( animation, that.options.walkSpeed, function(){
				that.walk( direction );
			});	
		
	} 
}

// Move indefinitely down
Movement.prototype.fall = function() {
	var that 		= this;
	var animation 	= { bottom: '-=10px' };

	if( that.state.moveLeft ) animation.left = '-=10px';
	if( that.state.moveRight ) animation.left = '+=10px';

	if( that.state.falling ) {
		that.character
			.addClass( 'fall' )
			.animate( animation, that.options.fallSpeed, function(){
				that.fall();
			});
	} else {
		this.character
			.stop( true, true )
			.removeClass( 'fall' );

		if( this.state.moveLeft ) this.walk( 'Left' );
		if( this.state.moveRight ) this.walk( 'Right' );
	}

}