import {
  Palette,
  Package,
  Wine,
  Gift,
  Sparkles,
  Shield,
  Ruler,
  Star,
  Eye,
  Heart,
  CheckCircle,
  Paintbrush,
  Thermometer,
  Zap,
  Calendar,
  Users,
  Truck
} from "lucide-react"

export const productTypeConfigs = {
  artwork: {
    name: "obrazy",
    icon: Palette,
    detailFields: [
      { icon: Paintbrush, label: "Technika", field: "technique" },
      { icon: Ruler, label: "Rozměry", field: "dimensions" },
      { icon: Calendar, label: "Rok vzniku", field: "year" },
      { icon: Eye, label: "Materiál", field: "material" }
    ],
    features: [
      {
        icon: Eye,
        title: "Možnost prohlídky",
        description: "Před koupí si dílo můžete prohlédnout osobně"
      },
      {
        icon: Heart,
        title: "Odborné poradenství",
        description: "Pomůžeme vám vybrat dílo podle vašich představ"
      },
      {
        icon: Shield,
        title: "Certifikát pravosti",
        description: "Každé dílo je dodáváno s certifikátem"
      }
    ]
  },
  ceramics: {
    name: "keramika",
    icon: Package,
    detailFields: [
      { icon: Thermometer, label: "Materiál", field: "material" },
      { icon: Ruler, label: "Rozměry", field: "dimensions" },
      { icon: Zap, label: "Technika", field: "technique" },
      { icon: CheckCircle, label: "Kvalita", field: "handmade" }
    ],
    features: [
      {
        icon: Package,
        title: "Pečlivé balení",
        description: "Bezpečné zabalení pro přepravu"
      },
      {
        icon: CheckCircle,
        title: "Ručně vyráběno",
        description: "Každý kus je originální dílo"
      },
      {
        icon: Shield,
        title: "Garance kvality",
        description: "30 dní na vrácení zboží"
      }
    ]
  },
  glass: {
    name: "sklo",
    icon: Wine,
    detailFields: [
      { icon: Sparkles, label: "Typ skla", field: "material" },
      { icon: Ruler, label: "Rozměry", field: "dimensions" },
      { icon: Shield, label: "Technika", field: "technique" },
      { icon: Gift, label: "Dárkové balení", field: "giftWrapping" }
    ],
    features: [
      {
        icon: Sparkles,
        title: "Prémiová kvalita",
        description: "Pouze nejkvalitnější sklo od uznávaných skláren"
      },
      {
        icon: Shield,
        title: "Pojištěná přeprava",
        description: "Speciální balení a pojištění proti poškození"
      },
      {
        icon: Gift,
        title: "Dárkové balení",
        description: "Elegantní dárkové balení zdarma"
      },
      {
        icon: Star,
        title: "Česká tradice",
        description: "Pokračování stoletých českých sklářských tradic"
      }
    ]
  },
  gifts: {
    name: "darkove-predmety",
    icon: Gift,
    detailFields: [
      { icon: Package, label: "Materiál", field: "material" },
      { icon: Package, label: "Rozměry", field: "dimensions" },
      { icon: Gift, label: "Dárkové balení", field: "giftWrapping" },
      { icon: Users, label: "Pro koho", field: "universal" }
    ],
    features: [
      {
        icon: Gift,
        title: "Dárkové balení",
        description: "Elegantní balení zdarma k většině produktů"
      },
      {
        icon: Users,
        title: "Osobní vzkaz",
        description: "Možnost přiložit osobní přání k dárku"
      },
      {
        icon: CheckCircle,
        title: "Garance kvality",
        description: "Spokojeni nebo vrátíme peníze"
      },
      {
        icon: Truck,
        title: "Rychlé doručení",
        description: "Dodání do 2 pracovních dnů"
      }
    ]
  }
}
