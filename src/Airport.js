var Airport = function(){
  this._planes = [];
  this.weather = new Weather();
};

Airport.prototype.landPlane = function(plane) {
  if (this.weather.isStormy === true) {
    throw new Error("Plane cannot land during a storm");
  } else {
    plane.land();
    this._planes.push(plane);
  }
};

Airport.prototype.takeOffPlane = function(plane) {
  plane.takeOff();
  this._planes.pop(plane);
};
