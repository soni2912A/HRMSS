import { useState, useEffect } from "react";
import DataTable from "../../component/DataTable";
import { employeeAPI } from "../../services/api";

export default function GoodsReceived() {
    const [employeeNames, setEmployeeNames] = useState([]);

    useEffect(() => {
        employeeAPI.getAll()
            .then((res) => {
                // Backend returns { data: [...] } — confirmed from EmployeeList.jsx
                setEmployeeNames((res.data || []).map((e) => e.name).filter(Boolean));
            })
            .catch((err) => console.error('Failed to load employees:', err));
    }, []);

    const columns = [
        {
            key: "gr",
            label: "GR no",
            placeholder: "e.g. GR-0016",
            validate: {
                required: true,
                pattern: /^GR-\d{4,}$/,
                patternMessage: "Must follow format GR-#### (e.g. GR-0016).",
            },
        },
        {
            key: "employee",
            label: "Employee name",
            inputType: "select",
            options: employeeNames,
            validate: { required: true },
        },
        {
            key: "vendor",
            label: "Vendor",
            placeholder: "e.g. REGIONAL",
            validate: {
                required: true,
                minLength: 2,
                maxLength: 80,
            },
        },
        {
            key: "date",
            label: "Date",
            inputType: "date",
            validate: { required: true },
        },
        {
            key: "total",
            label: "Total",
            placeholder: "e.g. 5000",
            validate: {
                required: true,
                pattern: /^\d+(\.\d{1,2})?$/,
                patternMessage: "Enter a valid amount (e.g. 5000 or 1200.50).",
            },
        },
    ];

    return (
        <DataTable
            title="Goods received"
            addLabel="Goods receive"
            columns={columns}
            data={[
                { gr: "GR-0015", employee: "Annika", vendor: "REGIONAL", date: "2025-09-02", total: 900    },
                { gr: "GR-0014", employee: "Terry",  vendor: "JOKKO",    date: "2025-05-29", total: 100000 },
            ]}
        />
    );
}