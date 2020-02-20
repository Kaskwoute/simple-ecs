import { describe, Try } from 'riteway';
import { Entity } from '../../src/entity';
import { health, position, AliveSystem } from './helper';

describe('System.addEntity', async assert => {
  const entity = Entity([health(50)]);
  
  const system = new AliveSystem();
  
  {
    system.addEntity(entity);

    assert({
      given: 'an entity',
      should: 'add an entity to the system entity list',
      actual: system.entities.size,
      expected: 1
    });
  }
  
  {
    system.addEntity(entity);
    
    assert({
      given: 'a same entity',
      should: 'do nothing',
      actual: system.entities.size,
      expected: 1
    });
  }
});

describe('System.removeEntity', async assert => {
  const entity = Entity([health(50)]);
  
  const system = new AliveSystem();
  
  system.addEntity(entity);
  
  {
    system.removeEntity(entity.getId());

    assert({
      given: 'an entityId',
      should: 'remove an entity from the system entity list',
      actual: system.entities.size,
      expected: 0
    });
  }

  {
    system.addEntity(entity);
    
    system.removeEntity('blgfgfg212');
    
    assert({
      given: 'an unknown entityId',
      should: 'do nothing',
      actual: system.entities.size,
      expected: 1
    });
  }
});