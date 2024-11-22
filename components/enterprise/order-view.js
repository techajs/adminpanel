"use client";
import { getEnterpriseOrder } from "@/services/order";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

const EnterpriseOrderView = () =>{
    const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [order, setOrder] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pageSize: 10,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [orderstatus, setOrderStatus] = useState("current");
  const [pageSize, setPageSize] = useState("");

  const fetchOrderList = useCallback(
    async (currentPage, currentSearch, currentStatus,pageSize) => {
      setLoading(true);
      try {
        const response = await getEnterpriseOrder(
          currentPage,
          currentSearch,
          currentStatus,
          pageSize
        );
        setOrder(response.data);
        setPagination({
          total: response.total,
          page: response.page,
          pageSize: response.pageSize,
          totalPages: response.totalPages,
        });
      } catch (error) {
        setOrder([]);
        setPagination({
          total: 0,
          page: 1,
          pageSize: 10,
          totalPages: 0,
        });
      } finally {
        setLoading(false);
      }
    },
    []
  );
   return (
    <h1>order View</h1>
   )
}
export default EnterpriseOrderView