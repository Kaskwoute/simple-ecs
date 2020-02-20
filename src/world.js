const World = () => {
  /**
   * Store all entities of the world.
   *
   * @property { Map } entities<entityId, entity>
   */
  let entities = new Map();
  
  /**
   * Store entities which need to be tested at beginning of next tick.
   *
   * @property { Array } entitiesSystemsDirty
   */
  let entitiesSystemsDirty = [];
  
  /**
   * Store all systems of the world.
   *
   * @property { Array } systems
   */
  let systems = [];
  
  /**
   * Retrieve world entities.
   *
   * @method getEntities
   * @return { Map } entities
   */
  const getEntities = () => entities;
  
  /**
   * Add an entity to the world.
   *
   * @method addEntity
   * @param { Object } entity: The entity to add.
   * @return { undefined }
   */
  const addEntity = (entity) => {
    const id = entity.getId();
    
    if (!id) {
      console.warn('Entity should have an id');
      return;
    }
    
    if (entities.has(id)) return;
    
    entities.set(id, entity);
  };
  
  /**
   * Remove an entity from the world.
   *
   * @method removeEntity
   * @param { String } entityId: The entity to remove.
   * @return { undefined }
   */
  const removeEntity = (entityId) => {
    if (!entityId) {
      console.warn('Entity should have an id');
      return;
    }
    
    if (!entities.has(entityId)) return;
    
    entities.delete(entityId);
  };
  
  /**
   * Add a system to the world.
   *
   * @method addSystem
   * @param  { System } system: The system to add.
   * @return { undefined }
   */
  const addSystem = (system) => {};
  
  /**
   * Remove a system from the world.
   *
   * @method removeSystem
   * @param  { System } system: The system to remove.
   * @return { undefined }
   */
  const removeSystem = () => {};
  
  /**
   * Update the world
   * @return { undefined }
   */
  const update = () => {};
  
  return Object.freeze({ getEntities, addEntity, removeEntity, addSystem, removeSystem, update })
};

export {
  World,
}

