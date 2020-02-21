Feature: System
  Scenario: Dispose a system
    Given AliveSystem
    Given A world
    When A system is added to the world
    When Dispose of the system
    Then Remove the system from the world