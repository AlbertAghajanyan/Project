import * as uuid from 'uuid';
import * as jToken from 'jsonwebtoken';
import * as moment  from 'moment';
import * as fs from 'fs';

class Token {

    private _secretKey: string;

    constructor() {
        this._secretKey=uuid.v4();
        //write to file secret key
        /*fs.writeFile("./server/secretKey", this._secretKey, function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The secret key was saved on file!");
        }); */
    }   

    public createToken(id: number): string{
        
        let claims = {
            sub: id, //DB user id
            exp: moment().add(14, 'days').unix(), // token lives time
            iat: moment().unix(), //token generation time
            iss: 'https://intrusionDetector.am'
        };
        
        return jToken.sign(claims, this._secretKey);
    } 

    public verifyToken(token: string, callback:any): any{
        return jToken.verify(token, this._secretKey, callback);
    }

}

let token = new Token();

export { token };