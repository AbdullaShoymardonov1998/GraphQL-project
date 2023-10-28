import { CoreModule } from '@/core/core.module'
import { Module } from '@nestjs/common'
import { EventService } from './event.service'
import { EventResolver } from './event.resolver'

@Module({
  imports: [CoreModule],
  controllers: [],
  providers: [EventResolver, EventService],
  exports: [EventResolver, EventService],
})
export class EventModule {}
