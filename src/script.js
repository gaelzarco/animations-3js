import * as THREE from 'three'
import gsap from 'gsap'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Resize
window.addEventListener('resize', () => {
    // Sizes Resize
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Camera Resize
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update Renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener('dblclick', () => {
    const fullScreenElement = document.fullscreenElement || document.webkitFullScreenElement

    if (!fullScreenElement) {
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen()
        } else if (canvas.webkitRequestFullscreen) {
            canvas.webkitRequestFullscreen()
        }
        
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen()
        } else if (document.webkitExitFullscreen) {
            document.exitFullscreen()
        }
    }
})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const clock = new THREE.Clock()

// Animations
const tick = () => {

    // Time
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    mesh.rotation.x = elapsedTime * Math.PI * 0.5
    mesh.rotation.y = elapsedTime * Math.PI * 0.5
    mesh.rotation.z = elapsedTime * Math.PI * 0.5

    mesh.position.y = Math.sin(elapsedTime * Math.PI * 0.3)
    mesh.position.x = Math.cos(elapsedTime * Math.PI * 0.1)
    

    // Render
    renderer.render(scene, camera)

    // Animation
    window.requestAnimationFrame(tick)
}

tick()