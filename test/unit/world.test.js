import { describe, Try } from 'riteway';
import { Entity } from '../../src/entity';
import { World } from '../../src/world';
import { position, AliveSystem } from '../utils';

describe('World.addEntity', async assert => {
  const world = World();
  const entity = Entity([position]);
  
  {
    world.addEntity(entity);
    
    assert({
      given: 'an entity',
      should: 'add an entity to the world entity list',
      actual: world.getEntities().size,
      expected: 1,
    });
  }
  
  {
    const world2 = world;
    world2.addEntity(entity);
    
    assert({
      given: 'an entity with same entityId',
      should: 'not perform action',
      actual: (world.getEntities() === world2.getEntities()),
      expected: true,
    });
  }
});

describe('World.removeEntity', async assert => {
  const world = World();
  const entity = Entity([position]);
  
  world.addEntity(entity);
  
  {
    world.removeEntity(entity.getId());
    
    assert({
      given: 'an entityId',
      should: 'remove an entity from the world entity list',
      actual: world.getEntities().size,
      expected: 0,
    });
  }
  
  {
    world.addEntity(entity);
    
    world.removeEntity('aza1sqdq45q');
    
    assert({
      given: 'an unknown entityId',
      should: 'do nothing',
      actual: world.getEntities().size,
      expected: 1,
    });
  }
});

describe('World.addSystem', async assert => {
  const world = World();
  
  const system = new AliveSystem();
  
  {
    world.addSystem(system);
    
    assert({
      given: 'a system',
      should: 'add a system to the system list',
      actual: world.getSystems().size,
      expected: 1,
    });
  
    world.addSystem(system);
    
    assert({
      given: 'same system',
      should: 'not perform anything',
      actual: world.getSystems().size,
      expected: 1,
    });
  }
});

describe('World.removeSystem', async assert => {
  const world = World();

  const system = new AliveSystem();

  {
    world.addSystem(system);

    world.removeSystem(system.id);

    assert({
      given: 'a systemId',
      should: 'remove the system from the system list',
      actual: world.getSystems().size,
      expected: 0,
    });
  
    world.addSystem(system);
  
    world.removeSystem('oqdjklsd54');
  
    assert({
      given: 'a unknown systemId',
      should: 'not perform anything',
      actual: world.getSystems().size,
      expected: 1,
    });
  }
});
