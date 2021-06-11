import { before, binding, given, then, when } from 'cucumber-tsflow';
import { assert } from 'chai';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { create_single_user, create_users } from '../src/client/users';

@binding()
export class UserManagement {

  mock = new MockAdapter(axios);
  data: any;
  status: any;

  /* Given statement will create mock response of 10 users 
  with status code 200 */
  @given(/a list of users/)
  public aListOfUsers() {
    this.mock.reset();
    this.mock.onGet("/api/v1/users").reply(200, create_users(10));
  }

  /* Given statement will crete a mock response 
  of 1 user with specified ID */
  @given(/a single user with ID "([^"]*)"/)
  public singleUser(id: number) {
    this.mock.onGet("/api/v1/users/" + id).reply(200, create_single_user(id));
  }

  @when(/I send GET request for Get All Users/)
  public getAllUsers() {
    axios.get("/api/v1/users").then((response) => {
      this.data = response.data;
      this.status = response.status;
      console.log(this.data);
      assert(this.data);
    });
  }

  @then(/I verify status code "([^"]*)" is returned/)
  public verifyStatusCode(id: number) {
    console.log(this.status);
    assert.equal(this.status, id);
  }

  @when(/I send GET request for Get a single User with "([^"]*)"/)
  public getUserById(id: number) {
    axios.get("/api/v1/users/" + id).then((response) => {
      this.data = response.data;
      this.status = response.status;
      console.log(this.data);
      assert(this.data);
    });
  }


}
