import { pipe } from './utils';

const World = () => {
  /**
   * Store all entities of the world.
   *
   * @property { Map } entities<entityId, entity>
   */
  let entities = new Map();

  /**
   * Store entities ID which need to be tested at beginning of next tick.
   *
   * @property { Set } dirtyEntities
   */
  let dirtyEntities = new Set();

  /**
   * Store all systems of the world.
   *
   * @property { Map } systems<systemId, system>
   */
  let systems = new Map();

  /**
   * Retrieve world entities.
   *
   * @method getEntities
   * @return { Map } entities
   */
  const getEntities = () => entities;

  /**
   * Retrieve world systems.
   *
   * @method getSystems
   * @return { Set } systems
   */
  const getSystems = () => systems;

  /**
   * Retrieve world systems.
   *
   * @method getDirtyEntities
   * @return { Set } dirtyEntities
   */
  const getDirtyEntities = () => dirtyEntities;

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

    const setDirty = (entityId) => {
      dirtyEntities.add(entityId);
    };

    // Set entity method to set herself dirty in the world list
    entity.setDirtyFunction(setDirty);

    entity.setDetachFunction(removeEntity);

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
      console.warn('No id provided to remove entity');
      return;
    }

    if (!entities.has(entityId)) return;

    systems.forEach(system => system.removeEntity(entityId));

    entities.delete(entityId);
  };

  /**
   * Add a system to the world.
   *
   * @method addSystem
   * @param  { System } system: The system to add.
   * @return { undefined }
   */
  const addSystem = (system) => {
    if(!system) return;

    if(!system.id) {
      console.warn('System should have an id');
      return;
    }

    if (!systems.has(system.id)) {
      systems.set(system.id, system);

      // TODO: Check if there is a better solution
      system.dispose = function () {
        removeSystem(this.id);
      }
    }
  };

  /**
   * Remove a system from the world.
   *
   * @method removeSystem
   * @param  { String } systemId: The system to remove.
   * @return { undefined }
   */
  const removeSystem = (systemId) => {
    if (!systemId) {
      console.warn('No id provided to remove system');
      return;
    }

    if (!systems.has(systemId)) return;

    systems.delete(systemId);
  };

  /**
   * Update the world.
   *
   * @param { Number } elapsed
   * @return { undefined }
   */
  const update = (elapsed) => {
    if (dirtyEntities.size > 0) {
      dirtyEntities.forEach(entityId => {

        // TODO: remove dirty component from entity here
        const entity = entities.get(entityId);
        entity.removeDirtyComponents();

        systems.forEach(system => {
          system.addEntity(entity)
        })
      });

      dirtyEntities.clear();
    }

    systems.forEach(system => {
      if(system.needUpdate) system.updateAll(elapsed);
    })
  };

  return Object.freeze({
    getEntities,
    getSystems,
    getDirtyEntities,
    addEntity,
    removeEntity,
    addSystem,
    removeSystem,
    update,
  })
};

export {
  World,
}

