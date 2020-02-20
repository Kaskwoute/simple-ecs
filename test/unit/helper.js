import { System } from '../../src/system';

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
  
  this.update = function (entity) {
    let { health } = entity.getComponents();
    
    console.log(health)
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