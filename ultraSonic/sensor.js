var usonic = require('r-pi-usonic'),
    delay = 1000,
    sideSensorArray = [],
    frontSensorArray = [],
    topSensorArray = [];
usonic.init(function(error){
  if(error){
    console.log(error);
  }
  else{
    var topSensor = usonic.createSensor(23, 24, delay);
   // var sideSensor = usonic.createSensor(14, 15, delay);
   // var frontSensor = usonic.createSensor(8, 7, delay);

    console.log(topSensor().toFixed(2));
    topSensorArray.push(topSensor().toFixed(2));
    console.log(topSensorArray);
    for(var i = 0; i < 2; i++){
        topSensorArray.push(topSensor().toFixed(2));
    }
console.log(topSensorArray);
}
});
