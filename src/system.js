export const System = () => ({
  /**
   * Entities of the system.
   *
   * @property { Array } entities
   */
  entities: [],
  
  /**
   * Check if entity is eligible for this system.
   * @method isEligible
   * @param { Entity } entity
   */
  isEligible(entity) {},
  
  /**
   * Add an entity to the system.
   * @method addEntity
   * @param { Entity } entity
   */
  addEntity(entity) {},
  
  /**
   * Remove an entity from the system.
   * @method removeEntity
   * @param { Entity } entity
   */
  removeEntity(entity) {},
  
  /**
   * Remove system from the world
   * @method dispose
   */
  dispose() {},
  
  /**
   * Abstract method to subclass. Called once per update, before entities
   * iteration.
   *
   * @method  preUpdate
   */
  preUpdate() {},
  /**
   * Abstract method to subclass. Called once per update, after entities
   * iteration.
   *
   * @method  postUpdate
   */
  postUpdate() {},
  
  /**
   * Abstract method to subclass. Called when an entity is added to the system.
   *
   * @method  enter
   * @param  {Entity} entity The added entity.
   */
  enter(entity) {},
  /**
   * Abstract method to subclass. Called when an entity is removed from the system.
   *
   * @method  exit
   * @param  {Entity} entity The removed entity.
   */
  exit(entity) {},
  
  /**
   * Abstract method to subclass. Called for each entity to update. This is
   * the only method that should actual mutate entity state.
   *
   * @method  update
   * @param  {Entity} entity The entity to update.
   */
  update(entity) {}
});

