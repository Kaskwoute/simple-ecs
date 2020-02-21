Feature: World
  Scenario: Add a system to the world
    Given A world
    Given AliveSystem
    When A system is added to the world
    Then Add system to the world

  Scenario: Add entities to the system
    Given An entity with health component
    Given A world
    Given AliveSystem
    When An Entity is added to the world
    When A system is added to the world
    When World update
    Then Add entities to system
    Then Clean dirty entity from the world

  Scenario: World should not update system when they have linked entities
    Given A world
    Given AliveSystem
    When A system is added to the world
    When World update
    Then System should not be updated

  Scenario: World should update system when they have linked entities
    Given An entity with health component
    Given A world
    Given AliveSystem
    When An Entity is added to the world
    When A system is added to the world
    When World update
    Then Update all systems

  Scenario: Remove an entity from world should remove from system
    Given An entity with health component
    Given A world
    Given AliveSystem
    When An Entity is added to the world
    When A system is added to the world
    When World update
    When World remove entity
    Then Remove entity from systems