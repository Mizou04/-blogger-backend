// function whereClauseToMongoDBProjection(clause : string) : Objection{

// }

export function projectionFromArray(projection : string[]) : {[k : string] : number} {

  let obj : {[k : string] : number} = {};
  
  for(let i = 0; i < projection.length; i++){
    obj =  {...obj, [projection[i]] : 1};
  }

  return obj
}