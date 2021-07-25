import { NestFactory } from "@nestjs/core";
import { SeederModule } from "./modules/seeder/seeder.module";
import { SeederService } from "./modules/seeder/seeder.service";

async function bootstrap() {
    NestFactory.createApplicationContext(SeederModule)
        .then(async appContext => {
            const seeder = appContext.get(SeederService);
            await seeder.seederPermission()
            process.exit(0)
        })
        .catch((err) => {
            console.log("error", err)
            process.exit(0)
        })
}

bootstrap()
