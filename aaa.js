
//var of basic
var scene,camera,renderer;
//var of scene
scene = new THREE.Scene();
scene.background = new THREE.Color(0xffefba);
//var of camera
camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000 );
camera.position.y=90;
camera.position.z=130;
camera.position.x=-200
// camera.lookAt(0,0,-200);

console.log(camera.position)


//var of renderer
renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

//const gui
const gui = new dat.GUI();
const options = {
    'box': 0x0,
    'table':0x0,
    // 'boxTable' :0x0
    
}


//load control
var controls = new THREE.OrbitControls(camera,renderer.domElement);

let nowDistance = controls.getDistance();
console.log(nowDistance);

controls.enableDamping= true;

controls.minDistance= 40;
controls.maxDistance=137 ;
controls.enablePan = false;

controls.maxPolarAngle = Math.PI / 2 ;
controls.maxZoom = 1
controls.target.set(-10,70,0);

controls.update();

// load light
var light1 = new THREE.PointLight(0xffffff,0.6);
light1.castShadow=true;
light1.position.set(0,80,40);
scene.add(light1);

var light2 = new THREE.PointLight(0xffffff,0.6);
light2.castShadow=true;
light2.position.set(0,80,-40);
scene.add(light2);


var light3 = new THREE.PointLight(0xffffff,0.6);
light3.castShadow=true;
light3.position.set(40,80,0);
scene.add(light3);


var light4 = new THREE.PointLight(0xffffff,0.6);
light4.castShadow=true;
light4.position.set(-40,80,0);
scene.add(light4);
light1.shadow.mapSize.width = 512; // default
light1.shadow.mapSize.height = 512; // default
light1.shadow.camera.near = 0.5; // default
light1.shadow.camera.far = 500; // default



// const helper = new THREE.CameraHelper( light1.shadow.camera );
// scene.add( helper );

// var light2 = new THREE.AmbientLight( 0x707070, );
// scene.add(light2);

// var light2 = new THREE.DirectionalLight(0xffffff,0.2);

// light2.position.set(0,200,-200)
// scene.add(light2);


//draw model first step

var material1 = new THREE.MeshPhysicalMaterial({color: 0X0D0000,roughness:0.4});
var geometry1 = new THREE.BoxGeometry(200,5,200);

var model1 = new THREE.Mesh(geometry1,material1);
model1.position.set(0,-2,0)
model1.receiveShadow = true;
scene.add(model1);
//draw model second step
var material3 = new THREE.MeshPhysicalMaterial({color: 0x1D0000,roughness:0.4});
var geometry3 = new THREE.BoxGeometry(150,5,150);
var model3 = new THREE.Mesh(geometry3,material3);
model3.position.set(0,3,0)
model3.receiveShadow = true;
scene.add(model3);
/////////////////
//draw model third
var material4 = new THREE.MeshPhysicalMaterial({color: 0X0D0000,roughness:0.4});
var geometry4 = new THREE.BoxGeometry(100,5,100);

var model4 = new THREE.Mesh(geometry4,material4);
model4.position.set(0,8,0)
model4.receiveShadow = true;
scene.add(model4);
//draw model big box
const mate1 ={
    roughness : 0.5,
    color: 0x1D0000,
    side: THREE.DoubleSide,
}
var material4 = new THREE.MeshPhysicalMaterial(mate1);
var geometry4 = new THREE.BoxGeometry(400,200,400);
var model4 = new THREE.Mesh(geometry4,material4);
model4.position.set(0,97,0)
model4.receiveShadow = true;
scene.add(model4);
//shadow box
var material2 = new THREE.MeshPhongMaterial();
var geometry2 = new THREE.BoxGeometry(20,50,20);
var model2 = new THREE.Mesh(geometry2,material2);
model2.position.set(0,37,0)
model2.castShadow=true;
scene.add(model2);

/////////////////





//load models
let mixer;
var loader = new THREE.GLTFLoader();
loader.load( 'box11.glb', function ( glb ) {
	const modela = glb.scene;
    modela.castShadow=true;
    scene.add(modela);
//load animation
    mixer = new THREE.AnimationMixer(modela);
    const clips = glb.animations;
    clips.forEach(function(clip){
        
        
        const action = mixer.clipAction(clip);
        action.clampWhenFinished = true;
        action.loop = THREE.LoopOnce;
        // mixer.stopAllAction();
        action.reset();
        action.fadeIn(0.5);
        action.play();
        

        
        console.log(mixer.loop)
    });
    
    
    /////////////////////
    console.log(modela)
gui.addColor(options,'box').onChange(function(e){
    modela.getObjectByName('Box060').material.color.setHex(e)
})
gui.addColor(options,'table').onChange(function(e){
    modela.getObjectByName('Box061').material.color.setHex(e)
});
    modela.scale.set(1,1,1);
    modela.position.y=-30.5;
    modela.position.z=0;
    modela.position.x=-0;
    }, 
undefined, function ( error ) {
	console.error( error );
});
// //loader model 2
// var loader2 = new THREE.GLTFLoader();
// loader2.load( 'box12.glb', function ( glb2 ) {
// 	const modelb = glb2.scene;
//     modelb.castShadow=true;
//     modelb.scale.set(.5,.5,.5);
//     modelb.position.y=-45;
//     modelb.position.z=0;
//     modelb.position.x=-0;
//     scene.add(modelb);
//     });
    





//var threx
// const domEvents = new THREEx.DomeEvents(camera,renderer.domElement);
// domEvents.addEventListener(glb.scene,'click',event=>{
//     camer.position.z=70;
// })

// var loader2 = new THREE.GLTFLoader();
// loader2.load( 'iii.glb', function ( glb2 ) {
// scene.add(glb2.scene);
// glb2.scene.scale.set(50,50,50);
// glb2.scene.position.set(500,0,0);
// }, 
// undefined, function ( error ) {

// console.error( error );

// });




//resize
window.addEventListener('resize',function(){renderer.setSize(window.innerWidth, window.innerHeight);
camera.aspect=window.innerWidth/window.innerHeight;
});
//animate
const clock = new THREE.Clock();
function animate() {

    if(mixer)
    mixer.update(clock.getDelta());
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();

}
animate();



