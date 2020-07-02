import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class LangService {
    constructor(private readonly i18n: I18nService) {}

    get(lang: string, key: string, data: object = {}) {
        return this.i18n.translate(key, {lang: lang, args: data});
    }
}
