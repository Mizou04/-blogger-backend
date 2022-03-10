describe("User Related Tests", ()=>{
  // it("gets the Profile data which contains an uid", ()=>{
  //   expect(User.getUserProfile("123")).toHaveProperty(["id", "username"], "123");
  // })

  it("Creates a new user", ()=>{
    expect(User.setUser({username : "me", id : Math.random() * 200 + ""})).toBeTruthy();
  })

  it("Update a User data using user Id and new Data", ()=>{
    expect(User.updateUser("123", {username : "us"})).toBeTruthy();
  })

  it("Comments on a Blog post", ()=>{
    expect(User.addComment("132 [article id]"))
  })

})