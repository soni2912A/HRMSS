import DataTable from "../../component/DataTable";

export default function Reports() {
    return (
        <DataTable
            title="Reports"
            addLabel="New report"
            columns={[
                {
                    key: "title",
                    label: "Report title",
                    placeholder: "e.g. Procurement Summary",
                    validate: {
                        required: true,
                        minLength: 3,
                        maxLength: 100,
                    },
                },
                {
                    key: "type",
                    label: "Type",
                    placeholder: "e.g. Monthly",
                    validate: {
                        required: true,
                        minLength: 2,
                        maxLength: 40,
                    },
                },
                {
                    key: "date",
                    label: "Date",
                    inputType: "date",
                    validate: {
                        required: true,
                    },
                },
            ]}
            data={[
                { title: "Procurement Summary", type: "Monthly", date: "2026-02-10" },
                { title: "Vendor Spend",        type: "Vendor",  date: "2026-02-12" },
            ]}
        />
    );
}