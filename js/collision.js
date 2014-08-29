function Collision( environment ) {
	this.character	= environment.character;
	this.ground 	= environment.ground;
	this.objects 	= environment.objects;
}

Collision.prototype.detect = function(){

	var that 		= this;

	setInterval(function(){

		var x2 = that.character.offset().left;
      	var y2 = that.character.offset().top;
      	var h2 = that.character.outerHeight(true);
      	var w2 = that.character.outerWidth(true);
     	var b2 = y2 + h2;
      	var r2 = x2 + w2;

		that.objects.each(function(){
			
	      var x1 = $( this ).children('div').offset().left;
	      var y1 = $( this ).children('div').offset().top;
	      var h1 = $( this ).children('div').outerHeight(true);
	      var w1 = $( this ).children('div').outerWidth(true);
	      var b1 = y1 + h1;
	      var r1 = x1 + w1;

	      if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) {
	      	console.log( 'Waiting for collision...' );
	      } else {
	      	console.error( 'Collision!!' )
	      }
		
		});
		

	}, 100);
	
}
