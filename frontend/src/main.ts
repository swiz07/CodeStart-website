import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { App } from './app/app';
import {routes} from './app/app.routes';
import * as monaco from 'monaco-editor';

(window as any).MonacoEnvironment={
  getWorkerUrl: (moduleId: string, label: string) => {
    if (label === 'json') {
        return './assets/monaco/esm/vs/language/json/json.worker.js'
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
        return './assets/monaco/esm/vs/language/css/css.worker.js'
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
        return './assets/monaco/esm/vs/language/html/html.worker.js'
    }
    if (label === 'typescript' || label === 'javascript') {
        return './assets/monaco/esm/vs/language/typescript/ts.worker.js'
    }
    return './assets/monaco/esm/vs/editor/editor.worker.js'
}
};

bootstrapApplication(App,{
  providers:[provideRouter(routes)]
});
