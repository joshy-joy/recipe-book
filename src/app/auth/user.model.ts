export class User {
    constructor(
        public email,
        public localId,
        private _token,
        private _tokenExpirationTime
    ){}

    get token(){
        if(!this._tokenExpirationTime || new Date() > this._tokenExpirationTime) {
            return null;
        }
        return this._token;
    }
}