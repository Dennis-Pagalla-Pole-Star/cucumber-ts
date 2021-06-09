import { binding, given, then, when} from 'cucumber-tsflow';
import { assert } from 'chai';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { create_single_user, create_users } from '../src/client/users';

@binding()
export class UserManagement {

  mock = new MockAdapter(axios);
  data: any;
  status: any;

  @given("a list of users")
  public aListOfUsers() {
    this.mock.reset();
    this.mock.onGet("/api/v1/users").reply(200, create_users(10));
  }

  @when("I send GET request for Get All Users")
  public getAllUsers() {
  axios.get("/api/v1/users").then( (response) =>{
    this.data = response.data;
    this.status = response.status;
    assert(response);
  });
  }

  @then(/I verify status code "([^"]*)" is returned/)
  public verifyStatusCode(id: number) {
    assert.equal(this.status, id);
  }

  @given(/a single user with ID "([^"]*)"/)
  public singleUser(id: number) {
    this.mock.reset();
    this.mock.onGet("/api/v1/users/"+id).reply(200,create_single_user(id));
  }

  @when(/I get user details for id "([^"]*)"/)
  public getUserById(id: number){
    axios.get("/api/v1/users/"+id).then( (response) => {
      this.data = response.data;
      this.status = response.status;
      assert(response);
    })
  }
}
