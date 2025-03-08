import { User } from "./user.interface";

export interface Comment {
    text : string;
    parent : Comment | null;
    user: User;
    id: string;    
}