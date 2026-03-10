import DataTable from "../../component/DataTable";

export default function Vendors() {
    return (
        <DataTable
            title="Vendor list"
            addLabel="Add vendor"
            columns={[
                {
                    key: "name",
                    label: "Vendor",
                    placeholder: "e.g. Regional Supplies",
                    validate: {
                        required: true,
                        minLength: 2,
                        maxLength: 80,
                    },
                },
                {
                    key: "mobile",
                    label: "Mobile",
                    placeholder: "e.g. +91 9876543210",
                    validate: {
                        required: true,
                        pattern: /^\+?[\d\s\-().]{7,15}$/,
                        patternMessage: "Enter a valid mobile number (7–15 digits, optionally starting with +).",
                    },
                },
                {
                    key: "email",
                    label: "Email",
                    placeholder: "e.g. vendor@company.com",
                    validate: {
                        required: true,
                        maxLength: 254,
                        pattern: /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/,
                        patternMessage: "Enter a valid email address (e.g. vendor@company.com).",
                    },
                },
                {
                    key: "city",
                    label: "City",
                    placeholder: "e.g. Mumbai",
                    validate: {
                        required: true,
                        minLength: 2,
                        maxLength: 60,
                        pattern: /^[a-zA-Z\s.\-']+$/,
                        patternMessage: "City name can only contain letters, spaces, and . - ' characters.",
                    },
                },
            ]}
            data={[
                { name: "reg",      mobile: "009877", email: "reg@yahoo.com",      city: "Cairo"     },
                { name: "REGIONAL", mobile: "21922",  email: "regional@ms.com",    city: "Sao Paulo" },
            ]}
        />
    );
}