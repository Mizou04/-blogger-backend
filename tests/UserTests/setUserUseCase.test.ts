import User from "@/Entities/User";
import IUserGateway from "@/Interactors/common/IUserGateway";
import SetUserInteractor from "@/Interactors/SetUserInteractor";

let userid = "123";
let gatewayMock : IUserGateway & {users : {[id : string] : User}} = {
  users : {},
  async setUser(payload : User){
    this.users[payload.id] = payload
  }
}

// let user = User.create({name : "hamzaz", email : "jsa@gmail.com", id : userid, joinedAt : "12/22/2022"});

let setUser = new SetUserInteractor(gatewayMock);

async function errorHandler(user : User){
  await setUser.execute(user)
}

describe("SetUser interactor tests", ()=>{
  let user = User.create({name : "hamzaz", email : "jsa@gmail.com", id : userid, joinedAt : "12/22/2022"});
  
  it("creates a User successfully", async ()=>{
    await expect(errorHandler(user)).resolves.not.toThrow("username must be greated than 5 characters long" || "user Email is not valid")
  })

  
  it("throws an Error due to invalid Name entry", async ()=>{
    user = User.create({name : "ham", email : "jsa@gmail.com", id : userid, joinedAt : "12/22/2022"});
    await expect(errorHandler(user)).resolves.toThrow("username must be greated than 5 characters long")
  })
  
  
  it("throws an Error due to invalid Email entry", async ()=>{
    user = User.create({name : "hamzaz", email : "jsa@gmail", id : userid, joinedAt : "12/22/2022"});
    await expect(errorHandler(user)).resolves.toThrow("user Email is not valid")
  })

})