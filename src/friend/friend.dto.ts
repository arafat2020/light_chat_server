import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from "class-validator";
export class FriedDTOsend{

    @ApiProperty()
    @IsNotEmpty()
    toID:string

}

export class FriedDTOaccept{

    @ApiProperty()
    @IsNotEmpty()
    friendID:string

}