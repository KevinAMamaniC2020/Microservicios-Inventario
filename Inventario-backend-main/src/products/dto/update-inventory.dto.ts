import { IsInt, Min } from 'class-validator';

export class UpdateInventoryDto {
  @IsInt()
  code: number;

  @IsInt()
  @Min(0)
  quantity: number;
}
