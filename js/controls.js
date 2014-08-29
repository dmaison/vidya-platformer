function Controls( character ) {
	this.character 		= character;
	this.controls		= {
							speed 	 	: 20,
							jump 	 	: 32,
							moveLeft 	: 37,
							moveRight 	: 39,
							crouch 		: 40,
							climb 		: 38,
							state		: {
											moveLeft	: false,
											moveRight	: false,
											jump 		: false,
											climb		: false,
											crouch		: false
										}
						};

	this.character.addClass( 'right' );
}

Controls.prototype.init = function(){

	var that = this;

	$( document ).keydown(function( control ){

		switch( control.keyCode ){

			case that.controls.jump :
				if( !that.character.hasClass( 'jump' ) && !that.character.hasClass( 'fall' ) ) that.jump();
				break;

			case that.controls.moveLeft :
				if( !that.controls.state.moveLeft ) {
					that.character 
						.removeClass( 'right down up' )
						.addClass( 'left moveLeft' );
					that.controls.state.moveLeft = true;
					that.move( 'Left' );
				}
				break;

			case that.controls.moveRight :
				if( !that.controls.state.moveRight ) {
					that.character
						.removeClass( 'left down up' )
						.addClass( 'right moveRight' );
					that.controls.state.moveRight = true;
					that.move( 'Right' );	
				}				
				break;

			case that.controls.crouch :
				if( !that.controls.state.crouch && !that.character.hasClass( 'jump' ) && !that.character.hasClass( 'fall' ) ) {
					that.character.addClass( 'down' ).stop( true, true );
					that.controls.state.crouch = true;
				}
				break;

			case that.controls.climb :
				if( !that.controls.state.climb && !that.character.hasClass( 'jump' ) && !that.character.hasClass( 'fall' ) ) {
					that.character.addClass( 'up' ).stop( true, true );
					that.controls.state.climb = true;
				}
				break;
		}

	});

	//key release, invert keypress states
	$( document ).keyup(function( control ){

		switch( control.keyCode ){

			case that.controls.moveLeft :
				that.controls.state.moveLeft = false;
				that.character.removeClass( 'moveLeft' );
				break;

			case that.controls.moveRight :
				that.controls.state.moveRight = false;
				that.character.removeClass( 'moveRight' );
				break;

			case that.controls.crouch :
				that.controls.state.crouch = false;
				that.character.removeClass( 'down' );
				break;

			case that.controls.climb :
				that.controls.state.climb = false;
				that.character.removeClass( 'up' );
				break;
		}
		
	});

}

//move vertically
Controls.prototype.jump = function(){
	this.character
		.addClass( 'jump' )
		.animate({ bottom: '+=100px' }, function(){
			$( this ).removeClass( 'jump' );
		});
}

//move horizontally
Controls.prototype.move = function( direction ){

	( direction.toLowerCase() === 'left' ) ? incType = '-' : incType = '+';

	var that = this;

	if( this.controls.state[ 'move' + direction ] ) {
		this.character
		.addClass( direction.toLowerCase() )
		.animate({ left: incType + '=10px' }, that.controls.speed, function(){
			that.move( direction );
		});
	}
	
}