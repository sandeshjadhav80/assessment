import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExceptionsFilter } from './modules/common/index';
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    // gloabl error handling is commented for development environment
    // app.useGlobalFilters(new ExceptionsFilter());
    await app.listen(3000);
    
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}
bootstrap();
