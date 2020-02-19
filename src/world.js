export const World = () => ({
  /**
   * Store all entities of the world.
   *
   * @property { Array } entities
   */
  entities: [],

  /**
   * Store entities which need to be tested at beginning of next tick.
   *
   * @property { Array } entitiesSystemsDirty
   */
  entitiesSystemsDirty: [],

  /**
   * Store all systems of the world.
   *
   * @property { Array } systems
   */
  systems: [],

  /**
   * Add an entity to the world.
   *
   * @method addEntity
   * @param { Entity } entity: The entity to add.
   */
  addEntity(entity) {},
  
  /**
   * Remove an entity from the world.
   *
   * @method removeEntity
   * @param { Entity } entity: The entity to remove.
   */
  removeEntity(entity) {},
  
  /**
   * Add a system to the world.
   *
   * @method addSystem
   * @param  { System } system: The system to add.
   */
  addSystem(system) {},
  
  /**
   * Remove a system from the world.
   *
   * @method removeSystem
   * @param  { System } system: The system to remove.
   */
  removeSystem(system) {},
  
  /*
   * Update the world
   */
  update() {}
});
