import { IsString, IsInt, Min } from 'class-validator';

export class UpdateInventoryDto {
  @IsString()
  code: string;

  @IsInt()
  @Min(0)
  quantity: number;
}
