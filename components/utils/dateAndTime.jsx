import React, { useState, useEffect } from "react";
import { CalendarIcon } from "lucide-react";
import Container from "../layout/container";

function CurrentDateTime() {
    const [currentDateTime, setCurrentDateTime] = useState("");

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const options = {
                weekday: "long",
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true
            };
            const formattedDateTime = now.toLocaleDateString("en-US", options).replace(",", " at");
            setCurrentDateTime(formattedDateTime);
        };

        updateDateTime();
        const interval = setInterval(updateDateTime, 60000); // Update every minute

        return () => clearInterval(interval);
    }, []);

    return (
        <Container>
            <CalendarIcon width={18} height={18} />
            <span className="text-sm font-normal">{currentDateTime}</span>
        </Container>
    );
};

export default CurrentDateTime;
