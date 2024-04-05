import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ServerDTO {

    @ApiProperty({
        description:'Name of Server that will be newly created',
        required:true
    })
    @IsNotEmpty()
    name: string

    @ApiProperty({
        description:'Server Image that will represent the server',
        required:true
    })
    @IsNotEmpty()
    imageUrl: string

}