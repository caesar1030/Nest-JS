import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class PasswordPipe implements PipeTransform {
  transform(value: any) {
    if (value.toString().length > 8) {
      throw new BadRequestException('비밀번호는 8자 이하로 입력해주세요!');
    }

    return value.toString();
  }
}
