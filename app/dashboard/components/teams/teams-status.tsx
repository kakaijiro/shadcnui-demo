import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ListCheckIcon, PieChartIcon, StarIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
import { teamLeaders } from "@/lib/teamLeaders";
import {
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
  TooltipContent,
} from "@/components/ui/tooltip";
import Image from "next/image";
import TeamDistributionChart from "./team-distribution-chart";
import SupportTicketsResolved from "./support-tickets-resolved";

export default function TeamsStatus() {
  return (
    <>
      <div className="grid lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="-mb-4">
            <CardTitle className="text-base">Total teams</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div className="flex gap-2">
              <UsersIcon />
              <div className="text-5xl font-bold">8</div>
            </div>
            <div>
              <Button size="xs" asChild>
                <Link href="/dashboard/teams">View all</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="-mb-4">
            <CardTitle className="text-base flex items-center justify-between">
              <span>Team leaders</span>
              <StarIcon className="text-yellow-500" />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {teamLeaders.map((leader) => (
              <TooltipProvider key={`${leader.firstName}${leader.lastName}`}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Avatar className="h-10 w-10">
                      {!!leader.avatar && (
                        <Image
                          src={leader.avatar}
                          alt={`${leader.firstName} ${leader.lastName} avatar`}
                          width={40}
                          height={40}
                          className="rounded-full object-cover"
                        />
                      )}
                      <AvatarFallback>
                        {leader.firstName[0]}
                        {leader.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>
                    {`${leader.firstName} ${leader.lastName}`}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="-mb-4">
            <CardTitle className="text-base flex justify-between items-center">
              <span>Team distribution</span>
              <PieChartIcon />
            </CardTitle>
          </CardHeader>
          <CardContent className="-mb-4">
            <TeamDistributionChart />
          </CardContent>
        </Card>
      </div>
      <Card className="my-4">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <ListCheckIcon />
            <span>Suport tickets resolved</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pl-0">
          <SupportTicketsResolved />
        </CardContent>
      </Card>
    </>
  );
}
