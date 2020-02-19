import uniqid from 'uniqid';
import { omit } from './utils';

/**
 * @param { Array } components
 */
const createEntity = (components = []) => {
  const entity = new Entity();
  components.forEach(component => entity.addComponent(component));
  
  return entity;
};


const Entity = function() {
  /**
   * Unique identifier of the entity.
   *
   * @property { Number } id
   */
  this.id = uniqid();
  
  /**
   * Indicate a change in components (a component was removed or added)
   * which require to re-compute entity eligibility to all systems.
   *
   * @property { Boolean } systemsDirty
   */
  this.systemsDirty = false;
  
  /**
   * Components of the entity stored as key-value pairs.
   *
   * @property { Object } components
   */
  this.components = {};
};

/**
 * Add a component to the entity.
 *
 * @method addComponent
 * @param { Object } component: Component to add to the entity
 */
Entity.prototype.addComponent = function (component) {
  if (!component.name) {
    console.warn('Component should have a unique name');
    return;
  }
  
  if (!component.values) {
    console.warn(`Component ${ component.name } has empty values, it will be initiated with as default ({})`)
  }
  
  this.components = {
    ...this.components,
    [component.name]: Object.assign({}, component.values),
  }
};

/**
 * Remove a component from the entity.
 *
 * @method removeComponent
 * @param { String } name: Component name
 */
Entity.prototype.removeComponent = function (name) {
  if (!name || typeof name !== 'string') {
    console.warn('Parameter name is either missing or is not a string');
    return;
  }
  
  if (!this.components[name]) return;
  
  console.log(this.components);
  
  this.components = omit(this.components, name);
};

/**
 * Remove entity from the world.
 * @method dispose
 */
Entity.prototype.dispose = function () {};

export {
  createEntity
}
