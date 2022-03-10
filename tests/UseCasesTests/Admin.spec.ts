import { Interface } from "readline";

describe("Admin tests", ()=>{
  it("Restricts a User from posting for an amount of time", ()=>{
    Admin.restictUser("123", 3, "for cursing [cause]");

    expect(User.getUserProfile("123")).toHaveProperty("restricted.duration", 3);
  })

  it("Deletes a comment from a post", ()=>{
    expect(Admin.deleteComment("32514", "1982")).toBeTruthy();
  })

  it("Notifies a User", ()=>{
    expect(Admin.notifyUser("123", "you have been doing bad these days [message to say]"))
  })

})
