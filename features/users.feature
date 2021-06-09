Feature: NDCAPI
  MOCK set up for the NDCAPI endpoints

    Scenario: Get All Users
    Given a list of users
    When I send GET request for Get All Users
    Then I verify status code "200" is returned

   Scenario: Get Single User By ID
    Given a single user with ID "34"
    When I get user details for id "34" 
    Then I verify status code "200" is returned 
