"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";
import UserInfo from "./UserInfo";
import OrderList from "./OrderList";
import AddressList from "./AddressList";

export default function ProfileLayout() {
  const [tab, setTab] = useState<"info" | "orders" | "addresses">("info");

  return (
    <div className="flex mt-10 mb-10 px-40 gap-6">
      <Sidebar tab={tab} onTabChange={setTab} />
      <div className="flex-1 space-y-6">
        {tab === "info" && <UserInfo />}
        {tab === "orders" && <OrderList />}
        {tab === "addresses" && <AddressList />}
      </div>
    </div>
  );
}

// "use client";
// import { useState } from "react";
// import Sidebar from "./Sidebar";
// import UserInfo from "./UserInfo";
// import OrderList from "./OrderList";
// import AddressList from "./AddressList";

// export default function ProfileLayout() {
//   const [tab, setTab] = useState<"info" | "orders" | "addresses">("info");

//   return (
//     <div className="flex flex-col lg:flex-row mt-8 lg:mt-10 mb-10 px-4 sm:px-6 lg:px-20 xl:px-40 gap-6">
//       <Sidebar tab={tab} onTabChange={setTab} />
//       <div className="flex-1 space-y-6">
//         {tab === "info" && <UserInfo />}
//         {tab === "orders" && <OrderList />}
//         {tab === "addresses" && <AddressList />}
//       </div>
//     </div>
//   );
// }
