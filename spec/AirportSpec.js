'use strict';

describe('Airport', function(){
  var airport;
  var plane;
  var weather;

  beforeEach(function(){
    airport = new Airport();
    weather = jasmine.createSpyObj('weather', ['isStormy']);
    plane = jasmine.createSpyObj('plane',['land', 'takeOff']);
  });

  it('has no planes on default', function(){
    expect(airport._planes).toEqual([]);
  });

  describe('landing', function() {

    it('can accept a plane for landing', function() {
      airport.landPlane(plane);
      expect(airport._planes).toContain(plane);
    });
    it('should confirm the plane has landed or not', function() {
      airport.landPlane(plane);
      expect(plane.land).toHaveBeenCalled();
    });
    it('should not be able to land if it is stormy', function() {
      airport.weather.isStormy = true;
      expect(function() {airport.landPlane(plane)}).toThrow(new Error("Plane cannot land during a storm"));
    })
  });

  describe('taking off', function() {

    it('should let a plane take off', function() {
      airport.takeOffPlane(plane);
      expect(plane.takeOff).toHaveBeenCalled();
    });
    it('should remove the plane from the airport', function() {
      airport.landPlane(plane);
      airport.takeOffPlane(plane);
      expect(airport._planes).not.toContain(plane);
    });
    it('should not be able to take off if stormy', function() {
      airport.weather.isStormy = true;
      expect(function() {airport.takeOffPlane(plane)}).toThrow(new Error("Plane cannot take off during a storm"));
    })
  });
});
