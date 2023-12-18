import { useMemo, useEffect, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
} from "material-react-table";
import AdminPurchaseDetail from "./AdminPurchaseDetail";

import { TransactionProps } from "@/firebase/transaction/transaction";
import { parserCurrency } from "@/utils/parsercurrency";
import getAllTransaction from "@/firebase/transaction/getAllTransaction";
import changeTransactionStatus from "@/firebase/transaction/changeTransactionStatus";

export default function AdminListPurchase() {
  const [data, setData] = useState<TransactionProps[] | undefined>(undefined);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedRow, setSelectedRow] =
    useState<MRT_Row<TransactionProps> | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transactions = await getAllTransaction();
        console.log("Fetched data:", transactions);
        setData(transactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchData();
  }, []);

  const columns = useMemo<MRT_ColumnDef<TransactionProps>[]>(
    () => [
      {
        id: "id",
        accessorKey: "id",
        header: "Order ID",
        size: 150,
      },
      {
        id: "userName",
        accessorKey: "userName",
        header: "Customer",
        size: 150,
      },
      {
        id: "packageStatus",
        accessorKey: "packageStatus",
        header: "Status",
        size: 200,
        Cell: ({ row }) => (
          <select
            value={row.original.packageStatus}
            onChange={(e) => {
              const newStatus = e.target.value;
              handleStatusChange(row, newStatus);
            }}
          >
            <option value="Wait for verification">Wait for verification</option>
            <option value="Packed">Packed</option>
            <option value="Sent">Sent</option>
            <option value="Received">Received</option>
          </select>
        ),
      },
      {
        id: "total",
        accessorKey: "total",
        header: "Total",
        size: 150,
        Cell: ({ row }) => parserCurrency(row.original.total),
      },
      {
        id: "action",
        accessorKey: "",
        header: "Action",
        size: 150,
        Cell: ({ row }) => (
          <button onClick={() => handleDetails(row)}>Details</button>
        ),
      },
    ],
    [],
  );

  const handleDetails = (row: MRT_Row<TransactionProps>) => {
    console.log("Details clicked for row:", row.original);
    setSelectedRow(row);
    setShowDetailModal(true);
  };

  const handleStatusChange = async (
    row: MRT_Row<TransactionProps>,
    newStatus: string,
  ) => {
    try {
      // Change the transaction status
      await changeTransactionStatus(row.original.id, newStatus);

      // Refetch the data after status change
      const transactions = await getAllTransaction();
      console.log("Fetched data:", transactions);
      setData(transactions);
    } catch (error) {
      console.error("Error changing transaction status:", error);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: data || [],
    enableRowNumbers: true,
    rowNumberDisplayMode: "original",
  });

  return (
    <>
      <MaterialReactTable table={table} />
      {showDetailModal && selectedRow && (
        <AdminPurchaseDetail
          data={selectedRow.original}
          onClose={() => setShowDetailModal(false)}
        />
      )}
    </>
  );
}
