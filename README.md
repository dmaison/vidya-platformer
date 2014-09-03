vidya-platformer
================
*Use

- Include the js files in the &lt;head&gt; of the document that are located in the ./js directory ( When it gets to a viable state, all the js files will be contained in one file: vidya.js )

- Created a new instance of vidya after dom loaded:
  $( document ).ready(function(){
    new Vidya({ ... });
  });

- Vidya takes an object as a parameter:
{
	// REQUIRED, expects jQuery object
	"character"	: $( '#your-character' ),
	"objects"	  : $( '.your-objects' ),	

	// optional: physics ( expects int value in milliseconds )
	"movement" 	: {
					"fallSpeed" 	: intVal,	// default: 20ms
					"jumpSpeed" 	: intVal,	// default: 300ms
					"walkSpeed" 	: intVal  // default: 15ms
				},

	// optional: key reassignment ( expects keycode )
	"controls" 	: {
					"jump" 		  : intVal, // default: 32 ( spacebar )
					"crouch" 	  : intVal, // default: 40 ( downkey )
					"climb" 	  : intVal, // default: 38 ( upkey )
					"moveLeft" 	: intVal, // default: 37 ( leftkey )
					"moveRight"	: intVal  // default: 39 ( rightkey )
				}
}
