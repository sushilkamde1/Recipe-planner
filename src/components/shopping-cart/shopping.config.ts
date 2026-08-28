import { FaCreditCard, FaMoneyBillTransfer } from "react-icons/fa6";
import { SiPaytm } from "react-icons/si";

export const paymentOptions = [
  {
    id: "card" as const,
    label: "Card",
    icon: FaCreditCard,
  },
  {
    id: "paytm" as const,
    label: "Paytm",
    icon: SiPaytm,
  },
  {
    id: "cash" as const,
    label: "Cash on delivery",
    icon: FaMoneyBillTransfer,
  },
];
