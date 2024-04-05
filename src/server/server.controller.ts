import { Controller, UseGuards, Post, Body, Request } from '@nestjs/common';
import { ServerService } from './server.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ValidationPipe } from 'src/auth/validation.pipe';
import { ServerDTO } from './server.dto';
import { ApiBearerAuth } from '@nestjs/swagger';


@Controller('server')
export class ServerController {
    constructor(private serverService: ServerService) { }

    @Post('create')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async create(@Body(new ValidationPipe) server: ServerDTO, @Request() req) {
        return this.serverService.createServer({
            serverImg:server.imageUrl,
            serverName:server.name,
            user:req.user
        })
    }
}
