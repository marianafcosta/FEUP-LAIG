var DEGREE_TO_RAD = Math.PI / 180;
var FPS = 60;
var GAME_DIMENSIONS = 5;

/**
 * XMLscene class, representing the scene that is to be rendered.
 */
class XMLscene extends CGFscene {
    /**
     * @constructor
     * @param {MyInterface} myinterface 
     */
    constructor(myinterface) {
        super();

        this.interface = myinterface;
        this.lightValues = {};
    }
    /**
     * Initializes the scene, setting some WebGL defaults, initializing the camera and the axis.
     * @param {CGFApplication} application
     */
    init(application) {
        super.init(application);

        this.sceneInited = false;

        this.initCameras();

        this.enableTextures(true);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.axis = new CGFaxis(this);
        this.axisOn = 0;
        this.axisDisplay = function(){
            this.axisOn = !(this.axisOn);
        };

        this.prevTime = -1;
        this.deltaTime = 0;
        this.setUpdatePeriod(1000 * (1/FPS));
        
        //project 3
    

        this.allGraphs = [];
        this.currGraph = -1;
        this.numGraphsLoaded = 0;

        this.setPickEnabled(true);

        this.game = null;
        this.playerPOV = false;
        
    }
    /**
     * Initializes the scene cameras.
     */
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
    }
    /**
     * Initializes the scene lights with the values read from the XML file.
     */
    initLights() {
        // Reads the lights from the scene graph.
        for (let i = 0; i < this.graph.lights.length; i++) {
            if (i >= 8)
                break; // Only eight lights allowed by WebGL.

            var light = this.graph.lights[i];
            
            if (light[0] === "omni") {
                this.lights[i].setPosition(light[3][0], light[3][1], light[3][2], light[3][3]);
                this.lights[i].setAmbient(light[4][0], light[4][1], light[4][2], light[4][3]);
                this.lights[i].setDiffuse(light[5][0], light[5][1], light[5][2], light[5][3]);
                this.lights[i].setSpecular(light[6][0], light[6][1], light[6][2], light[6][3]);
            } else if (light[0] === "spot") {
                this.lights[i].setPosition(light[5][0], light[5][1], light[5][2], light[5][3]);
                this.lights[i].setAmbient(light[7][0], light[7][1], light[7][2], light[7][3]);
                this.lights[i].setDiffuse(light[8][0], light[8][1], light[8][2], light[8][3]);
                this.lights[i].setSpecular(light[9][0], light[9][1], light[9][2], light[9][3]);
                this.lights[i].setSpotCutOff(light[3]);
                this.lights[i].setSpotExponent(light[4]);
                this.lights[i].setSpotDirection(light[6][0] - light[5][0], light[6][1] - light[5][1], light[6][2] - light[5][2]);
            }

            this.lights[i].setVisible(true);
            if (light[2])
                this.lights[i].enable();
            else
                this.lights[i].disable();

            this.lights[i].update();  
        }
    }
    /* 
     * Handler called when the graph is finally loaded. As loading is asynchronous, this may be called already after the application has started the run loop
     */
    onGraphLoaded() {

        this.numGraphsLoaded++;
        
        if (this.numGraphsLoaded == NUM_OF_GRAPHS) {
            //placeholder values
            this.camera.near = 0.1;
            this.camera.far = 500;

            console.log(this.graph.filename);
    
            //making sure all graphs have the correct game associated with them
            for (let i = 0; i < this.allGraphs.length; i++) {
                this.allGraphs[i].primitives["game"]["primitive"] = this.game;
                this.allGraphs[i].primitives["clock"]["primitive"] = this.clock;
                this.allGraphs[i].primitives["counter"]["primitive"] = this.game.counter;
            }
    
            this.axis = new CGFaxis(this, this.graph.axis_length);
    
            //ambient and background details according to parsed graph
            this.initLights();
            this.setGlobalAmbientLight(this.graph.ambient[0], this.graph.ambient[1], this.graph.ambient[2], this.graph.ambient[3]);
            this.gl.clearColor(this.graph.background[0], this.graph.background[1], this.graph.background[2], this.graph.background[3]);
            // Adds lights group.
            //this.interface.addAxisCheckBox();
            this.interface.addLightsGroup(this.graph.lights);
            this.interface.addScenesGroup();
            this.interface.addViewsGroup(this.graph.cameras);
            this.interface.addGameGroup(this.game);

        }
        this.sceneInited = true;
        

    }

    reloadGraph() {
        
        if (this.currGraph == this.allGraphs.length-1) {
            this.currGraph = 0;
        } else {
            this.currGraph++;
        }
        this.graph = this.allGraphs[this.currGraph];
        
        this.initLights();
        this.setGlobalAmbientLight(this.graph.ambient[0], this.graph.ambient[1], this.graph.ambient[2], this.graph.ambient[3]);
        this.gl.clearColor(this.graph.background[0], this.graph.background[1], this.graph.background[2], this.graph.background[3]);
    }
    /**
     * Checks if M was pressed to cycle materials
     */
    checkKeys() {
        var text="Keys pressed: ";
        var keysPressed=false;

        if (this.interface.wasKeyReleased("KeyM")) {
            text += " M ";
            keysPressed = true;
            this.interface.releasedKeys["KeyM"] = false;
            this.updateMaterials();
        }

        if (keysPressed) {
            console.log(text);
        } 
    }
    /**
     * update function
     */
    update(currTime) {

        if (this.lastTime === -1) {
            this.lastTime = currTime;
        } else {
            this.deltaTime = currTime - this.lastTime;
            this.lastTime = currTime;
        }

        if(this.clock != null)
            this.clock.update(this.deltaTime, this.game);
        this.updateAnimations(this.deltaTime);
        this.updateWater(this.deltaTime);
        this.checkKeys();
        
        //project 3
        if (this.game != null) {
            if(this.game.clock == null){
                this.game.clock = this.clock;
                this.game.duration = this.clock.time;
            }
            this.game.stateMachine();
            this.updateGameAnimations(this.deltaTime);
            this.updateGameCamera(this.deltaTime);
        }
    }

    /**
     * function to cycle the materials of the components
     */
    updateMaterials() {
        for (var key in this.graph.components) {

            if((this.graph.components[key]["activeMaterial"] >= 0) && (this.graph.components[key]["activeMaterial"] < this.graph.components[key]["materials"].length - 1)) {
                this.graph.components[key]["activeMaterial"] = this.graph.components[key]["activeMaterial"] + 1;
            } else {
                this.graph.components[key]["activeMaterial"] = 0;
            }
        }
    }

    /**
     * function to update animations
     */
    updateAnimations(deltaTime) {
        for (var key in this.graph.components) {
            
           if(this.graph.components[key]["animations"].length > 0) {
            this.graph.components[key]["animations"][this.graph.components[key]["activeAnimation"]].update(deltaTime);
           }

        }
    }

    updateWater(deltaTime) {
        for (var key in this.graph.primitives) {
            if (this.graph.primitives[key]["type"] == "water") {
                this.graph.primitives[key]["primitive"].update(deltaTime);
            }
        }
    }

    //Project 3

    updateGameAnimations(deltaTime) {
        for (let i = 0; i < this.game.board.pieces.length; i++) {
            if (this.game.board.pieces[i].currAnimation != null) {
                this.game.board.pieces[i].currAnimation.update(deltaTime);
            }
        }
    }

    updateGameCamera(deltaTime) {
        if ((this.game.state == 'move_camera' || 
        this.game.state == 'set_bot_camera' || 
        this.game.state == 'set_pvc_camera' || 
        this.game.state == 'reset_camera' || 
        this.game.state == 'reset_bot_camera' ||
        this.game.state == 'reset_pvc_camera') && !this.game.areAnimationsRunning()) {
            this.game.cameraAngInc = Math.PI * (deltaTime/1000);
            this.game.currCameraAng += this.game.cameraAngInc;
            
        }
    }
    

    /**
     * Displays the scene.
     */
    display() {
  
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();

        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        this.pushMatrix();
            if (this.sceneInited) {
                // Draw axis
                if(this.axisOn)
                    this.axis.display();

                var i = 0;

                for (var key in this.lightValues) {
                    if (this.lightValues.hasOwnProperty(key)) {
                        if (this.lightValues[key]) {
                            this.lights[i].setVisible(true);
                            this.lights[i].enable();
                        }
                        else {
                            this.lights[i].setVisible(false);
                            this.lights[i].disable();
                        }
                        
                        this.lights[i].update();
                        i++;
                    }
                }

                // Displays the scene (MySceneGraph function).
                this.graph.displayScene();
            }
            else {
                // Draw axis
                this.axis.display();
            }
            this.popMatrix();
            
		}
		
}