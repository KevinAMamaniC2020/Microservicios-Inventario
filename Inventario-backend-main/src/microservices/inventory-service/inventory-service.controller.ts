import { Controller, Post, Body } from '@nestjs/common';
import { InventoryService } from './inventory-service.service';

@Controller('inventory')
export class InventoryServiceController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post('update')
  async updateInventory(
    @Body() updateInventoryDto: { code: string; quantity: number; type: 'in' | 'out' },
  ) {
    return this.inventoryService.updateInventory(updateInventoryDto);
  }
}
