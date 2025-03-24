import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length, Matches } from "class-validator";

export class LoginAuthDto {

	@ApiProperty({ example: "johndoe", description: "Foydalanuvchi logini" })
	@IsNotEmpty()
	@IsString()
	login: string;

	@ApiProperty({
		example: "Aaa123",
		description: "Parol 7-15 ta belgidan iborat bo‘lishi kerak. Kamida 1 ta katta harf, 1 ta kichik harf va 1 ta raqam bo‘lishi shart",
		minLength: 7,
		maxLength: 15
	})
	@IsNotEmpty()
	@IsString()
	@Length(7, 15, { message: "Password must be at least 7 characters and at most 15 characters." })
	@Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=(?:.*\d){3,})[A-Za-z\d]{7,15}$/, {
		message: "Parol kamida 1 ta katta harf, 1 ta kichik harf va 1 ta raqamdan iborat bo‘lishi kerak (maxsus belgilar kiritilmasin)"
	})
	password: string;

}
