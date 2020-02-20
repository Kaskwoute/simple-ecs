import { describe, Try } from 'riteway';
import { Entity } from '../../src/entity';
import { World } from '../../src/world';

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

describe('World.addEntity', async assert => {
  const world = World();
  const entity = Entity([position]);

  {
    world.addEntity(entity);
    
    assert({
      given: 'an entity',
      should: 'add an entity to the world entity list',
      actual: world.getEntities().size,
      expected: 1
    });
  }

  {
    const world2 = world;
    world2.addEntity(entity);

    assert({
      given: 'an entity with same entityId',
      should: 'not perform action',
      actual: (world.getEntities() === world2.getEntities()),
      expected: true
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
      expected: 0
    });
  }

  {
    world.addEntity(entity);

    world.removeEntity('aza1sqdq45q');

    assert({
      given: 'an unknown entityId',
      should: 'do nothing',
      actual: world.getEntities().size,
      expected: 1
    });
  }
});

//describe('World.addSystem', async assert => {
//  const entity = Entity([]);
//
//  entity.addComponent(health(100));
//
//  {
//    entity.removeComponent('health');
//
//    assert({
//      given: 'removing a owned component',
//      should: 'remove the component from entity.components',
//      actual: entity.components,
//      expected: {}
//    });
//
//    entity.addComponent(health(100));
//
//    const entity2 = entity;
//
//    entity2.removeComponent('bloup');
//
//    assert({
//      given: 'removing a unknown component',
//      should: 'not change the object',
//      actual: entity2.components,
//      expected: entity.components
//    });
//  }
//});

