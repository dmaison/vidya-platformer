function Controls( obj ) {
	this.character 		= obj.character;
	this.movement		= new Movement( obj );
	this.disabled		= {
							check		: false,
							jump 	 	: false,
							moveLeft 	: false,
							moveRight 	: false,
							crouch 		: false,
							climb 		: false
						};
	this.controls		= {
							jump 	 	: obj.controls.jump || 32,
							moveLeft 	: obj.controls.moveLeft || 37,
							moveRight 	: obj.controls.moveRight || 39,
							crouch 		: obj.controls.crouch || 40,
							climb 		: obj.controls.climb || 38
						};
}

Controls.prototype.init = function(){

	var that = this;
	this.character.addClass( 'right' );

	$( document ).keydown(function( control ){

		switch( control.keyCode ){

			case that.controls.jump :
				if( !that.character.hasClass( 'jump' ) && !that.character.hasClass( 'fall' )  ) that.movement.jump();
				break;

			case that.controls.moveLeft :
				if( !that.movement.state.moveLeft && !that.disabled.moveLeft ) {
					that.character 
						.removeClass( 'right down up' )
						.addClass( 'left moveLeft' );
					that.movement.state.moveLeft = true;
					that.movement.walk( 'Left' );
				}
				break;

			case that.controls.moveRight :
				if( !that.movement.state.moveRight && !that.disabled.moveRight ) {
					that.character
						.removeClass( 'left down up' )
						.addClass( 'right moveRight' );
					that.movement.state.moveRight = true;
					that.movement.walk( 'Right' );	
				}				
				break;

			case that.controls.crouch :
				if( !that.movement.state.crouch && !that.character.hasClass( 'jump' ) && !that.character.hasClass( 'fall' ) ) {
					that.character.addClass( 'down' ).stop().removeClass( 'moveLeft moveRight' );
					that.movement.state.crouch = true;
				}
				break;

			case that.controls.climb :
				if( !that.movement.state.climb && !that.character.hasClass( 'jump' ) && !that.character.hasClass( 'fall' ) ) {
					that.character.addClass( 'up' ).stop().removeClass( 'moveLeft moveRight' );
					that.movement.state.climb = true;
				}
				break;
		}

	});

	//key release, invert keypress states
	$( document ).keyup(function( control ){

		switch( control.keyCode ){

			case that.controls.moveLeft :
				that.movement.state.moveLeft = false;
				that.character.removeClass( 'moveLeft' );
				break;

			case that.controls.moveRight :
				that.movement.state.moveRight = false;
				that.character.removeClass( 'moveRight' );
				break;

			case that.controls.crouch :
				that.movement.state.crouch = false;
				that.character.removeClass( 'down' );
				break;

			case that.controls.climb :
				that.movement.state.climb = false;
				that.character.removeClass( 'up' );
				break;
		}
		
	});

}

Controls.prototype.disable = function( control ){
	this.disabled.check				= true;
	this.disabled[ control ] 		= true;
	this.movement.state[ control ] 	= false;
	this.character.removeClass( control );
}

Controls.prototype.enable = function(){
	this.disabled	= {
						check		: false,
						jump 	 	: false,
						moveLeft 	: false,
						moveRight 	: false,
						crouch 		: false,
						climb 		: false
					}
}