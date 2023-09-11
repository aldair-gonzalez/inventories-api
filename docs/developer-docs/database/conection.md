## Conexión de la base de datos a la aplicación NestJS

Este documento describe los pasos necesarios para configurar la conexión de la base de datos a la aplicación NestJS.

### Requisitos

Para configurar la conexión de la base de datos, necesitas:

* Una base de datos MySQL en funcionamiento [Configurar base de datos](/docs/developer-docs/database/README.md).
* Una aplicación NestJS con el módulo `@nestjs/typeorm` instalado.
* Un archivo `.env` que contenga las variables de entorno de la base de datos.

### Pasos

1. Instala el módulo `@nestjs/typeorm`.

```Shell
  npm install @nestjs/typeorm
```

2. Importa el módulo `ConfigModule` y el servicio `ConfigService`.

```js
  import { Module } from '@nestjs/common';
  import { ConfigModule, ConfigService } from '@nestjs/config';
```

  Configura el módulo ConfigModule para leer los valores de las variables de entorno.

```js
  @Module({
    imports: [
      ConfigModule.forRoot({
        envFilePath: [
          '.env.development',
          '.env.test',
          '.env.production',
        ],
        isGlobal: true,
        cache: true,
        load: [configuration],
      }),
    ],
  })
```

  Configura el módulo TypeOrmModule para conectarse a la base de datos.

```js
  import { TypeOrmModule } from '@nestjs/typeorm';

  @Module({
    imports: [
      ...
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          type: 'mysql',
          host: configService.get<string>('database.host'),
          port: configService.get<number>('database.port'),
          username: configService.get<string>('database.username'),
          password: configService.get<string>('database.password'),
          database: configService.get<string>('database.name'),
          entities: [],
        }),
        inject: [ConfigService],
      }),
    ],
  })
```

  Especifica los nombres de las entidades que se van a mapear a la base de datos.

```js
  typeOrmModule.forRootAsync({
    ...
    entities: [Product, Customer, Order],
  }),
```

### Ejemplo de archivo .env

El archivo .env debe contener las siguientes variables de entorno:

```
  DATABASE_HOST=localhost
  DATABASE_PORT=3306
  DATABASE_USERNAME=root
  DATABASE_PASSWORD=password
  DATABASE_NAME=nestjs-app
```


### Prueba la conexión

Una vez que hayas configurado la conexión de la base de datos, puedes probarla ejecutando el siguiente comando:

```shell
  npm run start:dev
```

Si la conexión es correcta, verás el siguiente mensaje en la consola:

```shell
  Database connection established successfully
```

### Solución a problemas comunes

Si tienes problemas para configurar la conexión de la base de datos, aquí tienes algunos consejos:

* Asegúrate de que la base de datos esté en funcionamiento.
* Verifica las credenciales de la base de datos en el archivo .env.
* Verifica la configuración del módulo TypeOrmModule.
