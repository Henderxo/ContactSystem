import type { Company } from "./Company";
import type { Group } from "./Group";
import type { Department } from "./Department";
import type { Office } from "./Office";
import type { Division } from "./Division";
import type { Contact } from "./Contact";

export interface APIRequest{
    error: boolean,
    message: String,
    code: Number|String,
    data: Company | Company[]| Office[] | Department[] | Division[]| Group[] | Contact[],
    totalItems: Number | null,
    totalPages: Number | null,
    page: Number | null,
    token?: String
}