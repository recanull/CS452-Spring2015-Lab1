/*
Evan Canull 1/30/15
*/
var gl;
var points;    
var i= 0;
var pos1 ,pos2, pos3;
var buff1, buff2 ,buff3;
window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
	
	var trap = [vec2( -0.7, -1.0), vec2(  -1.0,  0.0 ), vec2(  0.0, 0.0 ), 
				vec2( 1.0, 0.0), vec2( 0.7, -1.0)];
	var tri = [ vec2( -1.0, -1.0 ), vec2(  0.0,  1.0 ), 
				vec2(  1.0, -1.0 ),];
	var sq = [ vec2( -1.0, -1.0 ), vec2(  -1.0,  1.0 ), 
			   vec2(  1.0, 1.0 ), vec2( 1.0, -1.0)];
		
    //  Configure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 0.0, 0.0, 1.0 );
	
    //  Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    // Load the data into the GPU
	buff1 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, buff1 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(trap), gl.STATIC_DRAW );
	
	buff2 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, buff2 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(tri), gl.STATIC_DRAW );	
	
	buff3 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, buff3 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(sq), gl.STATIC_DRAW );
	
    // Associate our shader variables with our data buffer
	pos1 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( pos1, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( pos1 );
	
	pos2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( pos2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( pos2 );
	
	pos3 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( pos3, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( pos3 );

    render();
	canvas.onmousedown = function(ev) {display()};
};

function render(){
    gl.clear( gl.COLOR_BUFFER_BIT );
	gl.bindBuffer( gl.ARRAY_BUFFER, buff1 );
    gl.vertexAttribPointer( pos1, 2, gl.FLOAT, false, 0, 0 );
	gl.drawArrays( gl.TRIANGLE_FAN, 0, 5 );
}

function display(){
	if(i== 0){
		gl.bindBuffer( gl.ARRAY_BUFFER, buff2 );
   		gl.vertexAttribPointer( pos1, 2, gl.FLOAT, false, 0, 0 );
		gl.drawArrays( gl.TRIANGLE_FAN, 0, 3 );
	}
	if(i== 1){
		gl.bindBuffer( gl.ARRAY_BUFFER, buff3 );
    	gl.vertexAttribPointer( pos1, 2, gl.FLOAT, false, 0, 0 );
		gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
	}
	if(i== 2){
		gl.bindBuffer( gl.ARRAY_BUFFER, buff1 );
    	gl.vertexAttribPointer( pos1, 2, gl.FLOAT, false, 0, 0 );
		gl.drawArrays( gl.TRIANGLE_FAN, 0, 5 );
	}
	if(i== 3){
		gl.bindBuffer( gl.ARRAY_BUFFER, buff2 );
   		gl.vertexAttribPointer( pos1, 2, gl.FLOAT, false, 0, 0 );
		gl.drawArrays( gl.TRIANGLE_FAN, 0, 3 );
		i = 0;
	}
	i = i + 1;
}
