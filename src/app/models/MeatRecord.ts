import { Signed } from './Signed';
import { User } from './User';

export interface MeatRecord{
    id?:number,
    product:string,
    supplier:string,
    date:any,
	lote:string,
	signed:Signed,
    user?:User
}