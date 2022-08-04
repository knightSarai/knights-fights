import { NestInterceptor, ExecutionContext, CallHandler, Injectable } from '@nestjs/common';

import { UserService } from '../user.service';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  constructor(private userService: UserService) {}

  async intercept(context: ExecutionContext, handler: CallHandler): Promise<any> {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session || {};

    if (userId) {
      request.user = await this.userService.findOne(userId);
    }
    return handler.handle();
  }
}


