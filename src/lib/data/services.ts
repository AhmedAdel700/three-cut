// @/lib/data/services.ts
import { Factory, ShieldCheck, Wrench, Headset } from "lucide-react";

export const services = [
  {
    title: "Boost Output & Profit—Cut Costs",
    description:
      "Our CNC machines can cover the workload of a 7-operator production line with speed and precision—reducing labor bottlenecks and human-error loss.",
    features: [
      "Automates repetitive operations end-to-end",
      "Consistent, repeatable accuracy at scale",
      "Lower scrap rates and rework time",
      "Higher throughput with fewer operators",
      "Fast ROI from reduced overhead",
    ],
    icon: Factory,
  },
  {
    title: "Zero-Disruption Manufacturing",
    description:
      "Engineered with high-grade components to deliver top build quality and reliability—minimizing technical errors that can stall production.",
    features: [
      "Industrial-grade parts & controllers",
      "Tight tolerance holding under load",
      "Stable performance in long runs",
      "Proactive fault prevention",
      "Protects downstream processes",
    ],
    icon: ShieldCheck,
  },
  {
    title: "End-to-End Turnkey Service",
    description:
      "Fully tailored services based on your needs: fast delivery and installation, plus hands-on training so your team performs at its best.",
    features: [
      "Needs assessment & tailored setup",
      "Rapid delivery & commissioning",
      "Operator & maintainer training",
      "Process optimization guidance",
      "Documentation & best practices",
    ],
    icon: Wrench,
  },
  {
    title: "Pro & Rapid Tech Support",
    description:
      "Specialist engineers deliver professional service with quick response times for urgent maintenance and repairs—keeping you running.",
    features: [
      "Priority remote diagnostics",
      "On-site emergency repairs",
      "Scheduled preventive maintenance",
      "Genuine spare parts & upgrades",
      "Clear SLAs & response windows",
    ],
    icon: Headset,
  },
  // Optional: the extra line you shared as a highlight card
  {
    title: "Custom-Built Solutions for You",
    description:
      "We design and build solutions precisely for your challenges and budget—listening first, then delivering what moves your business forward.",
    features: [
      "Tailored specs & configurations",
      "Budget-aligned planning",
      "Scalable, future-proof design",
      "Integration with existing lines",
      "Proof-of-concepts on request",
    ],
    icon: Wrench,
  },
];
