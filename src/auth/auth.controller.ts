import { Controller,Post,Body } from '@nestjs/common';
import { SignUpDTO } from './auth.dto';

@Controller('auth')
export class AuthController {

    @Post('signUp')
    signUp(@Body() signUp:SignUpDTO){
        return signUp
    }

}
