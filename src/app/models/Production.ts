import { RawMaterialRecord } from './RawMaterialRecord';
import { Signed } from './Signed';
import { TraceabilityOfMeat } from './TraceabilityOfMeat';
import { User } from './User';

export interface Production{
    id?:number,
    product:string,
    date:any,
    amount:number,
    user?:User,
    signed:Signed,
    listTraceabilityOfMeat?:TraceabilityOfMeat[],
    listRawMaterialRecord?:RawMaterialRecord[],

}