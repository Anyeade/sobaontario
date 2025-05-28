"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";

interface StoreItem {
  id: string;
  name: string;
  description?: string;
  price: string;
  imageUrl?: string;
  category?: string;
  inStock: boolean;
  stockQuantity: number;
  createdAt: string;
}

const AdminStorePage = () => {
  const [items, setItems] = useState<StoreItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStock, setFilterStock] = useState("all");

  useEffect(() => {
    fetchStoreItems();
  }, []);

  const fetchStoreItems = async () => {
    try {
      const response = await fetch("/api/admin/store");
      if (response.ok) {
        const data = await response.json();
        setItems(data);
      } else {
        toast.error("Failed to fetch store items");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleStock = async (itemId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/store/${itemId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inStock: !currentStatus }),
      });

      if (response.ok) {
        toast.success(`Item ${!currentStatus ? "marked in stock" : "marked out of stock"}`);
        fetchStoreItems();
      } else {
        toast.error("Failed to update stock status");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      const response = await fetch(`/api/admin/store/${itemId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Item deleted successfully");
        fetchStoreItems();
      } else {
        toast.error("Failed to delete item");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = 
      filterCategory === "all" || item.category === filterCategory;
    
    const matchesStock = 
      filterStock === "all" ||
      (filterStock === "in_stock" && item.inStock) ||
      (filterStock === "out_of_stock" && !item.inStock);

    return matchesSearch && matchesCategory && matchesStock;
  });

  const categories = [...new Set(items.map(item => item.category).filter(Boolean))];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Store Management
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage SOBA Ontario store items
          </p>
        </div>
        <Link
          href="/admin/store/new"
          className="rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary/90"
        >
          Add New Item
        </Link>
      </div>

      {/* Filters */}
      <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Search
            </label>
            <input
              type="text"
              placeholder="Search by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
          
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Category
            </label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Stock Status
            </label>
            <select
              value={filterStock}
              onChange={(e) => setFilterStock(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Items</option>
              <option value="in_stock">In Stock</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
          </div>
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800"
          >
            {item.imageUrl && (
              <div className="mb-4 aspect-square overflow-hidden rounded-lg">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={200}
                  height={200}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {item.name}
              </h3>
              
              {item.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {item.description}
                </p>
              )}
              
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-primary">
                  ${item.price}
                </span>
                <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                  item.inStock
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                }`}>
                  {item.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
              
              {item.category && (
                <span className="inline-block rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                  {item.category}
                </span>
              )}
              
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Stock: {item.stockQuantity} units
              </div>
              
              <div className="flex space-x-2 pt-2">
                <Link
                  href={`/admin/store/${item.id}`}
                  className="flex-1 rounded bg-blue-600 px-3 py-2 text-center text-xs text-white hover:bg-blue-700"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleToggleStock(item.id, item.inStock)}
                  className="flex-1 rounded bg-yellow-600 px-3 py-2 text-xs text-white hover:bg-yellow-700"
                >
                  {item.inStock ? "Mark Out" : "Mark In"}
                </button>
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="flex-1 rounded bg-red-600 px-3 py-2 text-xs text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {filteredItems.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            No items found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminStorePage; 