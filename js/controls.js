function Controls( character ) {
	this.character 		= character;
	this.controls		= {
							speed 	 	: 70,
							jump 	 	: 32,
							moveLeft 	: 37,
							moveRight 	: 39,
							crouch 		: 40,
							climb 		: 38
						};
	this.startPosition	= { left: 0, top: 0 }
	this.character.addClass( 'right' );
}

Controls.prototype.init = function(){
	
	var that = this;

	$( document ).keydown(function( control ){

		switch( control.keyCode ){

			case that.controls.jump :
				that.action( 'jump' );
				break;

			case that.controls.moveLeft :
				that.character
					.removeClass( 'right down up' )
					.addClass( 'left moveLeft' )
					.animate({ left: '-=20px' }, that.controls.speed);
				break;

			case that.controls.moveRight :
				that.character
					.removeClass( 'left down up' )
					.addClass( 'right moveRight' )
					.animate({ left: '+=20px' }, that.controls.speed);
				break;

			case that.controls.crouch :
				that.character
					.stop( true, false )
					.addClass( 'down' );
				break;

			case that.controls.climb :
				that.character
					.stop( true, false )
					.addClass( 'up' );
				break;
		}

	});

	$( document ).keyup(function( control ){
		if(control.keyCode != that.controls.jump) that.character.stop( true, false );
		that.character.removeClass( 'up down moveRight moveLeft' ) ;
	});

}

Controls.prototype.action = function( controlName ){
	this.character
		.children( 'div' )
		.addClass( controlName )
		.one('webkitAnimationEnd oanimationend oAnimationEnd msAnimationEnd animationend', function(){
			$( this ).removeClass( 'jump' );
		});
}