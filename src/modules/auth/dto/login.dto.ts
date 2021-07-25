import { IsNotEmpty, IsString, MinLength } from "class-validator";
import { LoginInput } from "src/schema";

export class LoginInputDTO implements LoginInput {

    @IsNotEmpty({
        message: "Tài khoản hoặc email là bắt buộc"
    })
    @IsString({
        message: "Tài khoản hoặc email là bắt buộc"
    })
    @MinLength(1, {
        message: "Tài khoản hoặc email là bắt buộc"
    })
    username: string;

    @IsNotEmpty({
        message: "Mật khẩu bắt buộc"
    })
    @IsString({
        message: "Mật khẩu bắt buộc"
    })
    @MinLength(1,{
        message: "Mật khẩu bắt buộc"
    })
    password: string;
    
}
