import { constructMetadata } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DashboardHeader } from "@/components/dashboard/header";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";
import ResortItemManager from "./Dashboard";

export const metadata = constructMetadata({
    title: "Dashboard – Rakkaranta",
    description: "Create and manage content.",
});

export default async function DashboardPage() {

    return (
        <>
            <DashboardHeader  
                heading="Dashboard"  
                text="Interact with your IFC model, add items, and make real-time updates with ease."  
            /> 
            <ResortItemManager />
        </>
    );
}
