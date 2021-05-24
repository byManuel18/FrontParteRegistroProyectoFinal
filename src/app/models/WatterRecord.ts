import { Condition } from './Condition';
import { Signed } from './Signed';
import { User } from './User';

export interface WatterRecord{
    id?:number,
    samplingpoint:string,
    organoleptic_control:number,
    date:any,
    signed:Signed,
    user?:User,
    condition:Condition
}