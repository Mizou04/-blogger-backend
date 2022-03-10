class UserEntity implements IUser{
  id: string;
  joinedAt: string;
  restricted: { duration: string; };
  username: string;
  name : string
  constructor(options : IUser & {name : string}){
    this.id = options.id;
    this.joinedAt = options.joinedAt
    this.restricted = options.restricted
    this.username = options.username;
    this.name = options.name
  }
}

// class UserEntity{
//   private _users : {[id : string] : IUser} = {};
//   private userNames : Set<string> = new Set<string>();

//   getUserById(id : string) : IUser | undefined{
//     return this._users[id];
//   }
//   setUser(user : IUser) : boolean{
//     this._users[user.id] = user;
//     return true;
//   }
//   addUserName(username :string) : boolean{
//     if(this.userNames.has(username)) return false;
//     this.userNames.add(username);
//     return true;
//   };
//   getUserUsername(id : string) : string | undefined {
//     return this._users[id].username;
//   }

//   getUserByUserName(username : string) : IUser | undefined{
//     let user : Partial<IUser> = {};
//     for (let key of Object.keys(this._users)){
//         if(this._users[key].username === username){
//           user = this._users[key];
//         }
//     }
//     return user as IUser;
//   }

// }



// interface IUser{
//   name : string,
//   username : string,
//   id : string,
//   profile_pic? : string,
//   articles? : Array<IBlogPost<IUser, IComment>>
// }

// class P extends MYParams{
//   readonly params: string[];
//   constructor(...params : string[]){
//     super([]);
//     this.params = params;
//   }
//   log(): void {
//       console.log(...this.params)
//   }
// } 
