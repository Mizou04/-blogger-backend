import { BaseInteractor } from "@/interactors/_common/BaseInteractor";
import { request, Request, response, Response } from "express";


export abstract class BaseController{
  protected req! : Request;
  protected res! : Response;


  public execute(req : Request, res : Response){
    this.req = req;
    this.res = res;
    this.executeImpl();
  }

  abstract executeImpl() : any | Promise<void | any>

}

