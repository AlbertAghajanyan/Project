import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';


console.log("env: " + environment.production);

if (environment.production) {
  console.log("production main.ts");
  enableProdMode();
} else {
  console.log("development main.ts");
}

platformBrowserDynamic().bootstrapModule(AppModule);
