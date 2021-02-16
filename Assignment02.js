"use strict";

let gl;
let points;
let colors;

window.onload = function init()
{
    let canvas = document.getElementById( "gl-canvas" );

    gl = canvas.getContext('webgl2');
    if (!gl) { alert( "WebGL 2.0 isn't available" ); }

    colors = [
        vec3(1, .61, 0.1),
        vec3(0, 0, 0),
        vec3(1, .61, 0.1),
        vec3(1, .61, 0.1),
        vec3(0, 0, 0),
        vec3(1, .61, 0.1),
        vec3(1, .61, 0.1),
        vec3(0, 0, 0),
        vec3(1, .61, 0.1),
        vec3(1, 1, 0),
        vec3(1, 1, 0),
        vec3(1, 1, 0),
        vec3(1, 1, 0),
        vec3(1, 1, 0),
        vec3(1, 1, 0),
        vec3(0, 0, 0),
        vec3(0, 0, 0),
        vec3(0, 0, 0),
        vec3(0, 0, 0),
        vec3(0, 0, 0),
        vec3(0, 0, 0),
        vec3(0, 0, 0),
        vec3(0, 0, 0),
        vec3(0, 0, 0),
    ];
    points = [
        vec2(1,0.6),
        vec2(0.5,0),
        vec2(0,0.6),
        vec2(1,0.6),
        vec2(0.8,1),
        vec2(0.7,0.6),
        vec2(0,0.6),
        vec2(0.2,1),
        vec2(0.3,0.6),
        vec2(0.08,0.6),
        vec2(0.2,0.85),
        vec2(0.26,0.6),
        vec2(0.92,0.6),
        vec2(0.8,0.85),
        vec2(0.74,0.6),
        vec2(0.80,0.4),
        vec2(0.60,0.55),
        vec2(0.60,0.4),
        vec2(0.20,0.4),
        vec2(0.40,0.55),
        vec2(0.40,0.4),
        ];

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );


    let program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    let cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    let colorLoc = gl.getAttribLocation(program, "aColor");
    gl.vertexAttribPointer(colorLoc, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorLoc);


    let bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );


    let aPosition = gl.getAttribLocation( program, "aPosition" );
    gl.vertexAttribPointer( aPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( aPosition );

    render();
};

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, points.length );
}