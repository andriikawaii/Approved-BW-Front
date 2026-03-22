import type { FooterVariant } from "./footer";

export type PhoneItem = {
  label: string;
  number: string;
};

const FAIRFIELD_PHONE: PhoneItem = { label: "Fairfield County", number: "(203) 919-9616" };
const NEWHAVEN_PHONE: PhoneItem = { label: "New Haven County", number: "(203) 466-9148" };

export function resolvePhones(variant: FooterVariant): PhoneItem[] {
  switch (variant) {
    case "B":
      return [FAIRFIELD_PHONE];
    case "C":
    case "D":
      return [NEWHAVEN_PHONE];
    case "A":
    default:
      return [FAIRFIELD_PHONE, NEWHAVEN_PHONE];
  }
}
