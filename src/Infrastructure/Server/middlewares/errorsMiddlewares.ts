import { Request, Response, NextFunction } from "express"
import BaseError from "./common/BaseError"

export function logError (err : BaseError) {
  console.error(err)
 }
 
export function logErrorMiddleware (err : BaseError, req : Request, res : Response, next : NextFunction) {
  logError(err)
  next(err)
}

export function returnErrorMiddleware (err : BaseError, req : Request, res : Response, next : NextFunction) {
res.status(err.statusCode || 500).send(err.message)
}

export function isOperationalError(error : unknown) {
  if (error instanceof BaseError){
  return error.isOperational
  }
  return false
 }
