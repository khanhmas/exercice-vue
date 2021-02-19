const MAX_NAME = 200;
const MAX_DESCRIPTION = 135;

export default {
    MAX_NAME,
    MAX_DESCRIPTION,
    LOCAL_STORAGE_KEY: 'dishes',
    IMAGE_URL_REGEX: /(https?:\/\/.*\.(?:png|jpg))/i,
    VALIDATORS: [
        {field: 'name', criterias: [{name: 'required', value: true}, {name: 'maxLength', value: MAX_NAME}]},
        {field: 'description', criterias: [{name: 'maxLength', value: MAX_DESCRIPTION}]}
    ]
};
