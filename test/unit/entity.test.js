import { describe, Try } from 'riteway';
import { Entity } from '../../src/entity';
import { health, position } from '../utils';

describe('Entity.addComponent', async assert => {
  const entity = Entity([]);
  
  {
    entity.addComponent(health(100));

    assert({
      given: 'adding a component',
      should: 'add a component to entity.components',
      actual: entity.getComponents().hasOwnProperty('health'),
      expected: true
    });
  }

  {
    entity.addComponent(health(50));

    assert({
      given: 'adding a component with same name',
      should: 'overwrite previous component with new values',
      actual: entity.getComponents().health,
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
      actual: entity2.getComponents(),
      expected: entity.getComponents()
    });
  }
});

describe('Entity.removeComponent', async assert => {
  const entity = Entity([]);

  entity.addComponent(health(100));

  {
    entity.setDirtyComponent('health');

    assert({
      given: 'setting dirty a owned component',
      should: 'not change the list of components',
      actual: Object.keys(entity.getComponents()).length,
      expected: 1
    });

    entity.addComponent(health(100));

    const entity2 = entity;

    entity2.setDirtyComponent('bloup');

    assert({
      given: 'setting dirty a unknown component',
      should: 'not change the object',
      actual: entity2.getComponents(),
      expected: entity.getComponents()
    });
  }
});

describe('Entity pull from props', async assert => {
  const entityFactory = (components = []) => Entity(components);

  {
    const entity = entityFactory([position]);
    
    assert({
      given: 'a component',
      should: 'init with correct component',
      actual: Object.keys(entity.getComponents()).length,
      expected: 1
    });
  }

  {
    const entity = entityFactory([position, health(50)]);

    assert({
      given: 'multiple components',
      should: 'not perform action',
      actual: Object.keys(entity.getComponents()).length,
      expected: 2
    });
  }
});