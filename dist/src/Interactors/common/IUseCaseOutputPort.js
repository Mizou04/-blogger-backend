"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// let output : IUseCaseOutputPort<string, {content : string}> = {present(result){
//   let html = "";
//   html += result
//   return Promise.resolve({content : html})
// }};
// let user = User.create({name : "hamzaz", email : "jsa@gmail.com", id : "123", joinedAt : "12/22/2022"});
// let gatewayMock : IUserGateway & {users : {[id : string] : User}} = {
//   users : {"123" : user},
//   async getUserById(id : string) : Promise<User>{
//     return this.users[id];
//   }
// };
// let input : IUseCaseInputPort<string, string, IUserGateway> = {
//   gateway : gatewayMock,
//   execute(str : string){
//     let h = str;
//     return Promise.resolve(h)
//   }
// };
// let controller = {
//   async onString(output : IUseCaseOutputPort<string, {content : string}>){
//     let content = await output.present(await input.execute("hello"));
//     view.render(content)
//   }
// };
// controller.onString(output)
// let view = {
//   html : console.log,
//   render(struct : {content : string}){
//     this.html(struct.content);
// }}
