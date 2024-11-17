import type { Expand } from "./Expand"

export interface Account{
    id: String,
    username: String,
    email: String,
    name: String | undefined,
    expand: Expand,
    avatar: String,
    created: String | Date,
    updated: String | Date
}