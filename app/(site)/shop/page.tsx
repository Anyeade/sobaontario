"use client";
import { useState, useEffect } from "react";
import { Metadata } from "next";
import ProductCard from "@/components/Shop/ProductCard";
import ShoppingCart from "@/components/Shop/ShoppingCart";
import { useCart } from "@/app/context/CartContext";

interface StoreItem {
  id: string;
  name: string;
  description?: string;
  price: string;
  imageUrl?: string;
  category: string;
  inStock: boolean;
}

export default function ShopPage() {
  const [items, setItems] = useState<StoreItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { state } = useCart();

  // Sample data based on tasks.md requirements
  const sampleItems: StoreItem[] = [
    {
      id: "1",
      name: "SOBA Ontario Coat of Arms",
      description: "Official SOBA Ontario coat of arms - perfect for display in your home or office",
      price: "45.00",
      imageUrl: "https://www.sobaontario.org/_next/image?url=%2Fimages%2Flogo%2Flogo.png&w=256&q=75",
      category: "Coat of Arms",
      inStock: true,
    },
    {
      id: "2", 
      name: "SOBA Ontario Tie - Red",
      description: "Premium quality red tie with SOBA Ontario emblem",
      price: "35.00",
      imageUrl: "https://www.bandshoppe.com/img/271280-black-poly-satin-concert-neck-tie.jpg",
      category: "Ties",
      inStock: true,
    },
    {
      id: "3",
      name: "SOBA Ontario Dress Shirt",
      description: "High-quality dress shirt with embroidered SOBA Ontario logo",
      price: "55.00",
      imageUrl: "https://www.logoai.com/uploads/resources/2025/01/14/5144bfc5e88666ebd035131144bbec85.png",
      category: "Shirts",
      inStock: true,
    },
    {
      id: "4",
      name: "SOBA Ontario Badge",
      description: "Official SOBA Ontario badge for formal occasions",
      price: "25.00",
      imageUrl: "https://www.logoai.com/uploads/resources/2024/10/10/5784b1d4ee0f52417019b1cd5ed17653.png",
      category: "Badges",
      inStock: true,
    },
    {
      id: "5",
      name: "SOBA Ontario T-Shirt",
      description: "Comfortable cotton t-shirt with SOBA Ontario design",
      price: "30.00",
      imageUrl: "https://www.logoai.com/uploads/resources/2024/09/11/72cd69d95f905e5498ef44b9b7927e4a.png",
      category: "T-shirts",
      inStock: true,
    },
    {
      id: "6",
      name: "SOBA Ontario Polo Shirt",
      description: "Premium polo shirt with embroidered logo",
      price: "40.00",
      imageUrl: "https://www.logoai.com/uploads/resources/2025/04/16/1bb35e2cfcc684118edf98d857d1e922.png",
      category: "Shirts",
      inStock: true,
    },
    {
      id: "7",
      name: "SOBA Ontario Mug",
      description: "Ceramic mug with SOBA Ontario logo - perfect for your morning coffee",
      price: "20.00",
      imageUrl: "https://www.logoai.com/uploads/resources/2025/04/16/0bb94c313b78d0cf22f99e709c7a5d22.png",
      category: "Branded Merchandise",
      inStock: true,
    },
    {
      id: "8",
      name: "SOBA Ontario Keychain",
      description: "Metal keychain with SOBA Ontario emblem",
      price: "15.00",
      imageUrl: "https://www.logoai.com/uploads/resources/2024/06/13/17042986d0e6cdc5c35987f0e2602668.png",
      category: "Branded Merchandise",
      inStock: true,
    },
  ];

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("/api/store");
        if (response.ok) {
          const data = await response.json();
          // Combine database items with sample items, avoiding duplicates
          const combinedItems = [...data];
          
          // Add sample items that don't exist in database (by name)
          const dbItemNames = data.map((item: StoreItem) => item.name.toLowerCase());
          const uniqueSampleItems = sampleItems.filter(
            (sampleItem) => !dbItemNames.includes(sampleItem.name.toLowerCase())
          );
          
          combinedItems.push(...uniqueSampleItems);
          setItems(combinedItems);
          
          if (data.length === 0) {
            setError("Using sample data - no items in database yet");
          }
        } else {
          // Use sample data if API fails
          setItems(sampleItems);
          setError("Using sample data - database connection failed");
        }
      } catch (error) {
        console.error("Error fetching store items:", error);
        // Use sample data as fallback
        setItems(sampleItems);
        setError("Using sample data - database not connected");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const categories = ["All", ...Array.from(new Set(items.map(item => item.category)))];
  
  const filteredItems = selectedCategory === "All" 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  if (loading) {
    return (
      <main className="pb-20 pt-35 md:pt-40 xl:pb-25 xl:pt-46">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading store items...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="pb-10 pt-35 md:pt-40 xl:pb-15 xl:pt-46">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="text-center">
            <h1 className="mb-5 text-3xl font-bold text-black dark:text-white xl:text-hero">
              SOBA Ontario Store
            </h1>
            <p className="mb-10 text-lg">
              Shop official SOBA Ontario merchandise and support our community
            </p>
            
            {/* Cart Button */}
            <div className="mb-8 flex justify-center">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-white transition-colors duration-300 hover:bg-primary/90"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                View Cart ({state.itemCount})
                {state.itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                    {state.itemCount}
                  </span>
                )}
              </button>
            </div>

            {error && (
              <div className="mb-6 rounded-lg bg-yellow-50 p-4 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
                {error}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="pt-10 pb-20 lg:pt-15 lg:pb-25 xl:pt-20 xl:pb-30">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <div className="mb-10 text-center">
            <h2 className="mb-4 text-3xl font-bold text-black dark:text-white xl:text-sectiontitle2">
              Shop by Category
            </h2>
            
            {/* Category Buttons */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-6 py-2 font-medium transition-colors duration-300 ${
                    selectedCategory === category
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">No items found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredItems.map((item) => (
                <ProductCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  imageUrl={item.imageUrl}
                  category={item.category}
                  inStock={item.inStock}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Store Info Section */}
      <section className="py-20 lg:py-25 xl:py-30 bg-gray-50 dark:bg-blacksection">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <div className="text-center">
            <h2 className="mb-4 text-3xl font-bold text-black dark:text-white xl:text-sectiontitle2">
              About Our Store
            </h2>
            <div className="mx-auto max-w-3xl">
              <p className="mb-6 text-gray-600 dark:text-gray-400">
                The SOBA Ontario Store offers high-quality merchandise that celebrates our shared heritage 
                and supports our community initiatives. Every purchase helps fund our programs and activities.
              </p>
              
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="text-center">
                  <div className="mb-3 flex justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="mb-2 font-semibold text-black dark:text-white">Quality Products</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Premium materials and craftsmanship in every item
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="mb-3 flex justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="mb-2 font-semibold text-black dark:text-white">Support Community</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Proceeds support SOBA Ontario programs and initiatives
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="mb-3 flex justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="mb-2 font-semibold text-black dark:text-white">Fast Shipping</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Quick delivery across Ontario and Canada
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shopping Cart */}
      <ShoppingCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </main>
  );
} 
