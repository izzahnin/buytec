import React, { useState, useMemo, useEffect } from "react";
import { Button } from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { FaRegTrashCan } from "react-icons/fa6";

import getAllAdmin from "@/firebase/admin/getAllAdmin";
import { AdminType } from "@/firebase/admin/admin";
import { createNewAdmin } from "@/firebase/admin/createNewAdmin";
import { deleteAdmin } from "@/firebase/admin/deleteAdmin";

import AdminListAdminsModal from "./AdminListAdminsModal";

const AdminListAdmins: React.FC = () => {
  const [admins, setAdmins] = useState<Array<AdminType>>([]);
  const [newAdminUsername, setNewAdminUsername] = useState<string>("");
  const [newAdminPassword, setNewAdminPassword] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchAdmins = async () => {
      const adminsData = await getAllAdmin();
      if (adminsData) {
        setAdmins(adminsData);
      }
    };

    fetchAdmins();
  }, []);

  const handleCreateAdmin = async () => {
    await createNewAdmin(newAdminUsername, newAdminPassword);
    const updatedAdmins = await getAllAdmin();
    if (updatedAdmins) {
      setAdmins(updatedAdmins);
    }
    setNewAdminUsername("");
    setNewAdminPassword("");
    setIsModalOpen(false);
  };

  const handleDeleteAdmin = async (username: string | null) => {
    if (username) {
      const isConfirmed = window.confirm(
        `Are you sure you want to delete admin '${username}'?`,
      );

      if (isConfirmed) {
        await deleteAdmin(username);

        const updatedAdmins = await getAllAdmin();
        if (updatedAdmins) {
          setAdmins(updatedAdmins);
        }
      }
    }
  };

  const columns = useMemo<MRT_ColumnDef<AdminType>[]>(
    () => [
      {
        id: "username",
        accessorKey: "username",
        header: "Username",
        size: 150,
      },
      {
        id: "superAdmin",
        accessorKey: "superAdmin",
        header: "Super Admin",
        size: 150,
        Cell: ({ row }) => (row.original.superAdmin ? "Yes" : "No"),
      },
      {
        id: "action",
        accessorKey: "",
        header: "Action",
        size: 100,
        Cell: ({ row }) => (
          <button
            onClick={() => handleDeleteAdmin(row.original.username)}
            className="text-heading-s text-red-500"
          >
            <FaRegTrashCan />
          </button>
        ),
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data: admins,
    enableRowNumbers: true,
    rowNumberDisplayMode: "original",
    renderTopToolbarCustomActions: () => (
      <Button
        variant="contained"
        onClick={() => {
          setIsModalOpen(true);
        }}
        sx={{
          backgroundColor: "blue !important",
          "&:hover": {
            backgroundColor: "inherit",
          },
          textTransform: "none",
          fontWeight: "bold",
        }}
      >
        Create New Admin
      </Button>
    ),
    state: {
      isLoading: false,
      isSaving: false,
      showAlertBanner: false,
      showProgressBars: false,
    },
  });

  return (
    <div>
      <MaterialReactTable table={table} />

      {isModalOpen && (
        <AdminListAdminsModal
          onClose={() => {
            setIsModalOpen(false);
            setNewAdminUsername("");
            setNewAdminPassword("");
          }}
          createAdmin={handleCreateAdmin}
          newAdminUsername={newAdminUsername}
          setNewAdminUsername={setNewAdminUsername}
          newAdminPassword={newAdminPassword}
          setNewAdminPassword={setNewAdminPassword}
        />
      )}
    </div>
  );
};

export default AdminListAdmins;
