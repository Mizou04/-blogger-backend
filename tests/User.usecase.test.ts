import GetUserController from "@/controllers/getUser.controller";
import SetUserController from "@/controllers/setUser.controller";
import User from "@/Entities/User"
import { UserGateway } from "@/interactors/_common/db.gateway";
import GetUser from "@/interactors/getUser.interactor";
import SetUser, { SetUserOutputPort } from "@/interactors/setUser.interactor";
import GetUserPresenter from "@/presenters/getUser.presenter";
import { UserRepository } from "@/repositories/User.repository";
import { UserVM } from "@/viewmodels/userVM";
import mockPresenter, {mockPresenterMethod} from "@/presenters/__mocks__/setUser.presenter"
jest.mock("@/presenters/__mocks__/setUser.presenter")

// let presn = jest.mocked<SetUserOutputPort>({present(something?) {
//   return null
// }})
let user : User = {id : "123456789", name: "hamza", username : "hamza", password : "123455",  email : "ha@gmail.com"};

let mockHappyGateway : UserGateway = {
  async getUser(params) : Promise<User>{
    try{
      return Promise.resolve(user);
    } catch(e){
      throw e
    }
  },
  setUser(params) {
    try{
      return Promise.resolve(null)  
    } catch(e){
      throw e
    }
  },
  updateUser(params, user) {
    try{
      return Promise.resolve(null)  
    } catch(e){
      throw e
    }
  },
  deleteUser(params) {
    try{
      return Promise.resolve(null)  
    } catch(e){
      throw e
    }
  },
}
let mockMadGateway : UserGateway = {
  getUser(params) : Promise<null>{
    try{
      return Promise.reject(null);
    } catch(e){
      throw e
    }
  },
  setUser(params) {
    try{
      return Promise.reject(null);
    } catch(e){
      throw e
    }
  },
  updateUser(params, user) {
    try{
      return Promise.reject(null);
    } catch(e){
      throw e
    }
  },
  deleteUser(params) {
    try{
      return Promise.reject(null);
    } catch(e){
      throw e
    }
  },
}

let presn = mockPresenter();

let presenter = new GetUserPresenter();
let interactor = new GetUser(presenter, new UserRepository())
let getUser = new GetUserController(interactor)
let setUser = new SetUser(presn, mockHappyGateway);

describe("test User usecases successes [application logic]", ()=>{
  beforeAll(()=>{
    jest.mock("@/repositories/User.repository", ()=>{
      return {
        getUser : jest.fn().mockResolvedValue(user),
        setUser : jest.fn().mockResolvedValue(null),
        updateUser : jest.fn().mockResolvedValue(null),
        deleteUser : jest.fn().mockResolvedValue(null) 
      }
    })
  })
  test("get user instance", ()=>{
    const data = getUser.execute({id : "123456789"});
    expect(data).resolves.toHaveProperty("user.id", "123456789")
  })
  test("create user instance", ()=>{
    expect(setUser.execute(user)).resolves.toBe(null)
  })
  test("presenter is called", ()=>{
    expect(mockPresenter).toHaveBeenCalledTimes(1)
  })
  
  // test("update user instance", ()=>{
  //   expect(updateUser.execute({parameter : "id", value : "123456789"}, typeof User)).toBe(typeof UserVM)
  // })
  // test("delete user instance", ()=>{
  //   expect(deleteUser.execute(typeof User)).toBe(null)
})



describe("test User usecases errors [application logic]", ()=>{
  beforeAll(()=>{
    jest.mock("@/repositories/User.repository", ()=>{
      return {
        getUser : jest.fn().mockRejectedValue(null),
        setUser : jest.fn().mockRejectedValue(null),
        updateUser : jest.fn().mockRejectedValue(null),
        deleteUser : jest.fn().mockRejectedValue(null) 
      }
    })
  })
  test("can't get User object", ()=>{
    expect(async ()=>{ await getUser.execute({id : "123456789"})}).rejects.toThrowError()
  })
  test("create user instance", ()=>{
    expect(()=> setUser.execute(user)).rejects.toThrowError()
  })
  // test("update user instance", ()=>{
  //   expect(updateUser.execute({parameter : "id", value : "123456789"}, typeof User)).toThrowError()
  // })
  // test("delete user instance", ()=>{
  //   expect(deleteUser.execute(typeof User)).toThrowError()
  // })
})