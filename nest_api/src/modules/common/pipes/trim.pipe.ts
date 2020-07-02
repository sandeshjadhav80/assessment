import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
const _ = require('lodash');
@Injectable()
export class TrimPipe implements PipeTransform {
    /**
     * @summary trim white space from given payload
     *
     * @arg(value): any type payload which is send
     * @arg(ArgumentMetadata): ArgumentMetadata
     *
     * @returns response : trimed payload
     */
    transform(value: any, metadata: ArgumentMetadata) {
        if(metadata.type === 'body') {
            if(_.isObject(value)) {
                for (let key of Object.keys(value)) {
                    value[key] = value[key].toString().trim();
                }
            }
        }
        return value;
    }
}