import React, { useState, ChangeEvent, FormEvent } from "react";
import addNewPerfume from "@/firebase/perfume/addNewPerfume";
import updatePerfume from "@/firebase/perfume/updatePerfume";
import { PerfumeProps } from "@/firebase/perfume/perfume";

interface AdminProductModalProps {
  onClose: () => void;
  onSubmit: () => void;
  initialData?: PerfumeProps;
}

export default function AdminProductModal({
  onClose,
  onSubmit,
  initialData,
}: AdminProductModalProps) {
  const isUpdateMode = !!initialData;

  const [formData, setFormData] = useState<PerfumeProps>(
    (initialData as PerfumeProps) || {
      brand: "",
      name: "",
      image: "",
      price: 0,
      stock: 0,
      size: 0,
      gender: "",
      origin: "",
      occasion: "",
      concentration: "",
      bestSeller: false,
      description: "",
      topNotes: [],
      middleNotes: [],
      baseNotes: [],
    },
  );

  const [inputErrors, setInputErrors] = useState<Record<string, string>>({});

  const isFormValid = () => {
    const errors: Record<string, string> = {};

    if (formData.brand.trim() === "") {
      errors.brand = "Please enter the brand.";
    }

    if (formData.name.trim() === "") {
      errors.name = "Please enter the perfume name.";
    }

    if (!formData.image) {
      errors.image = "Please select an image.";
    }

    if (formData.price <= 0) {
      errors.price = "Please enter a valid price.";
    }

    if (formData.stock <= 0) {
      errors.stock = "Please enter a valid stock value.";
    }

    if (formData.size <= 0) {
      errors.size = "Please enter a valid size.";
    }

    if (formData.gender.trim() === "") {
      errors.gender = "Please select the gender.";
    }

    if (formData.origin.trim() === "") {
      errors.origin = "Please enter the origin.";
    }

    if (formData.occasion.trim() === "") {
      errors.occasion = "Please enter the occasion.";
    }

    if (formData.concentration.trim() === "") {
      errors.concentration = "Please enter the concentration.";
    }

    if (formData.bestSeller === undefined) {
      errors.bestSeller = "Please select whether it's a best seller.";
    }

    if (formData.description.trim() === "") {
      errors.description = "Please enter the description.";
    }

    if (formData.topNotes.length === 0) {
      errors.topNotes = "Please enter at least one top note.";
    }

    if (formData.middleNotes.length === 0) {
      errors.middleNotes = "Please enter at least one middle note.";
    }

    if (formData.baseNotes.length === 0) {
      errors.baseNotes = "Please enter at least one base note.";
    }

    setInputErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setInputErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    setInputErrors((prevErrors) => ({
      ...prevErrors,
      image: "",
    }));

    setFormData((prevData) => ({
      ...prevData,
      image: file || "",
    }));
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isFormValid()) {
      try {
        if (initialData) {
          await updatePerfume(formData);
        } else {
          await addNewPerfume({
            ...formData,
            image: formData.image as File,
          });
        }

        onSubmit();
        onClose();

        alert(`Perfume ${initialData ? "updated" : "created"} successfully!`);
      } catch (error) {
        console.error("An error occurred while saving the perfume:", error);
        alert("An error occurred while saving the perfume.");
      }
    } else {
      console.error("Form is not valid. Please fill in all required fields.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50">
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-screen w-screen overflow-auto bg-white sm:h-[600px] sm:w-2/4 sm:rounded-lg">
          <section className="flex flex-col overflow-y-auto text-xl text-black">
            <header className="border-b-2 font-bold">
              <div className="flex items-center gap-10 px-6 py-4 sm:flex-row-reverse sm:justify-between">
                <button onClick={onClose} className="text-heading-l">
                  &times;
                </button>
                <p className="pt-2 text-primary-blue-accent">
                  {initialData ? "Edit Perfume" : "Create New Perfume"}
                </p>
              </div>
            </header>

            <form
              onSubmit={handleFormSubmit}
              className="flex flex-col gap-4 px-6 py-4"
            >
              <div className="flex flex-col gap-2">
                <label>Brand:</label>
                <div className="rounded-lg border-2 border-black p-3">
                  <input
                    type="text"
                    name="brand"
                    placeholder="Brand"
                    className="w-full outline-none"
                    value={formData.brand}
                    onChange={handleInputChange}
                  />
                </div>
                {inputErrors.brand && (
                  <p className="-mt-1 text-sm text-red-500">
                    {inputErrors.brand}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label>Perfume Name:</label>
                <div className="rounded-lg border-2 border-black p-3">
                  <input
                    type="text"
                    name="name"
                    placeholder="Perfume Name"
                    className="w-full outline-none"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                {inputErrors.name && (
                  <p className="-mt-1 text-sm text-red-500">
                    {inputErrors.name}
                  </p>
                )}
              </div>

              {!isUpdateMode && (
                <div className="flex flex-col gap-2">
                  <label>Image:</label>
                  <div className="rounded-lg border-2 border-black p-3">
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e)}
                      className="w-full outline-none"
                    />
                  </div>
                  {inputErrors.image && (
                    <p className="-mt-1 text-sm text-red-500">
                      {inputErrors.image}
                    </p>
                  )}
                </div>
              )}

              <div className="flex flex-col gap-2">
                <label>Price:</label>
                <div className="rounded-lg border-2 border-black p-3">
                  <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    className="w-full outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    value={formData.price}
                    onChange={handleInputChange}
                  />
                </div>
                {inputErrors.price && (
                  <p className="-mt-1 text-sm text-red-500">
                    {inputErrors.price}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label>Stock:</label>
                <div className="rounded-lg border-2 border-black p-3">
                  <input
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    className="w-full outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    value={formData.stock}
                    onChange={handleInputChange}
                  />
                </div>
                {inputErrors.stock && (
                  <p className="-mt-1 text-sm text-red-500">
                    {inputErrors.stock}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label>Size:</label>
                <div className="rounded-lg border-2 border-black p-3">
                  <input
                    type="number"
                    name="size"
                    placeholder="Size"
                    className="w-full outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    value={formData.size}
                    onChange={handleInputChange}
                  />
                </div>
                {inputErrors.size && (
                  <p className="-mt-1 text-sm text-red-500">
                    {inputErrors.size}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label>Gender:</label>
                <div className="rounded-lg border-2 border-black p-3">
                  <select
                    name="gender"
                    className="w-full outline-none"
                    value={formData.gender}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="unisex">Unisex</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                {inputErrors.gender && (
                  <p className="-mt-1 text-sm text-red-500">
                    {inputErrors.gender}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label>Origin:</label>
                <div className="rounded-lg border-2 border-black p-3">
                  <input
                    type="text"
                    name="origin"
                    placeholder="Origin"
                    className="w-full outline-none"
                    value={formData.origin}
                    onChange={handleInputChange}
                  />
                </div>
                {inputErrors.origin && (
                  <p className="-mt-1 text-sm text-red-500">
                    {inputErrors.origin}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label>Occasion:</label>
                <div className="rounded-lg border-2 border-black p-3">
                  <input
                    type="text"
                    name="occasion"
                    placeholder="Occasion"
                    className="w-full outline-none"
                    value={formData.occasion}
                    onChange={handleInputChange}
                  />
                </div>
                {inputErrors.occasion && (
                  <p className="-mt-1 text-sm text-red-500">
                    {inputErrors.occasion}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label>Concentration:</label>
                <div className="rounded-lg border-2 border-black p-3">
                  <input
                    type="text"
                    name="concentration"
                    placeholder="Concentration"
                    className="w-full outline-none"
                    value={formData.concentration}
                    onChange={handleInputChange}
                  />
                </div>
                {inputErrors.concentration && (
                  <p className="-mt-1 text-sm text-red-500">
                    {inputErrors.concentration}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label>Best Seller:</label>
                <div className="rounded-lg border-2 border-black p-3">
                  <select
                    name="bestSeller"
                    className="w-full outline-none"
                    value={formData.bestSeller ? "true" : "false"}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Best Seller</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
                {inputErrors.bestSeller && (
                  <p className="-mt-1 text-sm text-red-500">
                    {inputErrors.bestSeller}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label>Description:</label>
                <div className="rounded-lg border-2 border-black p-3">
                  <textarea
                    name="description"
                    placeholder="Description"
                    className="w-full outline-none"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>
                {inputErrors.description && (
                  <p className="-mt-1 text-sm text-red-500">
                    {inputErrors.description}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label>Top Notes (comma-separated):</label>
                <div className="rounded-lg border-2 border-black p-3">
                  <input
                    type="text"
                    name="topNotes"
                    placeholder="Top Notes"
                    className="w-full outline-none"
                    value={formData.topNotes.join(", ")}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        topNotes: e.target.value.split(", "),
                      })
                    }
                  />
                </div>
                {inputErrors.topNotes && (
                  <p className="-mt-1 text-sm text-red-500">
                    {inputErrors.topNotes}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label>Middle Notes (comma-separated):</label>
                <div className="rounded-lg border-2 border-black p-3">
                  <input
                    type="text"
                    name="middleNotes"
                    placeholder="Middle Notes"
                    className="w-full outline-none"
                    value={formData.middleNotes.join(", ")}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        middleNotes: e.target.value.split(", "),
                      })
                    }
                  />
                </div>
                {inputErrors.middleNotes && (
                  <p className="-mt-1 text-sm text-red-500">
                    {inputErrors.middleNotes}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label>Base Notes (comma-separated):</label>
                <div className="rounded-lg border-2 border-black p-3">
                  <input
                    type="text"
                    name="baseNotes"
                    placeholder="Base Notes"
                    className="w-full outline-none"
                    value={formData.baseNotes.join(", ")}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        baseNotes: e.target.value.split(", "),
                      })
                    }
                  />
                </div>
                {inputErrors.baseNotes && (
                  <p className="-mt-1 text-sm text-red-500">
                    {inputErrors.baseNotes}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-primary-blue-accent py-3 font-bold text-white"
              >
                {initialData ? "Update Perfume" : "Add Perfume"}
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
