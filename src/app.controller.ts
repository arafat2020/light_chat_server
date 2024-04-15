import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  

  @Get()
  public index() {
    // initial props
    return {
      title: 'hello from nest',
    };
  }
}
