import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <main className="bg-[#030303] h-full min-h-screen text-[#FFFFFF] px-4">
      <Outlet />
    </main>
  );
}
