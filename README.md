vidya-platformer
================

Vidya is meant to decrease the development time and make it easy to create web-client based 2d platformer games.

Use
----------------

1. Include the js files in the &lt;head&gt; of the document that are located in the ./js directory ( When it gets to a viable state, all the js files will be contained in one file: vidya.js )

2. Created a new instance of vidya after dom loaded:
<pre>
  $( document ).ready(function(){
    new Vidya({ ... });
  });
</pre>

3. Vidya takes an object as a parameter:
<pre>
{
	// REQUIRED, expects jQuery object
	"character"	: $( '#your-character' ),
	"objects"	  : $( '.your-objects' ),	

	// optional: physics ( expects int value in milliseconds )
	"movement" 	: {
					"fallSpeed" 	: intVal,	// default: 20ms
					"jumpSpeed" 	: intVal,	// default: 300ms
					"walkSpeed" 	: intVal  	// default: 15ms
				},

	// optional: key reassignment ( expects keycode )
	"controls" 	: {
					"jump" 		: intVal, // default: 32 ( spacebar )
					"crouch" 	: intVal, // default: 40 ( downkey )
					"climb" 	: intVal, // default: 38 ( upkey )
					"moveLeft" 	: intVal, // default: 37 ( leftkey )
					"moveRight"	: intVal  // default: 39 ( rightkey )
				}
}
</pre>

Objects
----------------

An object's interaction with the character is determined by the class that is on the html element
- **platform** : the character can pass through the bottom and sides, but not the top of the object.
- **impassable** : the character cannot pass through the object on any side ( if the character is inside an impassable object they cannot leave it ).
- **hazard** : any contact inflicts damage to the character.
- **enemy** : contact on the sides and bottom, inflict damage to the character. contact to the top, removes the object from the dom.
- **chest** : ( not added yet ) 
- **point** : ( not added yet )
- **health** : ( not added yet )
- **climbable** : ( not added yet )

Character State
----------------

Classes are added to the element designated as the main character, when it is given commands or comes in contact with certain objects.
- **left** : the character is facing the left direction.
- **right** : the character is facing the right direction.
- **up** : the user hits the climb control but is not infront of a climbable object.
- **climbing** : the character is climbing.
- **down** : the user hits the crouch control.
- **moveLeft** : the character is moving left.
- **moveRight** : the character is moving right.
- **falling** : the character is in free fall.
- **damage** : the character comes in harmful contact with a hazard or enemy object.
