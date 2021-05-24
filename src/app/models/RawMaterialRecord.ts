import { Signed } from './Signed';
import { User } from './User';

export interface RawMaterialRecord{
    id?:number,
    commodity:string,
    supplier:string,
    lote:string,
    arrival_date:any,
    start_date:any,
    end_date:any,
    user?:User,
    signed:Signed
}