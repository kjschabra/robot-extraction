var
    async = require('async'),
    gpio = require('pi-gpio'),
    socket = require('socket.io'),
    Gpio = require('pigpio').Gpio,
    usonic = require('r-pi-usonic'),
    delay = 1000,
    topSensor,
    sideSensor,
    frontSensor,
    sideSensorArray = [],
    frontSensorArray = [],
    topSensorArray = [];


var socket = require('socket.io-client')('http://141.117.161.70:22788');

usonic.init(function(error){
  if(error){
    return error;
  }
  else{
    topSensor = usonic.createSensor(23, 24, delay);
    // sideSensor= usonic.createSensor(14, 15, delay);
    // frontSensor = usonic.createSensor(8, 7, delay);
  }
});

//the car code starts here
//----------------------------------

var leftPower = new Gpio(21, {
    mode: Gpio.OUTPUT
});
var rightPower = new Gpio(17, {
    mode: Gpio.OUTPUT
});

var leftPowerAmount = 100;
var rightPowerAmount = 100;

var car = {

    //assign pin numbers to variables for later use
    motors: {


        leftFront: 38,
        leftBack: 36,
        //  rightPower: 36
        rightFront: 13,
        rightBack: 15
    },

    //open the gpio pins and set them as outputs
    init: function () {
        //   gpio.close(this.motors.leftPower);
        gpio.close(this.motors.leftFront);
        gpio.close(this.motors.leftBack);
        //   gpio.close(this.motors.rightPower);
        gpio.close(this.motors.rightFront);
        gpio.close(this.motors.rightBack);

        //     gpio.open(this.motors.leftPower, "output", function (err) {});
        gpio.open(this.motors.leftFront, "output", function (err) {});
        gpio.open(this.motors.leftBack, "output", function (err) {});

        //    gpio.open(this.motors.rightPower, "output", function (err) {});
        gpio.open(this.motors.rightFront, "output", function (err) {});
        gpio.open(this.motors.rightBack, "output", function (err) {});

    },


    shootBall: function () {
    },

    resetBall: function () {
        gpio.write(7, 0, function (err) {});
    },
    //for moving forward we power both motors
    moveForward: function () {
        console.log(topSensor().toFixed(2));
        // console.log(sideSensor().toFixed(2));
        // console.log(frontSensor().toFixed(2));
        leftPower.pwmWrite(leftPowerAmount, function (err) {});
        //gpio.write(this.motors.leftPower, 1, function (err) {});
        gpio.write(this.motors.leftFront, 1, function (err) {});

        rightPower.pwmWrite(rightPowerAmount, function (err) {});
        //  gpio.write(this.motors.rightPower, 1, function (err) {});
        gpio.write(this.motors.rightFront, 1, function (err) {});
        console.log('testing');
    },

    //for moving backward we power both motors but in backward mode
    moveBackward: function () {
        leftPower.pwmWrite(leftPowerAmount, function (err) {});
        //  gpio.write(this.motors.leftPower, 1, function (err) {});
        gpio.write(this.motors.leftBack, 1, function (err) {});

	      console.log('starting to move right back');
        rightPower.pwmWrite(rightPowerAmount, function (err) {});
        //    gpio.write(this.motors.rightPower, 1, function (err) {});
        gpio.write(this.motors.rightBack, 1, function (err) {});
	       console.log('moving right back');
    },

    //for turning right we power the left motor
    moveLeft: function () {
        leftPower.pwmWrite(leftPowerAmount, function (err) {});
        //  gpio.write(this.motors.leftPower, 1, function (err) {});
        gpio.write(this.motors.leftFront, 1, function (err) {});

        rightPower.pwmWrite(rightPowerAmount, function (err) {});

        //    gpio.write(this.motors.rightPower, 1, function (err) {});
        gpio.write(this.motors.rightBack, 1, function (err) {});
    },

    //for turning left we power the right motor
    moveRight: function () {
        leftPower.pwmWrite(leftPowerAmount, function (err) {});
        //  gpio.write(this.motors.leftPower, 1, function (err) {});
        gpio.write(this.motors.leftBack, 1, function (err) {});

        rightPower.pwmWrite(rightPowerAmount, function (err) {});

        //   gpio.write(this.motors.rightPower, 1, function (err) {});
        gpio.write(this.motors.rightFront, 1, function (err) {});
    },

    moveLeftFWD: function () {
        leftPower.pwmWrite(leftPowerAmount, function (err) {});
        //  gpio.write(this.motors.leftPower, 1, function (err) {});
        gpio.write(this.motors.leftFront, 1, function (err) {});
        gpio.write(this.motors.leftBack, 0, function (err) {});

    },

    moveLeftBWD: function () {
        leftPower.pwmWrite(leftPowerAmount, function (err) {});
        //  gpio.write(this.motors.leftPower, 1, function (err) {});
        gpio.write(this.motors.leftFront, 0, function (err) {});
        gpio.write(this.motors.leftBack, 1, function (err) {});
    },


    stopLeft: function () {
        leftPower.pwmWrite(0, function (err) {});
        //   gpio.write(this.motors.leftPower, 0, function (err) {});
        gpio.write(this.motors.leftFront, 0, function (err) {});
        gpio.write(this.motors.leftBack, 0, function (err) {});
    },

    moveRightFWD: function () {
        rightPower.pwmWrite(rightPowerAmount, function (err) {});
        //   gpio.write(this.motors.rightPower, 1, function (err) {});
        gpio.write(this.motors.rightFront, 1, function (err) {});
        gpio.write(this.motors.rightBack, 0, function (err) {});

    },

    moveRightBWD: function () {
        rightPower.pwmWrite(rightPowerAmount, function (err) {});

        //   gpio.write(this.motors.rightPower, 1, function (err) {});
        gpio.write(this.motors.rightFront, 0, function (err) {});
        gpio.write(this.motors.rightBack, 1, function (err) {});

    },


    stopRight: function () {
        rightPower.pwmWrite(0, function (err) {});

        //   gpio.write(this.motors.rightPower, 0, function (err) {});
        gpio.write(this.motors.rightFront, 0, function (err) {});
        gpio.write(this.motors.rightBack, 0, function (err) {});
    },


    //stop both motors in all directions
    stop: function () {
        leftPower.pwmWrite(0, function (err) {});
        rightPower.pwmWrite(0, function (err) {});

        //   gpio.write(this.motors.leftPower, 0, function (err) {});
        gpio.write(this.motors.leftFront, 0, function (err) {});
        gpio.write(this.motors.leftBack, 0, function (err) {});
        //   gpio.write(this.motors.rightPower, 0, function (err) {});
        gpio.write(this.motors.rightFront, 0, function (err) {});
        gpio.write(this.motors.rightBack, 0, function (err) {});
        gpio.write(7, 0, function (err) {});

    }
};



