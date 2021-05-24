import { Appliance } from './Appliance';
import { Signed } from './Signed';
import { User } from './User';

export interface TemperatureRecord{
    id?:number,
    temperature:number,
    date:any,
    appliance?:Appliance,
    user?:User,
    signed:Signed
}