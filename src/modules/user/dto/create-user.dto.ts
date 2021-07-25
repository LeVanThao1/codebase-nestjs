import { GUserInput } from "src/schema";

export class CreateUserInputDTO implements GUserInput {
    username: string
    password: string
    lastName: string
    firstName: string
    displayName?: string
    email: string
}
