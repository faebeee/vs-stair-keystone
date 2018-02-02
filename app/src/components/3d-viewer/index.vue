<template>
    <div class="stair-viewer">
        <canvas class="stair-viewer--canvas"
                ref="canvas"
                :class="{ 'stair-viewer--canvas__active': !!stairObject}"
                width="600" height="480">

        </canvas>
    </div>
</template>

<script>

    import * as BABYLON from 'babylonjs';
    import 'babylonjs-loaders';
    import {mapState} from 'vuex';

    export default {
        data() {
            return {
                engine: null,
                scene: null,
                canvas: null,
                stairObject: null,
            }
        },
        computed: mapState([
            'step'
        ]),

        mounted() {
            this.init();
        },
        methods: {
            init() {
                this.canvas = this.$refs.canvas;
                this.engine = new BABYLON.Engine(this.canvas, true);

                this.engine.loadingScreen = {
                    loadingUIText: '0hi',
                    displayLoadingUI() {

                    },
                    hideLoadingUI() {

                    }
                };
                this.scene = this.createScene();

                this.engine.displayLoadingUI();


                this.engine.runRenderLoop(() => {
                    this.scene.render();

                    if (this.stairObject) {
                        this.update();
                    }
                });
            },
            update() {
                this.stairObject.loadedMeshes.forEach((mesh) => {
                    mesh.rotation.y += 0.005;

                    if (this.step) {

                    }
                });
            },
            createScene() {
                // This creates a basic Babylon Scene object (non-mesh)
                var scene = new BABYLON.Scene(this.engine);

                new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

                const camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 0, 0, 5, new BABYLON.Vector3(0, 3, 0), scene);
                camera.setPosition(new BABYLON.Vector3(0, 350, -1000));
                camera.setTarget(new BABYLON.Vector3(0, 250, 0));

                scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);

                //camera.attachControl(this.canvas, true);
                var lightHemi = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(0, 10, 10), scene);
                var sun = new BABYLON.PointLight("Sunshine", new BABYLON.Vector3(20, 100, 2), scene);


                var loader = new BABYLON.AssetsManager(scene);

                var stair = loader.addMeshTask("stair", "", "/static/object/", "Exterior_Staircases_Landing_Style.obj");
                stair.onSuccess = (t) => {
                    console.log(t);
                    this.stairObject = t;
                    this.engine.hideLoadingUI();

                };

                //stair.position.y = -5;

                //stair.position.y

                loader.onFinish = () => {
                    this.engine.runRenderLoop(() => {
                        this.scene.render();
                    });
                };

                loader.load();
                return scene;
            }


        }
    }
</script>
