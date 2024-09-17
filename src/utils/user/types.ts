import { Roles } from "src/user/user.entities"

export type CreateUserParams = {
    
    name: string

    about: string

    email: string

    role: Roles
}

export type UpdateUserParams = {
    
    name: string

    about: string

    email: string

    role: Roles
}

