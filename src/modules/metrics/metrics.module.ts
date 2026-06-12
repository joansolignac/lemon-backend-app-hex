import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { MetricsController } from './metrics.controller';
import { GetSupervisorMetricsSummaryFeature } from './features/get-supervisor-metrics-summary.feature';
import { GetAdminMetricsSummaryFeature } from './features/get-admin-metrics-summary.feature';

@Module({
  imports: [AuthModule],
  controllers: [MetricsController],
  providers: [
    GetSupervisorMetricsSummaryFeature,
    GetAdminMetricsSummaryFeature,
  ],
})
export class MetricsModule {}
