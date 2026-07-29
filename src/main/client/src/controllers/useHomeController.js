import { useEffect, useState } from "react";
import { pingApi } from "../services/api";

export function useHomeController() {
    const [pingMessage, setPingMessage] = useState("Loading API status...");

    useEffect(() => {
        let isMounted = true;

        pingApi()
            .then(({ message }) => {
                if (isMounted) {
                    setPingMessage(message);
                }
            })
            .catch(() => {
                if (isMounted) {
                    setPingMessage("unavailable");
                }
            });

        return () => {
            isMounted = false;
        };
    }, []);

    return { pingMessage };
}
