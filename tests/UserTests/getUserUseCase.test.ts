import User from "@/Entities/User";
import IUserGateway from "@/Interactors/common/IUserGateway";
import GetUserInteractor from "@/Interactors/GetUserInteractor";

let userid = "123";
let user = User.create({name : "hamzaz", email : "jsa@gmail.com", id : userid, joinedAt : "12/22/2022"});
// user.id = userid;

let gatewayMock : IUserGateway & {users : {[id : string] : User}} = {
  users : {"123" : user},
  async getUserById(id : string) : Promise<User>{
    return this.users[id];
  }
} 
let getUser = new GetUserInteractor(gatewayMock);

describe("getUser interactor tests", ()=>{
  it("returns a User successfully", async ()=>{
    await expect(getUser.execute({id : "123"})).toEqual(user);
  })

  test("it doesn't find a user", async ()=>{
    async function errorHandler(){
      await getUser.execute({id : "143"})
    }
    await expect(errorHandler()).rejects.toThrowError("user not found");
  })
})