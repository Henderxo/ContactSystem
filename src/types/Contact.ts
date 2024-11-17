import { type Expand } from "./Expand"
export interface Contact{
    id: String,
    name: String,
    surname: String,
    email: String,
    phone_number: String,
    position: String,
    expand: Expand | undefined,
    photo: String | undefined,
    created: String | Date,
    updated: String | Date

}
