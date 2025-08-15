"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";
import UserInfo from "./UserInfo";
import OrderList from "./OrderList";
import AddressList from "./AddressList";
import Voucher from "./Voucher";

export default function ProfileLayout() {
  const [tab, setTab] = useState<"info" | "orders" | "addresses" | "voucher">(
    "info"
  );

  return (
    <div className="flex flex-col sm:flex-row mt-6 sm:mt-10 mb-6 sm:mb-10 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 gap-4 sm:gap-6 max-w-[1440px] mx-auto">
      <Sidebar tab={tab} onTabChange={setTab} />
      <div className="flex-1 space-y-4 sm:space-y-6">
        {tab === "info" && <UserInfo />}
        {tab === "orders" && <OrderList />}
        {tab === "addresses" && <AddressList />}
        {tab === "voucher" && <Voucher />}
      </div>
    </div>
  );
}
