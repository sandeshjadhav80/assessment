export const jwtConstants = {
    secret: 'fullstack',
    // for the timing keep this value as it is, but in future
    // please change this value and protect it from exposing from outside word
    // this key is used to generate jwt token and decrypt jwt token so if someone got this then he can
    // use this key to create jwt token for any random user and can access of that user
};