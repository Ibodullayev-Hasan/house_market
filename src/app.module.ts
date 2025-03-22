import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvConfig, TypeOrmConfig } from './configs';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GloabalResponseFormatterInterceptors } from './interceptors/global-response.interceptor';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(EnvConfig),

    TypeOrmModule.forRootAsync(TypeOrmConfig),
    
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: GloabalResponseFormatterInterceptors
    }
  ],
})
export class AppModule { }
