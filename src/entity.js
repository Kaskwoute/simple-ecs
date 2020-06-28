import uniqid from 'uniqid';
import { omit } from './utils';

/**
 * @param { Array } initComponents
 * @param { String } initId
 */
const Entity = (initComponents = [], initId) => {
  /**
   * Unique identifier of the entity.
   *
   * @property { String } id
   */
  const id = initId || uniqid();

  /**
   * This function is set when the entity is added to a world
   * Function to update the linked world
   * Updated when entity has a change in component
   *
   * @property { undefined | function }
   */
  let setDirty = undefined;
  
  /**
   * This function is set when the entity is added to a world
   * Function to detach entity from the world
   *
   * @property { undefined | function }
   */
  let detachFromWorld = undefined;
  
  /**
   * Components of the entity stored as key-value pairs.
   *
   * @property { Object } components
   */
  let components = {};

  /**
   * Object of components calculated for next tick of the world
   * Only used when we remove a component from the entity
   *
   * @property { Array } dirtyComponents
   */
  let dirtyComponents = [];

  /**
   * Get entity id
   *
   * @method getId
   * @return { String } id
   */
  const getId = () => id;
  
  /**
   * Get entity components
   *
   * @method getComponents
   * @return { Object } components
   */
  const getComponents = () => components;
  
  /**
   * Use to set the setDirty fn when attached to a world
   * Automatically set this entity as dirty when attached to a world
   *
   * @method setDirtyFunction
   * @param { function } setDirtyFn
   */
  const setDirtyFunction = (setDirtyFn) => {
    setDirty = setDirtyFn;
    
    setDirty(id);
  };
  
  /**
   * Use to set the detachFromWorld fn when attached to a world
   *
   * @method setDisposeFunction
   * @param { function } setDetachFn
   */
  const setDetachFunction = (setDetachFn) => { detachFromWorld = setDetachFn };
  
  /**
   * Add a component to the entity.
   *
   * @method addComponent
   * @param { Object } component: Component to add to the entity
   * @return { undefined }
   */
  const addComponent = (component) => {
    if (!component.name) {
      console.warn('Component should have a unique name');
      return;
    }
    
    if (!component.values) {
      console.warn(`Component ${ component.name } has empty values, it will be initiated with as default ({})`)
    }
    
    components = {
      ...components,
      [component.name]: Object.assign({}, component.values),
    };
    
    if (typeof setDirty === 'function') setDirty(id);
  };
  
  /**
   * Set a component dirty in the entity.
   *
   * @method setDirtyComponent
   * @param { String } name: Component name
   * @return { undefined }
   */
  const setDirtyComponent = (name) => {
    if (!name || typeof name !== 'string') {
      console.warn('Parameter name is either missing or is not a string');
      return;
    }

    if (!components[name]) return;

    dirtyComponents.push(name);

    if (typeof setDirty === 'function') setDirty(id);
  };

    /**
   * Remove all dirty components from the entity.
   *
   * @method removeComponent
   * @param { String } name: Component name
   * @return { undefined }
   */
  const removeDirtyComponents = () => {
    dirtyComponents.forEach(componentName => {
      components = omit(components, componentName);
    })

    dirtyComponents = [];
  };
  
  /**
   * Remove entity from the world.
   *
   * @method dispose
   * @return { undefined }
   */
  const dispose = () => {
    if (!(typeof detachFromWorld === 'function')) {
      console.warn(`Entity ${ id } is not attached to a World`);
      return;
    }
    
    detachFromWorld(id);
  };
  
  /**
   * Init with components.
   *
   * @method init
   * @return { undefined }
   */
  const init = function () {
    if (Array.isArray(initComponents) && initComponents.length > 0) {
      initComponents.forEach(component => addComponent(component))
    }
  }();
  
  return Object.freeze({
    getId,
    getComponents,
    setDetachFunction,
    detachFromWorld,
    setDirtyFunction,
    addComponent,
    setDirtyComponent,
    dispose,
    removeDirtyComponents
  })
};

export {
  Entity,
}