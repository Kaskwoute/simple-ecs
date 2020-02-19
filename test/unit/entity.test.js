import { describe, Try } from 'riteway';
import { createEntity } from '../../src/entity';

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

describe('Entity.addComponent', async assert => {
  const entity = createEntity([]);
  
  {
    entity.addComponent(health(100));
    
    assert({
      given: 'adding a component',
      should: 'add a component to entity.components',
      actual: entity.components.hasOwnProperty('health'),
      expected: true
    });
  }
  
  {
    entity.addComponent(health(50));
    
    assert({
      given: 'adding a component with same name',
      should: 'overwrite previous component with new values',
      actual: entity.components.health,
      expected: {
          health: 50
      }
    });
  }
  
  {
    const entity2 = entity;
    
    entity2.addComponent({});
    
    assert({
      given: 'a component with no name',
      should: 'not perform action',
      actual: entity2.components,
      expected: entity.components
    });
  }
});

describe('Entity.removeComponent', async assert => {
  const entity = createEntity([]);

  entity.addComponent(health(100));

  {
    entity.removeComponent('health');

    assert({
      given: 'removing a owned component',
      should: 'remove the component from entity.components',
      actual: entity.components,
      expected: {}
    });

    entity.addComponent(health(100));

    const entity2 = entity;

    entity2.removeComponent('bloup');

    assert({
      given: 'removing a unknown component',
      should: 'not change the object',
      actual: entity2.components,
      expected: entity.components
    });
  }
});

describe('Entity pull from props', async assert => {
  const entityFactory = (components = []) => createEntity(components);

  {
    const entity = entityFactory([position]);

    assert({
      given: 'a component',
      should: 'init with correct component',
      actual: Object.keys(entity.components).length,
      expected: 1
    });
  }

  {
    const entity = entityFactory([position, health(50)]);

    assert({
      given: 'multiple components',
      should: 'not perform action',
      actual: Object.keys(entity.components).length,
      expected: 2
    });
  }
});