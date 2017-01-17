var width = window.innerWidth - 100;
var height = window.innerHeight - 100;
var loader = new THREE.ImageLoader();

var camera = new THREE.PerspectiveCamera(70, width / height, 1, 1000);
camera.position.z = 400;

var scene = new THREE.Scene();

var light = new THREE.AmbientLight(0x404040);
var cubegeometry = new THREE.CubeGeometry(200, 200, 200);

scene.add(light);

var fileLoader = new THREE.FileLoader();

fileLoader.load('./test.svg', function(svg) {
  var svgBlob = new Blob([svg], {
    type: 'image/svg+xml'
  });

  var reader = new FileReader();

  reader.onload = function(e) {
    var dataBase64 = e.target.result;
    console.log(dataBase64);

    var img = new Image;
    img.onload = function() {
      var texture = new THREE.Texture(this);
      var cubematerial = new THREE.MeshBasicMaterial({map: texture});
      var cube = new THREE.Mesh(cubegeometry, cubematerial);

      console.log('cube added to scene');
      scene.add(cube);

      var renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);
      document.body.appendChild(renderer.domElement);
      renderer.render(scene, camera);
    };
    img.src = dataBase64;
  }

  reader.readAsDataURL(svgBlob);
}, function() {

}, function(e) {
  console.log(e);
});
