varying vec2 vUv;
uniform sampler2D uTexture;
uniform sampler2D uOrigin1;
uniform sampler2D uOrigin2;
uniform sampler2D uVelocity;

uniform float time;
uniform vec3 uMouse;
uniform int uRenderMode;
uniform vec3 uDir;

void main() {
    vec4 positionOrigin = texture2D( uOrigin1, vUv );
    vec4 positionOrigin2 = texture2D( uOrigin2, vUv );
    vec4 curentPosition = texture2D( uTexture, vUv );
    vec4 curentVelosity = texture2D( uVelocity, vUv );
   //   vec4 positionOrigin1 = texture2D( uOrigin1, vUv );

    vec3 go = normalize(positionOrigin.xyz - curentPosition.xyz);
    float beak = distance(positionOrigin.xyz, curentPosition.xyz);
    float mouseDistance = distance(curentPosition.xyz , uMouse);

    vec3 goNormal = normalize(positionOrigin.xyz); 
    vec3 goMouse = normalize(curentPosition.xyz - uMouse.xyz);
   // vec3 goDir = normalize(uDir);

    float friction = 0.95;
    float gravity = 9.8; 
    //--------------------------------------- //POSITIONS SIMULATION
    if(uRenderMode == 0){
       vec3 pos = curentPosition.xyz + curentVelosity.xyz * time; 
       float scale = clamp(length(curentVelosity),  0.0, 1.0);  
       gl_FragColor = vec4(pos,scale);     
    }
    //---------------------------------------//VELOCITY SIMULATION
    if(uRenderMode == 3){

   //  this.accelerate(this.gravity);
	//  this.velocity.multiplyBy(this.friction);
   //  this.position.addTo(this.velocity);


       if(mouseDistance < 0.5){

         vec3 c = vec3(goNormal * 0.5 + goMouse * 1.8);
         curentVelosity += vec4(c.xyz,1.0) * 0.5; 
      //   curentVelosity += vec4(uDir,1.0) * 10.001;
       
        }else if(beak > 0.05){
         curentVelosity += vec4(go,1.0) * 0.1 ; 
        }  
       gl_FragColor = curentVelosity * friction;
    }
   

    //--------------------------------------- //INIT POSITIONS
    if(uRenderMode == 1){
       gl_FragColor = positionOrigin;     
    }
     //--------------------------------------- //INIT VELOCITY
    if(uRenderMode == 2){
       gl_FragColor = vec4(0.0,0.0,0.0,1.0);     
    }

    //gl_FragColor = positionOrigin;
    
}