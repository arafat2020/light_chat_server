import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { EneterFromDfermtProvidor, HeaderDto, SignInDTO, SignUpDTO } from './auth.dto';
import { ValidationPipe } from './validation.pipe';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signUp')
    signUp(@Body(new ValidationPipe) signUp: SignUpDTO) {
        return this.authService.signUp(signUp.name, signUp.password, signUp.email, signUp.imgUrl, signUp.userId, signUp.providor)
        // return signUp
    }

    @Post('signIn')
    signIn(@Body(new ValidationPipe) signUp: SignInDTO) {
        return this.authService.signIn(signUp.email, signUp.password)
    }

    @Post('enter')
    signInorSignUp(@Body(new ValidationPipe) credential: EneterFromDfermtProvidor) {
        return this.authService.enterFromDifferentProvider({
            providers: credential.providor,
            userId: credential.userId,
            email: credential.email,
            imgUrl: credential.imgUrl,
            name: credential.name,
            password: credential.password
        })
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    @ApiBearerAuth()
    profile(@Request() req: HeaderDto) {
        return req.user
    }
}
