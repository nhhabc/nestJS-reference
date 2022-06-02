import {IsString, Matches, MaxLength, MinLength} from "class-validator";

export class AuthCredentialDto {
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(6)
    @MaxLength(32)
    password: string
}