import { Controller,Post,Body } from '@nestjs/common';
import { SignInDTO, SignUpDTO } from './auth.dto';
import { ValidationPipe } from './validation.pipe';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post('signUp')
    signUp(@Body(new ValidationPipe) signUp:SignUpDTO){
        return this.authService.signUp(signUp.name,signUp.password,signUp.email,signUp.imgUrl,signUp.userId)
    }

    @Post('signIn')
    signIn(@Body(new ValidationPipe) signUp:SignInDTO){
        return this.authService.signIn(signUp.email,signUp.password)
    }
}
