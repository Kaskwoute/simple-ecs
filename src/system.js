import uniqid from 'uniqid';

const System = function () {
  /**
   * Unique identifier of the system.
   *
   * @property { String } id
   */
  this.id = uniqid();
  
  /**
   * Entities of the system.
   *
   * @property { Map } entities<entityId, entity>
   */
  this.entities = new Map();
  
  /**
   * Check if entity is eligible for this system.
   *
   * @method isEligible
   * @param { Entity } entity
   * @return { Boolean }
   */
  this.isEligible = function (entity) {
    return true;
  };
  
  /**
   * Add an entity to the system.
   *
   * @method addEntity
   * @param { Object } entity
   * @return { undefined }
   */
  this.addEntity = function (entity) {
    if (this.isEligible(entity)) {
      this.entities.set(entity.getId(), entity);
    }
  };
  
  /**
   * Remove an entity from the system.
   *
   * @method removeEntity
   * @param { String } entityId
   * @return { undefined }
   */
  this.removeEntity = function (entityId) {
    if(!this.entities.has(entityId)) {
      console.warn(`Unknown entityId ${entityId}`);
      return;
    }
    
    this.entities.delete(entityId);
  };
  
  /**
   * Remove system from the world
   *
   * @method dispose
   * @return { undefined }
   */
  this.dispose = function () {};
  
  /**
   * Apply update to each entity of this system.
   *
   * @method updateAll
   * @return { undefined }
   */
  this.updateAll = function () {};
  
  /**
   * Abstract method to subclass. Called once per update, before entities
   * iteration.
   *
   * @method  preUpdate
   * @return { undefined }
   */
  this.preUpdate = function () {};
  
  /**
   * Abstract method to subclass. Called once per update, after entities
   * iteration.
   *
   * @method  postUpdate
   * @return { undefined }
   */
  this.postUpdate = function () {};
  
  /**
   * Abstract method to subclass. Called when an entity is added to the system.
   *
   * @method  enter
   * @param  {Entity} entity The added entity.
   * @return { undefined }
   */
  this.enter = function (entity) {};
  
  /**
   * Abstract method to subclass. Called when an entity is removed from the system.
   *
   * @method  exit
   * @param  {Entity} entity The removed entity.
   * @return { undefined }
   */
  this.exit = function (entity) {};
  
  /**
   * Abstract method to subclass. Called for each entity to update. This is
   * the only method that should actual mutate entity state.
   *
   * @method  update
   * @param  { Object } entity The entity to update.
   * @return { undefined }
   */
  this.update = function (entity) {};
};

export {
  System,
}

