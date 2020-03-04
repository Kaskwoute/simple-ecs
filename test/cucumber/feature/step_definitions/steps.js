import { Given, Then, When } from 'cucumber';
import Assert from 'assert';
import { World } from '../../../../src/world';
import { Entity } from '../../../../src/entity';
import { health, AliveSystem, position } from '../../../utils';

/**
 * GIVEN
 */
Given(/^An entity with health component$/, function () {
  this.entity = Entity([health(50)]);
});

Given(/^A world$/, function () {
  this.world = World();
});

Given(/^AliveSystem$/, function () {
  this.system = new AliveSystem();
});

/**
 * WHEN
 */
When(/^An Entity is added to the world$/, function () {
  this.world.addEntity(this.entity);
});

When(/^A system is added to the world$/, function () {
  this.world.addSystem(this.system);
});

When(/^World update$/, function () {
  this.world.update(0);
});

When(/^A component is added to the entity$/, function () {
  this.entity.addComponent(position);
});

When(/^A component is removed from the entity$/, function () {
//  console.log(this.system);
  console.log(this.world.getEntities());
  console.log(this.world.getSystems());
//  console.log(this.entity);
  this.entity.removeComponent('health');
});

When(/^The entity is disposed$/, function () {
  this.entity.dispose();
});

When(/^World remove entity$/, function () {
  this.world.removeEntity(this.entity.getId());
});

When(/^Dispose of the system$/, function () {
  this.system.dispose();
});

/**
 * THEN
 */
Then(/^Set this entity as dirty in world dirtyEntities$/, function () {
  Assert.equal(this.world.getDirtyEntities().keys().next().value, this.entity.getId());
});

Then(/^Add system to the world$/, function () {
  Assert.equal(this.world.getSystems().keys().next().value, this.system.id);
});

Then(/^Add entities to system$/, function () {
  Assert.equal(this.system.entities.keys().next().value, this.entity.getId());
});

Then(/^Clean dirty entity from the world$/, function () {
  Assert.equal(this.world.getDirtyEntities().size, 0);
});

Then(/^System should not be updated$/, function () {
  Assert.equal(this.system.inc, 0);
});

Then(/^Update all systems$/, function () {
  Assert.equal(this.system.inc, 1);
});

Then(/^Remove the entity from the world$/, function () {
  Assert.equal(this.world.getEntities().size, 0);
});

Then(/^Remove entity from systems$/, function () {
  Assert.equal(this.system.entities.size, 0);
});

Then(/^Remove the system from the world$/, function () {
  Assert.equal(this.world.getSystems().size, 0);
});