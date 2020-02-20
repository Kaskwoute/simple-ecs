import uniqid from 'uniqid';
import { omit } from './utils';

/**
 * @param { Array } initComponents
 */
const Entity = (initComponents = []) => {
  /**
   * Unique identifier of the entity.
   *
   * @property { String } id
   */
  const id = uniqid();
  
  /**
   * Indicate a change in components (a component was removed or added)
   * which require to re-compute entity eligibility to all systems.
   *
   * @property { Boolean } systemsDirty
   */
  let systemsDirty = false;
  
  /**
   * Components of the entity stored as key-value pairs.
   *
   * @property { Object } components
   */
  let components = {};
  
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
    }
  };
  
  /**
   * Remove a component from the entity.
   *
   * @method removeComponent
   * @param { String } name: Component name
   * @return { undefined }
   */
  const removeComponent = (name) => {
    if (!name || typeof name !== 'string') {
      console.warn('Parameter name is either missing or is not a string');
      return;
    }
    
    if (!components[name]) return;
    
    components = omit(components, name);
  };
  
  /**
   * Remove entity from the world.
   *
   * @method dispose
   * @return { undefined }
   */
  const dispose = () => {};
  
  /**
   * Init with components.
   *
   * @method init
   * @return { undefined }
   */
  const init = function() {
    if(Array.isArray(initComponents) && initComponents.length > 0) {
      initComponents.forEach(component => addComponent(component))
    }
  }();
  
  return Object.freeze({
    getId,
    getComponents,
    addComponent,
    removeComponent,
    dispose
  })
};

export {
  Entity
}