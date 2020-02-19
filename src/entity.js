import uniqid from 'uniqid';

/**
 *
 * @param { Array } components
 */
export const Entity = (components = []) => ({
  /**
   * Unique identifier of the entity.
   *
   * @property { Number } id
   */
  id: uniqid(),
  
  /**
   * Indiquate a change in components (a component was removed or added)
   * which require to re-compute entity eligibility to all systems.
   *
   * @property { Boolean } systemsDirty
   */
  systemsDirty: false,
  
  /**
   * Components of the entity stored as key-value pairs.
   *
   * @property { Object } components
   */
  components: {},
  
  /**
   * Add a component to the entity.
   *
   * @method addComponent
   * @param { String } name: Component name
   * @param { Object } component: Component to add to the entity
   */
  addComponent(name, component) {},
  
  /**
   * Remove a component from the entity.
   *
   * @method removeComponent
   * @param { String } name: Component name
   */
  removeComponent(name) {},
  
  /**
   * Remove entity from the world.
   * @method dispose
   */
  dispose() {}
});

