import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

export const User = createParamDecorator((data, context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest();
  const user = req.user;

  if (!user) {
    throw new InternalServerErrorException(
      'Request에 user 프로퍼티가 존재하지 않습니다!',
    );
  }

  return user;
});
