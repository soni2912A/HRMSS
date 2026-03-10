import DataTable from "../../component/DataTable";

export default function TeamMembers() {
    return (
        <DataTable
            title="Team members"
            addLabel="Add member"
            columns={[
                {
                    key: "name",
                    label: "Name",
                    placeholder: "e.g. Annika",
                    validate: {
                        required: true,
                        minLength: 2,
                        maxLength: 60,
                        pattern: /^[a-zA-Z\s.'-]+$/,
                        patternMessage: "Name can only contain letters, spaces, and . ' - characters.",
                    },
                },
                {
                    key: "role",
                    label: "Role",
                    placeholder: "e.g. Lead",
                    validate: {
                        required: true,
                        minLength: 2,
                        maxLength: 40,
                    },
                },
                {
                    key: "email",
                    label: "Email",
                    placeholder: "e.g. name@corp.com",
                    validate: {
                        required: true,
                        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        patternMessage: "Enter a valid email address (e.g. name@corp.com).",
                    },
                },
                {
                    key: "phone",
                    label: "Phone",
                    placeholder: "e.g. 9000011122",
                    validate: {
                        required: true,
                        pattern: /^\+?[\d\s\-().]{7,15}$/,
                        patternMessage: "Enter a valid phone number (7–15 digits).",
                    },
                },
            ]}
            data={[
                { name: "Annika", role: "Lead",    email: "annika@corp.com", phone: "90000111" },
                { name: "Terry",  role: "Manager", email: "terry@corp.com",  phone: "90000222" },
            ]}
        />
    );
}