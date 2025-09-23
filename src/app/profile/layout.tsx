import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile — The Healthy Sugar Company",
  description: "Manage your account, orders, addresses, and preferences at The Healthy Sugar Company.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
