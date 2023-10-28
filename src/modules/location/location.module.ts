import { CoreModule } from '@/core/core.module'
import { Module } from '@nestjs/common'
import { LocationResolver } from './location.resolver'
import { LocationService } from './location.service'

@Module({
  imports: [CoreModule],
  providers: [LocationResolver, LocationService],
  controllers: [],
  exports: [LocationResolver, LocationService],
})
export class LocationModule {}
