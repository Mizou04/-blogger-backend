let { getBlogPost, removeBlogPost, setBlogPost } = require("../src/Entities/BlogPostEntity");

describe("BlogPost Entity", ()=>{
  let id = "12";
  it("return a BlogPost object", ()=>{

    expect(getBlogPost(id)).toHaveProperty("id", "12");
  });

  it("creates a new BlogPost", ()=>{
    expect(setBlogPost({title : "test", id : "12"})).toBe(true);
  })

  it("removes a BlogPost", ()=>{
    expect(removeBlogPost(id)).toBe(true);
  })
})