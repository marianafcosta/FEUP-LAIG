/**
 * Vehicle class
 */
class MyVehicle extends CGFobject {
    /**
     * @constructor
     * @param {XMLscene} scene 
     */
    constructor(scene){
        super(scene);

        this.metalTexture = new CGFtexture(this.scene, "./scenes/images/quarters.jpg");
        this.glassTexture = new CGFtexture(this.scene, "./scenes/images/glass.png");
        this.quartersTexture = new CGFtexture(this.scene, "./scenes/images/quarters.jpg");
        this.engineTexture = new CGFtexture(this.scene, "./scenes/images/white_metal.jpg");

        this.plane = new MyPlane(scene, 20, 20);
        this.cone = new MyCylinder2(scene, 0.5, 1, 1, 60, 60);
        this.cylinder = new MyCylinder2(scene, 0.2, 0.2, 1, 60, 60);
        this.circle = new MyCircle(scene, 60);
        this.top = new MyPatch(
            scene,
            4, 4, 60, 60,
            [
                [0, 0, 5],
                [0, 0, 4.7],
                [0, 0, 0.3],
                [0, 0, 0],

                [0.1, 0, 5],
                [0.1, 3, 4.7],
                [0.1, 0.75, 0.3],
                [0.1, 0, 0],

                [2.9, 0, 5],
                [2.9, 3, 4.7],
                [2.9, 0.75, 0.3],
                [2.9, 0, 0],

                [3, 0, 5],
                [3, 0, 4.7],
                [3, 0, 0.3],
                [3, 0, 0],
            ]
        )

        this.hull = new MyPatch(
            scene,
            4, 4, 60, 60, // (U, V)
            [
                [-1.75, 0, 4], //(0,0)
                [-2, 0, 3.5], //(0,1)
                [-2, 0, 1.5], //(0,2)
                [-0.25, 0, 0], //(0,3)

                [-1, 0, 5], //(1,0)
                [-0.25, 4, 3.5], //(1,1)
                [-0.25, 1, 1.5], //(1,2)
                [-0.05, 0.25, 0], //(1,3)

                [1, 0, 5], //(2,0)
                [0.25, 4, 3.5], //(2,1)
                [0.25, 1, 1.5], //(2,2)
                [0.05, 0.25, 0], //(2,3)

                [1.75, 0, 4], //(3,0)
                [2, 0, 3.5], //(3,1)
                [2, 0, 1.5], //(3,2)
                [0.25, 0, 0] //(3,3)
            ]
        );

        this.deck = new MyPatch(
            scene,
            4, 4, 60, 60, // (U, V)
            [
                [-1.75, 0, 4], //(0,0)
                [-2, 0, 3.5], //(0,1)
                [-2, 0, 1.5], //(0,2)
                [-0.25, 0, 0], //(0,3)

                [-1, 0, 5], //(1,0)
                [-0.25, 0, 3.5], //(1,1)
                [-0.25, 0, 1.5], //(1,2)
                [-0.05, 0, 0], //(1,3)

                [1, 0, 5], //(2,0)
                [0.25, 0, 3.5], //(2,1)
                [0.25, 0, 1.5], //(2,2)
                [0.05, 0, 0], //(2,3)

                [1.75, 0, 4], //(3,0)
                [2, 0, 3.5], //(3,1)
                [2, 0, 1.5], //(3,2)
                [0.25, 0, 0] //(3,3)
            ]
        );

        this.bow = new MyPatch(
            scene,
            4, 4, 60, 60, // (U, V)
            [
                [-0.25, 0, 0], //(0,0)
                [-0.20, 0, -0.5], //(0,1)
                [-0.15, 0, -0.75], //(0,2)
                [-0.025, 0, -1], //(0,3)

                [-0.05, 0.25, 0], //(1,0)
                [-0.05, 0.25, -0.5], //(1,1)
                [-0.05, 0.25,-0.75], //(1,2)
                [-0.0125, 0, -1], //(1,3)

                [0.05, 0.25, 0], //(2,0)
                [0.05, 0.25, -0.5], //(2,1)
                [0.05, 0.25, -0.75], //(2,2)
                [0.0125, 0, -1], //(2,3)

                [0.25, 0, 0], //(3,0)
                [0.20, 0, -0.5], //(3,1)
                [0.15, 0, -0.75], //(3,2)
                [0.025, 0, -1] //(3,3)
            ]
        );

        this.topBow = new MyPatch(
            scene,
            4, 4, 60, 60, // (U, V)
            [
                [-0.25, 0, 0], //(0,0)
                [-0.20, 0, -0.5], //(0,1)
                [-0.15, 0, -0.75], //(0,2)
                [-0.025, 0, -1], //(0,3)

                [-0.05, 0, 0], //(1,0)
                [-0.05, 0, -0.5], //(1,1)
                [-0.05, 0,-0.75], //(1,2)
                [-0.0125, 0, -1], //(1,3)

                [0.05, 0, 0], //(2,0)
                [0.05, 0, -0.5], //(2,1)
                [0.05, 0, -0.75], //(2,2)
                [0.0125, 0, -1], //(2,3)

                [0.25, 0, 0], //(3,0)
                [0.20, 0, -0.5], //(3,1)
                [0.15, 0, -0.75], //(3,2)
                [0.025, 0, -1] //(3,3)
            ]
        );

        this.quarters = new MyPatch(
            scene,
            4, 4, 60, 60, // (U, V)
            [
                [-1.75, 0, 4], //(0,0)
                [-2, 0, 3.5], //(0,1)
                [-2, 0, 1.5], //(0,2)
                [-1.75, 0, 4], //(0,3)

                [-1, 0, 5], //(1,0)
                [-0.25, 4, 3.5], //(1,1)
                [-0.25, 1, 1.5], //(1,2)
                [-1, 0, 5], //(1,3)

                [1, 0, 5], //(2,0)
                [0.25, 4, 3.5], //(2,1)
                [0.25, 1, 1.5], //(2,2)
                [1, 0, 5], //(2,3)

                [1.75, 0, 4], //(3,0)
                [2, 0, 3.5], //(3,1)
                [2, 0, 1.5], //(3,2)
                [1.75, 0, 4] //(3,3)
            ]
        );

        this.wing = new MyPatch(
            scene,
            4, 4, 60, 60, // (U, V)
            [
                [-3.5, 0, 6], //(0,0)
                [-2.5, 0, 3.5], //(0,1)
                [-2.5, 0, 1.5], //(0,2)
                [-5.5, 0, 0], //(0,3)

                [-1.25, 0, 5], //(1,0)
                [-1.25, 0, 3.5], //(1,1)
                [-1.25, 0, 1.5], //(1,2)
                [-1.25, 0, 0], //(1,3)

                [1.25, 0, 5], //(2,0)
                [1.25, 0, 3.5], //(2,1)
                [1.25, 0, 1.5], //(2,2)
                [1.25, 0, 0], //(2,3)

                [2.5, 0, 8], //(3,0)
                [2.5, 0, 3.5], //(3,1)
                [2.5, 0, 1.5], //(3,2)
                [2.5, 0, 0] //(3,3)
            ]
        );

        this.viewport = new MyPatch(
            scene,
            4, 4, 60, 60, // (U, V)
            [
                [-1.25, 0, 3.5], //(0,0)
                [-1.25, 0, 3.5], //(0,1)
                [-1.25, 0, 1.5], //(0,2)
                [-1.25, 0, 1.5], //(0,3)

                [-1.25, 0, 3.5], //(1,0)
                [-1.25, 1.5, 3.5], //(1,1)
                [-1.25, 1.5, 1.5], //(1,2)
                [-1.25, 0, 1.5], //(1,3)

                [1.25, 0, 3.5], //(2,0)
                [1.25, 1.5, 3.5], //(2,1)
                [1.25, 1.5, 1.5], //(2,2)
                [1.25, 0, 1.5], //(2,3)

                [1.25, 0, 3.5], //(3,0)
                [1.25, 0, 3.5], //(3,1)
                [1.25, 0, 1.5], //(3,2)
                [1.25, 0, 1.5] //(3,3)
            ]
        );


    };

