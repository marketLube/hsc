import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Successful - The Healthy Sugar Company",
  description: "Your order has been confirmed! Thank you for choosing healthy sweetness with our stevia-based products.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SuccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
