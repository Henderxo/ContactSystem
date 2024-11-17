import type { Account } from "./Account";
import type { Company } from "./Company";
import type { Department } from "./Department";
import type { Division } from "./Division";
import type { Group } from "./Group";
import type { Office } from "./Office";
import type { Contact } from "./Contact";
import type { Permissions } from "./Permissions";

export interface Expand{
    account_id: Account | undefined,
    company_id: Company | undefined,
    contact_id: Contact | undefined,
    department_id: Department | undefined,
    division_id: Division | undefined,
    group_id: Group | undefined,
    office_id: Office | undefined,
    permissions_id: Permissions | undefined
}