    /**
     * Object display
     */
    display(){

        //  body

        this.glassTexture.bind();

        this.scene.pushMatrix();
            this.scene.translate(0, 0, 1);
            this.scene.scale(0.5, 0.5, 0.5);
            this.scene.translate(0,0,-2.5);
            //this.scene.rotate(Math.PI, 0, 1, 0);
            //this.scene.rotate(Math.PI, 0, 0, 1);
            this.viewport.display();
        this.scene.popMatrix();

        this.glassTexture.unbind();

        this.engineTexture.bind();

        this.scene.pushMatrix();
        this.scene.translate(0,0,2.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
            this.scene.translate(0, 0, 0.75);
            //this.scene.rotate(Math.PI, 0, 0, 1);
            this.scene.scale(0.75, 0.75, 0.75);
            //this.scene.translate(0.5, 0, 0.5);
            this.quarters.display();
        this.scene.popMatrix();

        this.engineTexture.unbind();

        this.metalTexture.bind();

        this.scene.pushMatrix();
        this.scene.translate(0,0,2.5);
            this.scene.rotate(Math.PI, 0, 1, 0);
            this.scene.rotate(Math.PI, 0, 0, 1);
            this.hull.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0,2.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
            //this.scene.translate(4.5, 0, 0.5);
            //this.scene.rotate(Math.PI, 0, 0, 1);
            //this.scene.scale(1, 1, 5);
            //this.scene.translate(0.5, 0, 0.5);
            this.deck.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0,2.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
            //this.scene.translate(4.5, 0, 0.5);
            this.scene.rotate(Math.PI, 0, 0, 1);
            //this.scene.scale(1, 1, 5);
            //this.scene.translate(0.5, 0, 0.5);
            this.bow.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0,2.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
            //this.scene.translate(4.5, 0, 0.5);
            //this.scene.rotate(Math.PI, 0, 0, 1);
            //this.scene.scale(1, 1, 5);
            //this.scene.translate(0.5, 0, 0.5);
            this.topBow.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(0,0,2.5);
            this.scene.rotate(Math.PI, 0, 1, 0);
            this.scene.translate(0, 0, 4);
            this.scene.rotate(Math.PI/2, 1, 0, 0);
            this.scene.rotate(-Math.PI/2, 0, 0, 1);
            this.scene.scale(0.25, 0.25, 0.25);
            //this.scene.translate(0.5, 0, 0.5);
            this.wing.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
            this.scene.translate(0,-0.025,-1);
            this.scene.rotate(-Math.PI/2, 0, 0, 1);
            this.scene.rotate(Math.PI, 0, 1, 0);
            this.scene.translate(-0.6, 0, 0);
            this.scene.scale(0.25, 0.25, 0.25);
            this.wing.display();
        this.scene.popMatrix();

        //engine

        //conectors
        
        this.scene.pushMatrix();
            this.scene.translate(0,0,2.5);
            this.scene.rotate(Math.PI, 0, 1, 0);
            this.scene.translate(-1.9, -0.05, 2.5);
            this.scene.rotate(-Math.PI/6, 0, 0, 1);
            this.scene.rotate(Math.PI/2, 0, 1, 0);
            this.scene.scale(1, 1, 2);
            this.scene.translate(0,0,-0.5);
            this.cylinder.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
            this.scene.translate(0,0,2.5);
            this.scene.rotate(Math.PI, 0, 1, 0);
            this.scene.translate(1.9, -0.05, 2.5);
            this.scene.rotate(Math.PI/6, 0, 0, 1);
            this.scene.rotate(Math.PI/2, 0, 1, 0);
            this.scene.scale(1, 1, 2);
            this.scene.translate(0,0,-0.5);
            this.cylinder.display();
        this.scene.popMatrix(); 

        this.metalTexture.unbind();

        this.engineTexture.bind();

        //thrusters

        this.scene.pushMatrix();
            this.scene.translate(0,0,2.5);
            this.scene.rotate(Math.PI, 0, 1, 0);
            this.scene.translate(2.75, 0.25, 3.5);
            this.scene.scale(0.5, 0.5, 1.5);
            this.scene.rotate(Math.PI, 0, 1, 0);
            this.cone.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(0,0,2.5);
            this.scene.rotate(Math.PI, 0, 1, 0);
            this.scene.translate(2.75, 0.25, 3.5);
            this.scene.scale(0.25, 0.25, 1);
            this.circle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(0,0,2.5);
            this.scene.rotate(Math.PI, 0, 1, 0);
            this.scene.translate(2.75, 0.25, 2);
            //this.scene.translate(0, 0, -0.50);
            this.scene.scale(0.5, 0.5, 1);
            this.scene.rotate(Math.PI, 1, 0, 0);
            this.circle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(0,0,2.5);
            this.scene.rotate(Math.PI, 0, 1, 0);
      
            this.scene.translate(-2.75, 0.25, 3.5);
            this.scene.scale(0.5, 0.5, 1.5);
            this.scene.rotate(Math.PI, 0, 1, 0);
            this.cone.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(0,0,2.5);
            this.scene.rotate(Math.PI, 0, 1, 0);
            
            this.scene.translate(-2.75, 0.25, 3.5);
            this.scene.scale(0.25, 0.25, 1);
            this.circle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(0,0,2.5);
            this.scene.rotate(Math.PI, 0, 1, 0);
         
            this.scene.translate(-2.75, 0.25, 2);
            //this.scene.translate(0, 0, -0.50);
            this.scene.scale(0.5, 0.5, 1);
            this.scene.rotate(Math.PI, 1, 0, 0);
            this.circle.display();
        this.scene.popMatrix();

        this.engineTexture.unbind();

    };

};