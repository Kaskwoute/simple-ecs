import { System } from '../src/system';

const position = {
  name: 'position',
  
  values: {
    x: 0,
    y: 0
  }
};

const health = (health) => ({
  name: 'health',
  
  values: {
    health: health
  }
});

function AliveSystem() {
  System.call(this);
  
  this.inc = 0;
  
  this.update = function (entity) {
    let { health } = entity.getComponents();

    health.health = 75;
    
    this.inc += 1;
  };
  
  this.isEligible = function (entity) {
    return entity.getComponents().hasOwnProperty('health');
  }
}

export {
  position,
  health,
  AliveSystem
}