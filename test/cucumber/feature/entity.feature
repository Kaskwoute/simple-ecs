Feature: Entity
  Scenario: entity dirty when linked to world
    Given An entity with health component
    Given A world
    When An Entity is added to the world
    Then Set this entity as dirty in world dirtyEntities

  Scenario: entity dirty when added component
    Given An entity with health component
    Given A world
    When An Entity is added to the world
    When World update
    When A component is added to the entity
    Then Set this entity as dirty in world dirtyEntities

  Scenario: entity dirty when remove component
    Given An entity with health component
    Given A world
    When An Entity is added to the world
    When World update
    When A component is removed from the entity
    Then Set this entity as dirty in world dirtyEntities

  Scenario: dispose of an entity
    Given An entity with health component
    Given A world
    When An Entity is added to the world
    When The entity is disposed
    Then Remove the entity from the world
