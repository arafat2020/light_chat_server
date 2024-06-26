import { IsEmail, IsNotEmpty, isNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProvidorType } from '@prisma/client';



export class SignUpDTO {

    @ApiProperty({
        description: 'Name of the new user',
        required: true,
    })
    @IsNotEmpty({
        message: "Name is Required"
    })
    name: string

    @ApiProperty({
        description: 'Email of the new user',
        required: true,
    })
    @IsNotEmpty({
        message: "Email is required"
    })
    @IsEmail({}, {
        message: 'Enter a valid Email'
    })
    email: string

    @ApiProperty({
        description: 'Password of the new user',
        required: true,
    })
    @IsNotEmpty({
        message: "Password is Required",
    })
    password: string

    @ApiProperty({
        description: 'UserId of the new user',
        required: true,
    })
    @IsNotEmpty({
        message: "User Id is Required"
    })
    userId: string

    @ApiProperty({
        description: 'User of the new user. It should be a either img http url or base64 of a image',
        required: true,
    })
    @IsNotEmpty({
        message: "Image Is required"
    })
    imgUrl: string

    @ApiProperty({
        description: 'The providor usese for authentication',
        required: true,
        default:ProvidorType.NATIVE
    })
    @IsNotEmpty({
        message: "Image Is required"
    })
    providor: ProvidorType
    
}

export class SignInDTO {

    @ApiProperty({
        description: "Password of the user",
        required: true,
        default:'string4@gmail.com'
    })
    @IsNotEmpty({
        message: "Password is Required",
    })
    @IsEmail({}, {
        message: "Enter a Valid Email",
    })
    email: string

    @ApiProperty({
        description: "Name of the user",
        required: true,
        default:'string'
    })
    @IsNotEmpty({
        message: "Name is Required"
    })
    password: string
}
export class HeaderDto {
    @ApiProperty()
    authorization: string;

    @ApiProperty()
    user:object
  
  }

  export class EneterFromDfermtProvidor {

    @ApiProperty({
        description: 'Name of the new user',
        required: false,
    })
    name: string

    @ApiProperty({
        description: 'Email of the new user',
        required: false,
    })
    @IsNotEmpty()
    email: string

    @ApiProperty({
        description: 'Password of the new user',
        required: false,
    })
    password: string

    @ApiProperty({
        description: 'UserId of the new user',
        required: true,
    })
    @IsNotEmpty({
        message: "User Id is Required"
    })
    userId: string

    @ApiProperty({
        description: 'User of the new user. It should be a either img http url or base64 of a image',
        required: false,
    })
    imgUrl: string

    @ApiProperty({
        description: 'The providor usese for authentication',
        required: true,
        default:ProvidorType.NATIVE
    })
    @IsNotEmpty({
        message: "Providor Is required"
    })
    providor: ProvidorType
    
}


