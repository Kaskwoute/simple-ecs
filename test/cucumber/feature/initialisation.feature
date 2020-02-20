Feature: Entity creation
  Scenario: link entity to world
    Given An entity
    Given A world
    When An Entity is added to the world
    Then Set this entity as dirty


#Feature: World update
#  Scenario: link entity to world
#    Given A world with systems
#    When World update
#    Then Update all linked systems
