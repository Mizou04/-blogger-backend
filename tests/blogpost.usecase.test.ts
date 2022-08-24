import { DBError } from "@/common/customErrors";
import { Range } from "@/common/Range";
import { BlogPost } from "@/Entities/BlogPost";
import { BlogPostGateway } from "@/interactors/common/db.gateway";
import { GetBlogPostsGroup } from "@/interactors/getBlogpostsGroup.interactor";
import { BlogPostVM } from "@/ViewModels/BlogPostVM";

let posts : BlogPost[] = [
  {id:"1",
  comments:{
    data:{
    
  },
  length:0},
  createdAt: new Date("2022-08-24T10:29:)10.513Z"),
  lastModified: new Date("2022-08-24T10:29:)10.513Z"),
  title:"meryem is awesome1",
  overview:"meryem is awesome1",
  content:"meryem is awesome1",
  owner:{
    id:"1",
  email:"1@gmail.com",
  profilePic:"sssshhhhsss",
  username:"meryem1"},
  like(){

  },
  thumbnail:"#10.8767832016764647",
  likes:{
    data:{
    
  },
  length:1}},
  {id:"2",
  comments:{
    data:{
    
  },
  length:0},
  createdAt:new Date("2022-08-24T10:29:10.526Z"),
  lastModified:new Date("2022-08-24T10:29:10.526Z"),
  title:"fati is awesome2",
  overview:"fati is awesome2",
  content:"fati is awesome2",
  owner:{
    id:"2",
  email:"2@gmail.com",
  profilePic:"sssshhhhsss",
  username:"fati2"},
  like(){

  },
  thumbnail:"#20.7763217358995349",
  likes:{
    data:{
    
  },
  length:1}},
  {id:"3",
  comments:{
    data:{
    
  },
  length:0},
  createdAt:new Date("2022-08-24T10:29:10.526Z"),
  lastModified:new Date("2022-08-24T10:29:10.526Z"),
  title:"roro is awesome3",
  overview:"roro is awesome3",
  content:"roro is awesome3",
  owner:{
    id:"3",
  email:"3@gmail.com",
  profilePic:"sssshhhhsss",
  username:"roro3"},
  like(){

  },
  thumbnail:"#30.9145781283224927",
  likes:{
    data:{
    
  },
  length:1}},
  {id:"4",
  comments:{
    data:{
    
  },
  length:0},
  createdAt:new Date(),
  lastModified:new Date(),
  title:"abdo is awesome4",
  overview:"abdo is awesome4",
  content:"abdo is awesome4",
  owner:{
    id:"4",
  email:"4@gmail.com",
  profilePic:"sssshhhhsss",
  username:"abdo4"},
  like(){

  },
  thumbnail:"#41.6134926268614729",
  likes:{
    data:{
    
  },
  length:1}},
  {id:"5",
  comments:{
    data:{
    
  },
  length:0},
  createdAt:new Date(),
  lastModified:new Date(),
  title:"fadma is awesome5",
  overview:"fadma is awesome5",
  content:"fadma is awesome5",
  owner:{
    id:"5",
  email:"5@gmail.com",
  profilePic:"sssshhhhsss",
  username:"fadma5"},
  like(){

  },
  thumbnail:"#53.2833954722831993",
  likes:{
    data:{
    
  },
  length:1}},
  {id:"6",
  comments:{
    data:{
    
  },
  length:0},
  createdAt:new Date(),
  lastModified:new Date(),
  title:"hamza is awesome6",
  overview:"hamza is awesome6",
  content:"hamza is awesome6",
  owner:{
    id:"6",
  email:"6@gmail.com",
  profilePic:"sssshhhhsss",
  username:"hamza6"},
  like(){

  },
  thumbnail:"#63.232048470689872",
  likes:{
    data:{
    
  },
length:1}}]

let postsVm = posts.map(v => new BlogPostVM(v));

let gateway : BlogPostGateway = {
  async getBlogPosts<T>(params? : T, criteria?: T extends string ? "title" | "content" | "category" : null) : Promise<BlogPost[]>{
    try {
      let data : BlogPost[];
      if(typeof params == "number"){
        data = posts.slice(0, params);
      } else if(typeof params == "string"){
        data = posts.filter((post) => new RegExp(params, "igm").test(post[criteria as "title" | "content"]));
      } else if (params instanceof Range){
        console.log(params instanceof Range)
        data = posts.slice(params.from-1, params.to);
      } else{
        data = posts
      }
      if(data.length == 0){
        throw new DBError("No Result...")
      }
      return data;
    } catch (error) {
      throw error
    }
  },
  getBlogPost(params) {
    return Promise.resolve(posts[0])
  },
  setBlogPost(params) {
    return Promise.resolve(null)
  },
}
let getBlogPostsGroup = new GetBlogPostsGroup({present(data) {
  let dataVM : BlogPostVM[] = [];
  for(let el of data){
    dataVM.push(new BlogPostVM(el));
  }
  return dataVM
}}, gateway)

describe("testing the GetBlogpost interactor", ()=>{

  test("it returns 3 elements", async ()=>{
    await expect(getBlogPostsGroup.execute<number>(3)).resolves.toHaveLength(3)
  });
  test("it returns element whose [title] match [regexp]", ()=>{
    (getBlogPostsGroup.execute<string>('hamza', "title") as Promise<BlogPostVM[]>).then(v=>{
      expect(v[0]).toHaveProperty("title", "hamza is awesome6")
    });
  });
  test("it returns [range] of elements", async ()=>{
    let data = await getBlogPostsGroup.execute<Range>({from : 1, to : 5});
    expect(data).toHaveProperty("[0].id", "1")
  });
  // test("it returns [range] of elements", async ()=>{
  //   await expect(getBlogPostsGroup.execute<Range>({from : 2, to : 5})).resolves.toHaveLength(3)
  // });
  test("to return all documents", async ()=>{
    await expect(getBlogPostsGroup.execute<undefined>()).resolves.toStrictEqual(postsVm)
  })
  test("it returns an Error cause the article wasn't found", async ()=>{
    await expect(getBlogPostsGroup.execute<string>('moha', 'title')).rejects.toThrowError(/No result/igm)
  });

})