import {
  FlaskConical,
  LayoutDashboard,
  LifeBuoy,
  LineChart,
  ListTree,
  Settings,
  TextSelect,
  UsersIcon,
  
} from "lucide-react";
import { BuildingLibraryIcon, WrenchScrewdriverIcon, ChatBubbleBottomCenterIcon } from "@heroicons/react/24/solid";

export const ROUTES = [
  {
    name: "Dashboard",
    pathname: `/project/[projectId]`,
    icon: LayoutDashboard,
  },
  {
    name: "Truth Tables",
    pathname: `/project/[projectId]/knowledge`,
    icon: BuildingLibraryIcon,
  },
  {
    name: "Chats",
    pathname: `/project/[projectId]/chats/`,
    icon: ChatBubbleBottomCenterIcon,
  },
  {
    name: "Docks",
    pathname: `/project/[projectId]/docks/`,
    icon: WrenchScrewdriverIcon,
  },
  {
    name: "Analytics (alpha)",
    pathname: `/project/[projectId]/analytics`,
    icon: FlaskConical,
  },
  {
    name: "Traces",
    pathname: `/project/[projectId]/traces`,
    icon: ListTree,
  },
  {
    name: "Generations",
    pathname: `/project/[projectId]/generations`,
    icon: TextSelect,
  },
  {
    name: "Scores",
    pathname: `/project/[projectId]/scores`,
    icon: LineChart,
  },
  {
    name: "Users",
    pathname: `/project/[projectId]/users`,
    icon: UsersIcon,
  },
  {
    name: "Settings",
    pathname: "/project/[projectId]/settings",
    icon: Settings,
  },
  {
    name: "Support",
    pathname: "/project/[projectId]/support",
    icon: LifeBuoy,
  },
];
