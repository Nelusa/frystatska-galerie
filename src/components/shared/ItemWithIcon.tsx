import { Text } from "@/components/ui/text";
import {IconCircle, IconCircleSize} from "./IconCircle";
import {LucideIcon} from "lucide-react";
import {ReactNode} from "react";

export interface ItemWithIconProps {
  icon?: LucideIcon;
  emoji?: string;
  title: string;
  children: ReactNode;
}

export const ItemWithIcon = ({ icon: Icon, emoji, title, children }: ItemWithIconProps) => (
    <div className="flex items-start space-x-3">
      <IconCircle icon={Icon} emoji={emoji} size={IconCircleSize.Base} />
      <div className="flex-1">
        <Text variant="h5" className="mb-1">{title}</Text>
        {children}
      </div>
    </div>
);


