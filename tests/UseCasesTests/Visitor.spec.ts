describe("View tests", ()=>{
  it("Retrieve a blog post", async ()=>{
    expect(await new GetBlogPostByIdUseCase({} as IBlogPostRepository<{id : string}>).execute({id : "54236"})).toHaveProperty("id", "54236");
  })

  // it("Visits an existing User profile", async ()=>{
  //   expect(await getUserProfile("123")).toHaveProperty("id", "123");
  // })

  // it("Creates an account", async ()=>{
  //   expect(await createAccount({username : "new me", profilePicture : "my face.jpg"}))
  // })

})