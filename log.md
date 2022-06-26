[1mdiff --git a/src/Entities/BlogPost.ts b/src/Entities/BlogPost.ts[m
[1mdeleted file mode 100644[m
[1mindex 3545432..0000000[m
[1m--- a/src/Entities/BlogPost.ts[m
[1m+++ /dev/null[m
[36m@@ -1,40 +0,0 @@[m
[31m-import { InvalidInputError } from "@/common/customErrors";[m
[31m-import { UserVM } from "@/viewmodels/userVM";[m
[31m-import { v4 } from "uuid";[m
[31m-[m
[31m-export default class BlogPost{[m
[31m-  readonly id : string;[m
[31m-  title : string;[m
[31m-  // content : { // chunks of text. that could be fetched on demand so we only get the first chunk not the whole content[m
[31m-  //   [key : string] : string[m
[31m-  // };[m
[31m-  content : string;[m
[31m-  private meta : {[key : string] : string} = {};[m
[31m-  readonly createdAt : Date;[m
[31m-  lastModified : Date;[m
[31m-  readonly owner : Omit<UserVM, "email" | "providerId" | "lastModified" | "joinedAt">;[m
[31m-  private constructor(params : BlogPost){[m
[31m-    this.id = params.id || v4().toString().replace(/-/igm, '');[m
[31m-    this.title = params.title;[m
[31m-    this.content = params.content; [m
[31m-    this.createdAt = params.createdAt || new Date(); [m
[31m-    this.lastModified = params.lastModified; [m
[31m-    this.owner = params.owner; [m
[31m-  }[m
[31m-[m
[31m-  static create(params : BlogPost): BlogPost{[m
[31m-    if(params.title.length < 20 || params.title.length > 80) throw new InvalidInputError("title length must be between 20 and 80 characters long");[m
[31m-    return BlogPost.create(params);[m
[31m-  }[m
[31m-[m
[31m-  // chunkContent(){[m
[31m-  //   let fit = Math.ceil(this.content.length / 240);[m
[31m-  //   let chunk = "";[m
[31m-  //   for(let i = 0; i < fit ; i++){[m
[31m-  //     let lastBorder = chunk.length < 240 ?  : this.content.lastIndexOf(" ", 10);[m
[31m-  //     chunk = this.content.slice(i * lastBorder, lastBorder);[m
[31m-  //     this.meta[i+1] = chunk;[m
[31m-  //   }[m
[31m-  // }[m
[31m-[m
[31m-};[m
\ No newline at end of file[m
[1mdiff --git a/src/infrastructure/server/routers/auth.router.ts b/src/infrastructure/server/routers/auth.router.ts[m
[1mindex fe88453..89b805f 100644[m
[1m--- a/src/infrastructure/server/routers/auth.router.ts[m
[1m+++ b/src/infrastructure/server/routers/auth.router.ts[m
[36m@@ -7,7 +7,6 @@[m [mimport { DBError, InvalidInputError } from "@/common/customErrors";[m
 import express from "express"[m
 import { UserVM } from "@/viewmodels/userVM";[m
 import User from "@/Entities/User";[m
[31m-import session from "express-session";[m
 [m
 let googleAuthRouter = express.Router();[m
 [m
[36m@@ -17,17 +16,6 @@[m [mconst GoogleStrategy = Google.Strategy;[m
 googleAuthRouter.use(passport.initialize());[m
 googleAuthRouter.use(passport.session())[m
 [m
[31m-const SESSION = session({[m
[31m-  name : "userSession",[m
[31m-  secret : process.env.SESSION_SECRET as string,[m
[31m-  cookie : {[m
[31m-            maxAge : Infinity,[m
[31m-            secure : "auto"[m
[31m-          },[m
[31m-  resave : false,[m
[31m-  saveUninitialized : false[m
[31m-})[m
[31m-[m
 [m
 let getUser = userFactory.makeGetUser(), setUser = userFactory.makeSetUser();[m
 [m
[36m@@ -95,13 +83,22 @@[m [mgoogleAuthRouter.get('/authentication/google',[m
 googleAuthRouter.get('/authentication/google/callback', [m
   passport.authenticate('google', {failureRedirect: 'http://localhost:8080/authentication/signin'}),[m
   function(req : Request<{authenticatedUser : UserVM}, {}, {authenticatedUser : UserVM}, {authenticatedUser : UserVM}>, res, next) {[m
[32m+[m[32m    // let user = await getUser.execute({providerId : (req.user as {id : string}).id})[m
[32m+[m[32m    // Successful authentication, redirect home.[m
[32m+[m[32m    // let user = {id : req.id}[m
[32m+[m[32m    // res.locals.authenticatedUser = user as UserVM;[m
[32m+[m[32m    // //@ts-ignore[m
[32m+[m[32m    // console.log("74", req.session.passport.user)[m
[32m+[m[32m    // res.redirect('http://loc