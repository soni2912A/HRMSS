import { useState, useEffect } from "react";
import DataTable from "../../component/DataTable";
import { employeeAPI } from "../../services/api";
import { PROJECTS } from "../shared/data";

export default function ManageTasks() {
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
            key: "project",
            label: "Project name",
            inputType: "select",
            options: PROJECTS,
            validate: { required: true },
        },
        {
            key: "task",
            label: "Task",
            placeholder: "e.g. UI Fix",
            validate: {
                required: true,
                minLength: 2,
                maxLength: 80,
            },
        },
        {
            key: "member",
            label: "Assigned to",
            inputType: "select",
            options: employeeNames,
            validate: { required: true },
        },
        {
            key: "days",
            label: "Duration",
            placeholder: "e.g. 3 days",
            validate: {
                required: true,
                pattern: /^\d+\s*days?$/i,
                patternMessage: 'Use format: "3 days"',
            },
        },
    ];

    return (
        <DataTable
            title="Manage tasks"
            addLabel="Add task"
            columns={columns}
            data={[
                { project: "App Upgrade", task: "UI Fix",    member: "Annika", days: "2 days" },
                { project: "Web Portal",  task: "API Build", member: "Lewis",  days: "5 days" },
            ]}
        />
    );
}