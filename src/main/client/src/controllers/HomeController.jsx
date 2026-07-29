import { HomeView } from "../views/HomeView";
import { useHomeController } from "./useHomeController";

export function HomeController() {
    const { pingMessage } = useHomeController();
    return <HomeView pingMessage={pingMessage} />;
}
