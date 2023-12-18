import React, { useEffect, useState, useMemo, useCallback } from "react";
import Image from "next/image";
import { Button } from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { FaEdit, FaTrash } from "react-icons/fa";

import AdminProductModal from "./AdminProductModal";
import { PerfumeProps } from "@/firebase/perfume/perfume";
import getAllPerfume from "@/firebase/perfume/getAllPerfume";
import deletePerfume from "@/firebase/perfume/deletePerfume";
import { parserCurrency } from "@/utils/parsercurrency";

export default function AdminListProduct() {
  const [perfumes, setPerfumes] = useState<Array<PerfumeProps> | undefined>(
    undefined,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editPerfumeData, setEditPerfumeData] = useState<
    PerfumeProps | undefined
  >(undefined);

  const fetchData = useCallback(async () => {
    const data = await getAllPerfume();
    setPerfumes(data);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const toggleModal = () => {
    setEditPerfumeData(undefined);
    setIsModalOpen(!isModalOpen);
  };

  const handleAddPerfume = async () => {
    await fetchData();
    toggleModal();
  };

  const handleEditPerfume = useCallback((perfume: PerfumeProps) => {
    setEditPerfumeData(perfume);
    setIsModalOpen(true);
  }, []);

  const handleDeletePerfume = useCallback(
    async (perfume: PerfumeProps) => {
      const isConfirmed = window.confirm(
        `Are you sure you want to delete the perfume '${perfume.name}'?`,
      );

      if (isConfirmed) {
        await deletePerfume(perfume.id);
        await fetchData();
      }
    },
    [fetchData],
  );

  const columns = useMemo<MRT_ColumnDef<PerfumeProps>[]>(
    () => [
      {
        id: "id",
        accessorKey: "id",
        header: "ID",
        size: 50,
      },
      {
        id: "brand",
        accessorKey: "brand",
        header: "Brand",
        size: 100,
      },
      {
        id: "name",
        accessorKey: "name",
        header: "Name",
        size: 150,
      },
      {
        id: "image",
        accessorKey: "image",
        header: "Image",
        size: 150,
        Cell: ({ renderedCellValue }) => (
          <div className="relative h-16 w-12">
            <Image
              src={renderedCellValue as string}
              alt="Perfume Image"
              fill
              sizes="(max-width: 100px) 100vw"
            />
          </div>
        ),
      },
      {
        id: "price",
        accessorKey: "price",
        header: "Price",
        size: 100,
        Cell: ({ renderedCellValue }) => (
          <div>{parserCurrency(renderedCellValue as number)}</div>
        ),
      },
      {
        id: "stock",
        accessorKey: "stock",
        header: "Stock",
        size: 100,
      },
      {
        id: "size",
        accessorKey: "size",
        header: "Size",
        size: 100,
      },
      {
        id: "gender",
        accessorKey: "gender",
        header: "Gender",
        size: 100,
      },
      {
        id: "origin",
        accessorKey: "origin",
        header: "Origin",
        size: 100,
      },
      {
        id: "occasion",
        accessorKey: "occasion",
        header: "Occasion",
        size: 150,
      },
      {
        id: "concentration",
        accessorKey: "concentration",
        header: "Concentration",
        size: 150,
      },
      {
        id: "bestSeller",
        accessorKey: "bestSeller",
        header: "Best Seller",
        size: 100,
        Cell: ({ row }) => (row.original.bestSeller ? "Yes" : "No"),
      },
      {
        id: "description",
        accessorKey: "description",
        header: "Description",
        size: 150,
        Cell: ({ renderedCellValue }) => (
          <div className="line-clamp-3 text-sm">{renderedCellValue}</div>
        ),
      },
      {
        id: "topNotes",
        accessorKey: "topNotes",
        header: "Top Notes",
        size: 150,
        Cell: ({ renderedCellValue }) => (
          <div>
            {Array.isArray(renderedCellValue) &&
              renderedCellValue.map((note, index) => (
                <div key={index} className="line-clamp-1">
                  - {note}
                </div>
              ))}
          </div>
        ),
      },
      {
        id: "middleNotes",
        accessorKey: "middleNotes",
        header: "Middle Notes",
        size: 150,
        Cell: ({ renderedCellValue }) => (
          <div>
            {Array.isArray(renderedCellValue) &&
              renderedCellValue.map((note, index) => (
                <div key={index} className="line-clamp-1">
                  - {note}
                </div>
              ))}
          </div>
        ),
      },
      {
        id: "baseNotes",
        accessorKey: "baseNotes",
        header: "Base Notes",
        size: 150,
        Cell: ({ renderedCellValue }) => (
          <div>
            {Array.isArray(renderedCellValue) &&
              renderedCellValue.map((note, index) => (
                <div key={index} className="line-clamp-1">
                  - {note}
                </div>
              ))}
          </div>
        ),
      },
      {
        id: "action",
        accessorKey: "",
        header: "Action",
        size: 150,
        Cell: ({ row }) => (
          <div className="flex gap-2">
            <button
              onClick={() => handleEditPerfume(row.original)}
              className="text-heading-s text-blue-500"
            >
              <FaEdit />
            </button>

            <button
              onClick={() => handleDeletePerfume(row.original)}
              className="text-xl text-red-500"
            >
              <FaTrash />
            </button>
          </div>
        ),
      },
    ],
    [handleDeletePerfume, handleEditPerfume],
  );

  const table = useMaterialReactTable({
    columns,
    data: perfumes || [],
    enableRowNumbers: true,
    rowNumberDisplayMode: "original",
    renderTopToolbarCustomActions: () => (
      <Button
        variant="contained"
        onClick={toggleModal}
        sx={{
          backgroundColor: "blue !important",
          "&:hover": {
            backgroundColor: "inherit",
          },
          textTransform: "none",
          fontWeight: "bold",
        }}
      >
        Add New Perfume
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
    <div className="m-6">
      <MaterialReactTable table={table} />

      {/* Modal */}
      {isModalOpen && (
        <AdminProductModal
          onClose={toggleModal}
          onSubmit={handleAddPerfume}
          initialData={editPerfumeData}
        />
      )}
    </div>
  );
}
