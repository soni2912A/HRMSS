import DataTable from "../../component/DataTable";
import { CLIENTS } from "../shared/data";

export default function Client() {
    return (
        <DataTable
            title="Clients"
            addLabel="New client"
            columns={[
                {
                    key: "name",
                    label: "Client name",
                    placeholder: "e.g. Lovekush",
                    validate: {
                        required: true,
                        minLength: 2,
                        maxLength: 60,
                    },
                },
                {
                    key: "company",
                    label: "Company name",
                    placeholder: "e.g. xyz pvt ltd",
                    validate: {
                        required: true,
                        minLength: 2,
                        maxLength: 80,
                    },
                },
                {
                    key: "email",
                    label: "Email",
                    placeholder: "e.g. name@corp.com",
                    validate: {
                        required: true,
                        maxLength: 254,                          // RFC 5321 max email length
                        pattern: /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/,
                        patternMessage: "Enter a valid email address (e.g. name@company.com).",
                    },
                },
                {
                    key: "country",
                    label: "Country",
                    placeholder: "e.g. India",
                    validate: {
                        required: true,
                        minLength: 2,
                        maxLength: 60,
                    },
                },
            ]}
            data={CLIENTS}
        />
    );
}