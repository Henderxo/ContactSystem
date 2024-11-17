export interface Permissions{
    id: String,
    edit_employees: Boolean,
    delete_employees: Boolean,
    edit_offices: Boolean,
    delete_offices: Boolean,
    edit_structure: Boolean,
    delete_structure: Boolean,
    edit_permissions: Boolean,
    delete_permissions: Boolean,
    edit_companies: Boolean,
    delete_companies: Boolean,
    created: String | Date,
    updated: String | Date
}