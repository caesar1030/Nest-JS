import { IsIn, IsNumber, IsOptional } from 'class-validator';

export class PaginatePostDto {
  @IsNumber()
  @IsOptional()
  where__id_less_than?: number = 0;

  @IsNumber()
  @IsOptional()
  where__id_more_than?: number = 0;

  @IsIn(['ASC', 'DESC'])
  @IsOptional()
  order__createdAt: 'ASC' | 'DESC' = 'ASC' as const;

  @IsNumber()
  @IsOptional()
  take: number = 20;
}
