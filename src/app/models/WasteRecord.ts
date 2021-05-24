import { Signed } from './Signed';
import { User } from './User';

export interface WasteRecord{
    id?:number,
    person:string,
    date:any,
    amount:number,
    user?:User,
    signed:Signed
}