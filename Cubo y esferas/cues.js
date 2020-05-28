//Codigo para hacer un cubo con esferas en los vertices
//Sebastian Palacio
//(Todos los colores en este codigo fueron elegidos usando color picker)
//Aqui creamos la camara, el rendere y la escena
var renderer;
var scene;
var camera;

	function init() {

		//modificamos los valores de nuestras variables con la libreria THREE.js
		
		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
		renderer = new THREE.WebGLRenderer();
		renderer.setClearColor(0xE78484, 1.0);
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.physicallyCorrectLights = true;
		renderer.gammaInput = true;
		renderer.gammaOutput = true;
		renderer.shadowMap.enabled = true;
		renderer.toneMapping = THREE.ReinhardToneMapping;
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth, window.innerHeight);
        
        //crear plano para el cubo
		var planeGeometry = new THREE.PlaneGeometry(20, 20);
		var planeMaterial = new THREE.MeshLambertMaterial({color: 0xFF0000});
		var plane = new THREE.Mesh(planeGeometry, planeMaterial);

		//plane.recieveShadow muestra la sombra del cubo
		plane.receiveShadow=true;
		plane.rotation.x=-0.5*Math.PI;
		plane.position.x=0;
		plane.position.y=-2;
		plane.position.z=0;
		//añadir plano
		scene.add(plane);

		//creamos el cubo
		var cubeGeometry = new THREE.BoxGeometry(6, 4, 6);
		var cubeMaterial = new THREE.MeshNormalMaterial({color: 0xff0000, transparent:true, opacity:1});
		var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        //cube.castShadow proyecta la sombra del cubo
		cube.castShadow=true;
		//añadimos el cubo
		scene.add(cube);

		camera.position.x=15;
		camera.position.y=16;
		camera.position.z=13;
		camera.lookAt(scene.position);

		//aqui creamos la iluminacion de la escena
		var ambient = new THREE.AmbientLight(0xFFFFFF, 0.3);
		scene.add(ambient);
		var light = new THREE.DirectionalLight(0xffffff, 1, 100, 2);
		light.position.set(10, 20, 20);
		light.castShadow=true;
		scene.add(light);
		document.body.appendChild(renderer.domElement);

		addVertices(cube);
		render();
	}
    //con esta funcion añadimos los vertices
	function addVertices(mesh){
		var vertices = mesh.geometry.vertices;
		var vertexMaterial = new THREE.MeshPhongMaterial({color: 0x0012FF});

		vertices.forEach(function(vertex){
			var vertexSphere = new THREE.SphereGeometry(0.15);
			var vertexMesh = new THREE.Mesh(vertexSphere, vertexMaterial);
			vertexMesh.position.copy(vertex); 
			scene.add(vertexMesh);
		});
	}

	function render(){
         
         //rotacion de la camara
		var rotSpeed=0.01;
		camera.position.x=camera.position.x*Math.cos(rotSpeed) + camera.position.z*Math.sin(rotSpeed);
		camera.position.z=camera.position.z*Math.cos(rotSpeed) - camera.position.x*Math.sin(rotSpeed);
		camera.lookAt(scene.position);

		requestAnimationFrame(render);
		renderer.render(scene, camera);
	}
     
	function handleResize(){
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
	}

	window.addEventListener("DOMContentLoaded", function(event){
		init();
	});

	window.addEventListener('resize', handleResize, false);