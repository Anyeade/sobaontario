"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useCart } from "@/app/context/CartContext";

interface ProductCardProps {
  id: string;
  name: string;
  description?: string;
  price: string;
  imageUrl?: string;
  category: string;
  inStock: boolean;
}

const ProductCard = ({ id, name, description, price, imageUrl, category, inStock }: ProductCardProps) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id,
      name,
      description,
      price,
      imageUrl,
      category,
    });
  };

  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: -20,
        },
        visible: {
          opacity: 1,
          y: 0,
        },
      }}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 1, delay: 0.1 }}
      viewport={{ once: true }}
      className="animate_top rounded-lg bg-white p-6 shadow-solid-8 dark:bg-blacksection"
    >
      {/* Product Image */}
      <div className="mb-4 aspect-square overflow-hidden rounded-lg bg-gray-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            width={300}
            height={300}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <svg
              className="h-16 w-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-primary">{category}</span>
          {!inStock && (
            <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800 dark:bg-red-900/20 dark:text-red-400">
              Out of Stock
            </span>
          )}
        </div>
        
        <h3 className="mb-2 text-lg font-semibold text-black dark:text-white">
          {name}
        </h3>
        
        {description && (
          <p className="mb-3 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {description}
          </p>
        )}
        
        <div className="mb-4 text-xl font-bold text-primary">
          ${parseFloat(price).toFixed(2)} CAD
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={!inStock}
        className="w-full rounded-lg bg-primary px-4 py-3 font-medium text-white transition-colors duration-300 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {inStock ? "Add to Cart" : "Out of Stock"}
      </button>
    </motion.div>
  );
};

export default ProductCard; 