socket.on('connect', function () {
    console.log("RC C");
    socket.emit('car-connected', socket.id);
});
socket.on('push-position', function (data) {
    console.log("user shot with the following data: window width - " + data.windowW + " x -" + data.x + " y -" + data.y + " velocity -" + data.velocity);
});

socket.on('disconnect', function () {
    socket.emit('car-connected', 'false');
});

socket.on('move', function (direction) {
    console.log(direction);
    switch (direction) {
    case 'shoot':
        car.shootBall();
        break;
    case 'resetShot':
        car.resetBall();
        break;
    case 'up':
        car.moveForward();
        break;
    case 'down':
        car.moveBackward();
        break;
    case 'left':
        car.moveLeft();
        break;
    case 'right':
        car.moveRight();
        break;
    case 'leftSide':
        car.moveLeftFWD();
        break;
    case 'leftSideBWD':
        car.moveLeftBWD();
        break;
    case 'leftStop':
        car.stopLeft();
        break
    case 'rightSide':
        car.moveRightFWD();
        break;
    case 'rightSideBWD':
        car.moveRightBWD();
        break;
    case 'rightStop':
        car.stopRight();
        break;

    }
});
//listen for stop signal
socket.on('stop', function () {
    console.log("Stop!");
    car.stop();
});


car.init();
