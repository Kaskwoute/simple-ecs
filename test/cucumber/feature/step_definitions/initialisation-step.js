import { Given, Then, When } from 'cucumber';
import Assert from 'assert';
import { World } from '../../../../src/world';
import { Entity } from '../../../../src/entity';
import { System } from '../../../../src/system';
import { health, AliveSystem, position } from '../../../utils';

Given(/^An entity$/, function () {
  this.entity = Entity([health(50)]);
});

Given(/^A world$/, function () {
  this.world = World();
});

When(/^An Entity is added to the world$/, function () {
  this.world.addEntity(this.entity);
});

Then(/^Set this entity as dirty$/, function () {
  Assert.equal(this.world.getDirtyEntities().size, 1);
});