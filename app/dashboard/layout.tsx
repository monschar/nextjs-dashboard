import SideNav from "@/app/ui/dashboard/sidenav";
import { Spinner } from "../ui/dashboard/spinner";
import { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row">
      <Spinner show={false} />
      <div className="w-full flex-none md:w-44">
        <SideNav />
      </div>
      <div className="flex-grow p-6">
        <Suspense>{children}</Suspense>
      </div>
    </div>
  );
}
