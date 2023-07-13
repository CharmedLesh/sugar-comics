import { registerDecorator, ValidationOptions, ValidationArguments, buildMessage } from 'class-validator';

export function LimitValidator(property: string, validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: 'LimitValidator',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const [relatedPropertyName] = args.constraints;
                    const relatedValue = (args.object as any)[relatedPropertyName];

                    if (typeof relatedValue === 'boolean') {
                        if (relatedValue === true) {
                            if (typeof value === 'number' && Number.isInteger(value) && value !== 0) {
                                return true;
                            }
                            return false;
                        }

                        if (relatedValue === false) {
                            if (value === null || value === undefined) {
                                return true;
                            }
                            return false;
                        }
                    }
                    return false;
                },
                defaultMessage: buildMessage((eachPrefix) => `${eachPrefix} limit validation error`, validationOptions)
            }
        });
    };
}
