import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

export interface CardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export interface FeatureProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface StatisticProps {
  number: string;
  label: string;
  icon: LucideIcon;
}

export interface ContactItemProps {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
}

export interface TransportOptionProps {
  emoji: string;
  title: string;
  description: string;
}

export interface SocialMediaLink {
  icon: LucideIcon;
  href: string;
}

export interface ContactInfo {
  icon: LucideIcon;
  title: string;
  content: ReactNode;
}
