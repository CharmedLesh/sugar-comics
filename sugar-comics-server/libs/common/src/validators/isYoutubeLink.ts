import { registerDecorator, ValidationOptions, buildMessage } from 'class-validator';

export function IsYoutubeLink(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: 'IsYoutubeLink',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value: any) {
                    if (value != undefined || value != '') {
                        if (typeof value === 'string') {
                            const regExp =
                                /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
                            const matches = value.match(regExp);
                            if (matches) {
                                return true;
                            }

                            return false;
                        }

                        return false;
                    }
                    return false;
                },
                defaultMessage: buildMessage(() => 'Video must be a correct youtube link')
            }
        });
    };
}
