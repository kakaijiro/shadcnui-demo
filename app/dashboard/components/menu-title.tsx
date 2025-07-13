import { PersonStandingIcon } from "lucide-react";

export default function MenuTitle() {
  return (
    <h3 className="flex items-center">
      <PersonStandingIcon size={40} className="text-primary" />
      SupportMe
    </h3>
  );
}
