import { Controller, Get, Res, Req, Render } from '@nestjs/common';

@Controller()
export class AppController {
  

  @Get()
  @Render('Index')
  public index() {
    // initial props
    return {
      title: 'Next with Nest',
    };
  }
}
