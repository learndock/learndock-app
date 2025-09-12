import { BiChat, BiClipboard, BiStats } from "react-icons/bi";
import { FiLoader } from "react-icons/fi";
import { LuCircleArrowOutUpRight } from "react-icons/lu";
import { useQuery } from "react-query";
import { Tooltip } from "react-tooltip";
import ServerStatsChart from "../components/custom/TechnicalDashboard/ServerStatsChart";
import ActionButton from "../components/lib/Buttons/Action.Button";
import Panel from "../components/lib/Panels/SimplePanel";
import { useUser } from "../hooks/User.hooks";
import { getDatabaseFileSizeKB } from "../service/System.service";
import NoAccessPage from "./lib/NoAccessPage";
import { GLOBAL } from "../core/Environment";


export default function TechnicalDashboard() {
    const { user, isUserLoading } = useUser();

    const { data: databaseFileSize, isLoading: isDatabaseFileSizeLoading } = useQuery<number>(
        'databaseFileSize',
        getDatabaseFileSizeKB
    );

    const isLoading = isUserLoading || isDatabaseFileSizeLoading;

    if (isLoading) {
        return (
            <div className="h-full flex items-center justify-center">
                <FiLoader className="animate-spin text-4xl text-text-primary" />
            </div>
        );
    }

    if (!user?.roles.includes("TECHNICAL")) {
        return <NoAccessPage />;
    }

    const openH2Console = () => {
        if(GLOBAL.isProduction) window.open('/h2-console', '_blank');
        else window.open(`http://localhost:${GLOBAL.proxyPort}/h2-console`, '_blank')
    }

    return (
        <div className="w-full max-w-full mt-4 px-10 flex flex-row">
            <Panel title={"Ressource Stats"} icon={<BiStats />}>
                <ServerStatsChart />
            </Panel>

            <Panel title={"Other Stats"} icon={<BiChat />} className="ml-4">
                <div className="text-text-primary">
                    <p className="mb-2">
                        Database Filesize: {databaseFileSize ? `${databaseFileSize.toFixed(2)} KB` : 'Loading...'}
                    </p>
                </div>
            </Panel>

            <Panel title={"Black Board"} icon={<BiClipboard />} className="ml-auto">
                <ActionButton
                    onClick={() => openH2Console()}
                    icon={LuCircleArrowOutUpRight}
                    data-tooltip-id="h2-console-tooltip"
                >
                    <span>H2-Console</span>
                </ActionButton>
                <Tooltip id="h2-console-tooltip" place="left" className="text-text-primary">
                    <div className="font-bold mb-2">Permission required: <span className="text-accent">DB_ADMIN</span></div>
                    <p className="max-w-100">Opens the H2-Console in a new tab. Runs on production system. 
                    <span className="italic text-error">{GLOBAL.isDevelopment && ` Since you are currently on a development system, we will try to redirect you to
                     your database source system instantly (open the console there). If this does not work, try navigating there manually.`}</span></p>
                </Tooltip>
            </Panel>
        </div>

    )

}
