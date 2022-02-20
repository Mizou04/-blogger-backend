describe("View tests", ()=>{
  it("Retrieve a blog post", async ()=>{
    expect(await Visitor.getBlogPost("54236")).toHaveProperty("id", "54236");
  })

  it("Visits an existing User profile", async ()=>{
    expect(await Visitor.getUserProfile("123")).toHaveProperty("id", "123");
  })

  it("Creates an account", async ()=>{
    expect(await Visitor.createAccount())
  })

})