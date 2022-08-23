import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { Fight } from '../fights/fight.entity';
import { User } from '../user/user.entity';


export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (config: ConfigService): Promise<TypeOrmModuleOptions> => {
    let dbConfig: TypeOrmModuleOptions = {
      synchronize: false
    };

    switch (process.env.NODE_ENV) {
      case 'development':
        dbConfig = {
          ...dbConfig,
          type: 'sqlite',
          database: config.get<string>('DB_NAME'),
          entities: [User, Fight],
          synchronize: true,
          logging: true,
        }
        break;
      case 'test':
        dbConfig = {
          ...dbConfig,
          type: 'sqlite',
          database: config.get<string>('DB_NAME'),
          entities: ['**/*.entity.ts'],
          logging: true,
        }
        break;
      case 'production':
        break;
      default:
        throw new Error(`NODE_ENV ${process.env.NODE_ENV} is not supported`);
    }


    return dbConfig;
  },
};
