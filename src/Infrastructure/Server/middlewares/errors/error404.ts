import BaseError from "../common/BaseError";
import { httpStatusCodes } from "../common/statusCodes";

export default class Api404Error extends BaseError {
  constructor (
  name : string,
  statusCode : number = httpStatusCodes.NOT_FOUND,
  description : string = 'Not found.',
  isOperational : boolean = true
  ) {
  super(name, statusCode, isOperational, description)
  }
 }
 