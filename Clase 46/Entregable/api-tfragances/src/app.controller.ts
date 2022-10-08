import { Get, Post, Controller, Render, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  root() {
    return { name: 'Raul'}
  }

  @Get('login')
  @Render('login')
  loginview() {
    return { name: 'Raul'}
  }

  @UseGuards(LocalAuthGuard)
  @Get('profile')
  @Render('profile')
  profile(@Request() req) {
    return { user: req.user}
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return req.user;
  }
  // getHello(): string {
  //   return this.appService.getHello();
  // }

}
