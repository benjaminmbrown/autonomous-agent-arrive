var Vehicle = function(x, y) {
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, -2);
    this.position = createVector(x, y);
    this.r = 6;
    this.maxSpeed = 4;
    this.maxForce = 0.1;

    this.seek = function(target) {
        var desired = p5.Vector.sub(target, this.position);
        //desired.normalize();
        desired.setMag(this.maxSpeed);
        var steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxForce);
        this.applyForce(steer);
    }

    this.arrive = function(target) {
        var desired = p5.Vector.sub(target,this.position); //vector pointing FROM loc TO target
        var distance = desired.mag();
        //damping within 100 pixels


        if (distance < 100) {
        	//set magnitude according to how close we are
            var scaledSpeed = map(distance, 0, 100, 0, this.maxSpeed);
            desired.setMag(scaledSpeed);
        } else { desired.setMag(this.maxSpeed) }

        //Steer - desired minus velocity

        var steer = p5.Vector.sub(desired, this.velocity);//steer = desired-velocity
        steer.limit(this.maxForce);
        this.applyForce(steer);


    }

    this.update = function() { //Standard Euler integration motion

        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.position.add(this.velocity);
        this.acceleration.mult(0);

        //TODO: max force and speed vary based on life

    }

    this.applyForce = function(force) {
        this.acceleration.add(force);
    }

    this.display = function() {
        var theta = this.velocity.heading() + PI / 2;
        fill(127);
        stroke(200);
        strokeWeight(1);
        push();
        translate(this.position.x, this.position.y);
        rotate(theta);
        beginShape();
        vertex(0, -this.r * 2);
        vertex(-this.r, this.r * 2);
        vertex(this.r, this.r * 2);
        endShape(CLOSE);
        pop();
    }

    //inverse of seek 
    this.flee = function(target) {
            var desired = p5.Vector.sub(this.position, target);
            //desired.normalize();
            desired.setMag(1);
            var steer = p5.Vector.sub(desired, this.velocity);
            steer.limit(this.maxForce);
            this.applyForce(steer);
        }
        /*Implement seeking a moving target, often referred to as “pursuit.” 
        In this case, your desired vector won’t point towards the object’s 
        current location, but rather its “future” location as extrapolated 
        from its current velocity. We’ll see this ability for a vehicle to 
        “predict the future” in later examples.
        */
    this.pursue = function() {
        //anticipate future location as target position

        //get accelleration and magnitude


        var desired = p5.Vector.sub(target, this.position);
        //desired.normalize();
        desired.setMag(this.maxSpeed);
        var steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxForce);
        this.applyForce(steer);
    }




}
