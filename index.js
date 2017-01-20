/*global THREE*/

// get svg node from html
var svg = document.querySelector('svg');

///////////////////////////////////////////////////////////////////////////////

// get actual height and width of the svg node elem
var width = svg.clientWidth;
var height = svg.clientHeight;
// reset actual values instead of percent to keep aspect ratio
// in threeJS
svg.setAttribute('height', height + 'px');
svg.setAttribute('width', width + 'px');
// turn svg node into string
var svgString = (new XMLSerializer()).serializeToString(svg);

///////////////////////////////////////////////////////////////////////////////

// create camera, scene, light, and the plane geo
var camera, scene, light, planeGeo, planeMat, plane, renderer;

camera = new THREE.OrthographicCamera( -width / 2, width / 2, height / 2, -height / 2, 0.1, 10000);
scene = new THREE.Scene();
light = new THREE.AmbientLight(0x404040);
planeGeo = new THREE.PlaneGeometry(width, height, 1, 1);

scene.add(light);

renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width, height);

// clear the body and render only the canvas with the svg element
document.body.innerHTML = '';
document.body.appendChild(renderer.domElement);

///////////////////////////////////////////////////////////////////////////////

// can't set actual width and height
// loadSVGFromFile();

createSVG();

///////////////////////////////////////////////////////////////////////////////

function loadSVGFromFile() {
  var fileLoader = new THREE.FileLoader();

  fileLoader.load('./test.svg', function(svg) {
    createPlane(svg, function() {
    });


  }, function() {

  }, function(e) {
    console.log(e);
  });
}

function createSVG() {
  createPlane(svgString, function() {
    render();
  });
}

// used to add animation to the canvas
function render() {
  requestAnimationFrame(render);
  // plane.rotation.x += 0.01;

  renderer.render(scene,camera);
}

function createPlane(svg, cb) {
  // create an image dom node with the src a data uri with the parsed svg
  var img = document.createElement('img');
  img.setAttribute('src', 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(svg))));
  img.height = 1024;
  img.width = 1024;

  img.onload = function() {
    console.log(this.height);
    console.log(this.width);
    var texture = new THREE.Texture(this);
    texture.needsUpdate = true;

    planeMat = new THREE.MeshBasicMaterial({map: texture});
    planeMat.map.minFilter = THREE.LinearFilter;
    planeMat.side = THREE.DoubleSide;
    plane = new THREE.Mesh(planeGeo, planeMat);
    plane.position.z = -1;

    console.log('plane added to scene');
    scene.add(plane);

    if(cb) {
      cb();
    }
  };
}

function createCube2(svg, cb) {
  var img = document.createElement('img');
  img.setAttribute('src', 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(svg))));

  img.onload = function() {
    var texture = new THREE.Texture(this);
    texture.needsUpdate = true;

    var cubematerial2 = new THREE.MeshBasicMaterial({color: 0xFF9999, wireframe: true});
    //cubematerial2.map.minFilter = THREE.LinearFilter;
    var cube2 = new THREE.Mesh(cubegeometry2, cubematerial2);
    cube2.translateX(250);

    console.log('cube added to scene');
    scene.add(cube2);

    if(cb) {
      cb();
    }
  };
}

function createCube1(svg, cb) {
  var canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  var ctx = canvas.getContext('2d');

  var img = document.createElement('img');
  img.setAttribute('src', 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(svg))));

  img.onload = function() {
    ctx.drawImage(img, 0, 0);

    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    var cubematerial1 = new THREE.MeshBasicMaterial({color: 0x66FF33, wireframe: true});
    //cubematerial1.map.minFilter = THREE.LinearFilter;
    var cube1 = new THREE.Mesh(cubegeometry1, cubematerial1);

    console.log('cube2 added to scene');
    scene.add(cube1);

    if(cb) {
      cb();
    }
  };
}
