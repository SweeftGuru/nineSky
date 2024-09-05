import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './user/entities/user.entity';

@Module({
  imports: [
    UserModule, 
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true, // This makes the config module globally available
      envFilePath: '.env', // Specify the path to your .env file (optional if it's in the root directory)
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Ensure ConfigModule is imported
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('localhost'), // Fallback to 'localhost' if not set
        port: configService.get<number>('POSTGRES_PORT', 5432), // Fallback to 5432
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DB'),
        entities: [User], // Auto-load entities
        synchronize: true, // Set to false in production
        migrationsRun: false,
        logging: true, 
      }),
    }),
  ],
})
export class AppModule {
}

