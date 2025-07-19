import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmployeesStatus from "./components/employees/employees-status";
import TeamsStatus from "./components/teams/teams-status";

export default function DashboardPage() {
  return (
    <Tabs defaultValue="employees">
      <TabsList className="mb-4 gap-2">
        <TabsTrigger value="employees">Employees statsu</TabsTrigger>
        <TabsTrigger value="teams">Teams statsu</TabsTrigger>
      </TabsList>
      <TabsContent value="employees">
        <EmployeesStatus />
      </TabsContent>
      <TabsContent value="teams">
        <TeamsStatus />
      </TabsContent>
    </Tabs>
  );
}
