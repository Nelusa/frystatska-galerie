import {FeatureProps, StatisticProps} from "@/lib/types";

export const Feature = ({ icon: Icon, title, description }: FeatureProps) => (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <div>
        <h3 className="font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
);

export const Statistic = ({ number, label, icon: Icon }: StatisticProps) => (
    <div className="text-center">
      <div className="flex items-center justify-center mb-2">
        <Icon className="w-8 h-8 text-primary mr-2" />
        <span className="text-3xl font-bold text-foreground">{number}</span>
      </div>
      <p className="text-muted-foreground font-medium">{label}</p>
    </div>
);
