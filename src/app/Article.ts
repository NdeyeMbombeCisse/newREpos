export interface ApiResponse<T>{
    message?:string;
    data:T;
}

export interface Article{
    nom:string;
    description:string;
    id:number;
}