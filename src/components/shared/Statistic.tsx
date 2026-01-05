import { LucideIcon } from "lucide-react";

import { Text } from "@/components/ui/text";

export interface StatisticProps {
  number: string;
  label: string;
  icon: LucideIcon;
}

export const Statistic = ({ number, label, icon: Icon }: StatisticProps) => (
    <div className="text-center">
      <div className="flex items-center justify-center mb-2">
        <Icon className="w-8 h-8 text-primary mr-2" />
        <Text
          variant="h2"
          className="text-3xl font-bold">{number}</Text>
      </div>
      <Text
        variant="label"
        color="neutral"
        className="font-medium">{label}</Text>
    </div>
);


