import User from "@/Entities/User"

let params : any = { username : "hamza", password : "123455",  email : "ha@gmail.com"};
let init : any = { username : "hamza", password : "123455",  email : "ha@gmail.com"};
function* changeOneThing(things : {[key : string] : any}){
  for(let element in things){
    yield things[element] = "123";
  }
}
function* resetThings(things : {[key : string] : any}){
  let j = 1; 
  for(let element in things){
    yield things[element] = Object.values(init)[j];
    j++;
  }
}
const changer = changeOneThing(params);
const reseter = resetThings(params);

describe("test User successes [business logic]" ,()=>{
  test('it returns a User with name="hamza"', ()=>{
    expect(User.create(params)).toHaveProperty("username", "hamza")
  })
});


describe('test User Errors [business logic]', ()=>{
  beforeEach(()=>{
    changer.next();
  })

  afterEach(()=>{
    reseter.next()
  })
  afterAll(()=>{
    params = init
  })
  
  test("it returns a username Error", ()=>{
    expect(()=>{User.create(params)}).toThrowError(/short/);
  })

  test("it returns a password Error", ()=>{
    expect(()=>{User.create(params)}).toThrowError(/short/);
  });
  
  test("it returns an email Error", ()=>{
    expect(()=>{User.create(params)}).toThrowError(/invalid/);
  })
})