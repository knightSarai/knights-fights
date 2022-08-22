import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';


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
          entities: [__dirname + '**/*.entity.{js,ts}'],
          //migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
          /* cli: { */
          /*   migrationsDir: __dirname + '/../database/migrations', */
          /* }, */
          //
          //entities: [User, Fight],
          //entities: ['**/*.entity.ts'],
          extra: {
            charset: 'utf8mb4_unicode_ci',
          },
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

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  
  cli: {
    migrationsDir: __dirname + '/../database/migrations',
  },
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
  synchronize: false,
  logging: true,
};
