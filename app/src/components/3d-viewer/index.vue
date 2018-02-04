<template>
    <div class="stair-viewer" :class="{
                'stair-viewer__active': step,
                }">
        <canvas class="stair-viewer--canvas"
                ref="canvas"
                :class="{
                'stair-viewer--canvas__active': !!stairObject,
                'stair-viewer--canvas__fully-active' : step
                }"
                width="480" height="600">

        </canvas>
    </div>
</template>

<script>

    import * as BABYLON from 'babylonjs';
    import 'babylonjs-loaders';
    import {mapState} from 'vuex';
    import config from './indicator-config.js';

    export default {
        data() {
            return {
                engine: null,
                scene: null,
                canvas: null,
                camera: null,
                stairObject: null,
                indicatorBox: null,
            }
        },
        computed: mapState([
            'step'
        ]),

        watch: {
            step(newVal) {
                if (newVal === null) {
                    this.hideIndicator();
                    return;
                }

                this.showCurrentIndicator(newVal);
            },
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {
                this.canvas = this.$refs.canvas;
                this.engine = new BABYLON.Engine(this.canvas, true);

                this.engine.loadingScreen = {
                    displayLoadingUI() {

                    },
                    hideLoadingUI() {

                    }
                };
                this.createScene();
                this.createCamera();

                this.showCurrentIndicator(11);
                //this.showCurrentIndicator(this.step);

                this.engine.displayLoadingUI();


                this.engine.runRenderLoop(() => {
                    this.scene.render();
                });
            },
            showCurrentIndicator(step) {
                const {pos, size, camera} = config[step - 1];
                this.createIndicator(pos.x, pos.y, pos.z, size.w, size.h, size.d);


                this.camera.setPosition(new BABYLON.Vector3(camera.x, camera.y, camera.z));
            },
            createIndicator(x, y, z, w, h, d) {
                var boxMaterial = new BABYLON.StandardMaterial("myMaterial", this.scene);

                this.indicatorBox = BABYLON.MeshBuilder.CreateBox("box", {
                    height: h,
                    width: w,
                    depth: d
                }, this.scene);

                this.indicatorBox.position = new BABYLON.Vector3(x, y, z);

                boxMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0);
                boxMaterial.specularColor = new BABYLON.Color3(0.5, 0, 0);
                boxMaterial.emissiveColor = new BABYLON.Color3(1, 0, 0);
                boxMaterial.ambientColor = new BABYLON.Color3(0.23, 0, 0);
                boxMaterial.wireframe = true;
                this.indicatorBox.material = boxMaterial;

            },

            hideIndicator() {
                this.scene.removeMesh(this.indicatorBox);
                this.indicatorBox = null;
            },

            createCamera() {
                this.camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 0, 0, 5, new BABYLON.Vector3(0, 3, 0), this.scene);
                this.camera.setPosition(new BABYLON.Vector3(0, 350, -1000));
                this.camera.setTarget(new BABYLON.Vector3(0, 250, 0));
                //this.camera.attachControl(this.canvas, true);
            },

            createScene() {
                // This creates a basic Babylon Scene object (non-mesh)
                this.scene = new BABYLON.Scene(this.engine);
                this.scene.ambientColor = new BABYLON.Color3(1, 1, 1);
                //this.scene.forceWireframe = true;
                this.scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);

                //var lightHemi = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(0, 1000, 10), scene);
                new BABYLON.PointLight("Sunshine", new BABYLON.Vector3(20, 500, 2), this.scene);

                var loader = new BABYLON.AssetsManager(this.scene);
                var stair = loader.addMeshTask("stair", "", "/static/object/", "Exterior_Staircases_Landing_Style.obj");
                stair.onSuccess = (t) => {
                    this.stairObject = t;
                    this.engine.hideLoadingUI();
                };

                loader.onFinish = () => {
                    this.engine.runRenderLoop(() => {
                        this.scene.render();
                    });
                };

                loader.load();
            }
        }
    }
</script>
