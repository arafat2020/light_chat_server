import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignUpDTO{

    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    password: string

    @IsNotEmpty()
    userid:string
    
    @IsNotEmpty()
    imgUrl:string
}