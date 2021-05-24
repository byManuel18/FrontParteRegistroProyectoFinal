import { MeatRecord } from './MeatRecord';
import { Signed } from './Signed';
import { User } from './User';

export interface TraceabilityOfMeat{
    id?:number,
    arrivaldate:any,
    startdate:any,
    enddate:any,
    user?:User,
    signed:Signed,
    meatrecord:MeatRecord
}