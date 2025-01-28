import React, { useEffect, useState } from "react";

import CategoryNavbar from "@/components/navbars/categoryNavbar";

import ProductSection from "@/components/layout/ProductSection";
import Layout from "@/components/layout/Layout";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Banknote, CreditCard, Clock, Minus, Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import convertToYards from "@/hooks/useUnitMeasurement";
import { SearchPalette } from "@/components/searchPalette";

import useCart from "@/hooks/useCart";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { AddProductPalette } from "@/components/addProductPalette";

export default function Page() {
  const {
    cart,
    addToCart,
    removeItem,
    updatePrice,
    updateQuantity,
    updateVariant,
  } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [paymentMethod, setPaymentMethod] = useState("cash");

  const [products, setProducts] = useState();

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await (
        await fetch("/api/products", { method: "GET" })
      ).json();
      setProducts(products);
    };
    fetchProducts();
  }, []);

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => {
      const quantity =
        item.category === "Rexine"
          ? convertToYards(item.quantity)
          : item.quantity;
      return sum + item.selectedVariant.price * quantity;
    }, 0);
  };

  const cartLength = () => {
    return cart.length;
  };

  const calculateTotal = () => {
    return calculateSubtotal();
  };

  const filteredProducts = products?.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleQuantityChange = (id, value) => {
    updateQuantity(id, value);
  };

  const incrementQuantity = (id) => {
    const item = cart.find((item) => item.id === id);
    if (item && item.category !== "Rexine") {
      updateQuantity(id, item.quantity + 1);
    }
  };

  const decrementQuantity = (id) => {
    const item = cart.find((item) => item.id === id);
    if (item && item.category !== "Rexine" && item.quantity > 1) {
      updateQuantity(id, item.quantity - 1);
    }
  };

  const handleQuantityKeyDown = (e, id) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const priceInput = document.querySelector(
        `[data-item-id="${id}"] .price-input`
      );
      if (priceInput) {
        priceInput.focus();
      }
    }
  };

  const isNumeric = (e) => /^\d*(\.\d{0,2})?$/.test(e.target.value);

  return (
    <Layout>
      <CategoryNavbar
        products={products}
        setSearchQuery={setSearchQuery}
        searchQuery={searchQuery}
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
      <SearchPalette items={products} onSelect={addToCart} />
      <AddProductPalette items={products} />
      <div className="flex p-4 gap-4 h-[calc(100vh-8rem)]">
        {/* Product Section */}
        {products ? (
          <ProductSection
            products={filteredProducts}
            cart={cart}
            addToCart={addToCart}
          />
        ) : (
          <div>null</div>
        )}

        {/* Order Summary Section starts */}
        <div className="w-[400px] border rounded-lg bg-white flex flex-col h-full">
          {/* Header outside ScrollArea */}
          <div className="px-4 pt-4 flex justify-between items-center mb-2">
            <h2 className="font-semibold text-2xl">Invoice</h2>
          </div>

          {/* <Separator /> */}

          {/* Scrollable Content Section */}
          <div className="flex-1 overflow-y-auto scrollbar-none">
            <div className="space-y-5 px-4">
              <ScrollArea>
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="py-4 border-b border-gray-100 last:border-b-0"
                    data-item-id={item.id}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">
                          {item.name}
                        </h4>
                        <p className="text-xs text-gray-500">{item.category}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-gray-400 hover:text-red-500 transition-colors"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    </div>
                    <div
                      className="flex items-center space-x-2 mb-2"
                      data-item-id={item.id}
                    >
                      {item.category === "Rexine" ? (
                        <Input
                          type="text"
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(item.id, e.target.value)
                          }
                          onKeyDown={(e) => handleQuantityKeyDown(e, item.id)}
                          className="w-full h-8 text-sm quantity-input"
                          placeholder="e.g., 1yd 2in 5cm"
                        />
                      ) : (
                        <div className="flex items-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => decrementQuantity(item.id)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <Input
                            value={item.quantity}
                            onChange={(e) => {
                              if (isNumeric(e)) {
                                updateQuantity(item.id, e.target.value);
                              }
                            }}
                            onKeyDown={(e) => handleQuantityKeyDown(e, item.id)}
                            className="w-12 h-8 text-sm text-center mx-1 quantity-input"
                            min="0"
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => incrementQuantity(item.id)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                      <Input
                        type="text"
                        value={item.selectedVariant.price}
                        onChange={(e) => {
                          if (isNumeric(e))
                            updatePrice(item.id, e.target.value);
                        }}
                        className="w-20 h-8 text-sm price-input"
                      />

                      <span className="text-sm font-medium text-gray-900 ml-auto">
                        $
                        {(
                          item.selectedVariant.price *
                          (item.category === "Rexine"
                            ? convertToYards(item.quantity)
                            : item.quantity)
                        ).toFixed(2)}
                      </span>
                    </div>

                    <Select
                      value={item.selectedVariant.name}
                      onValueChange={(value) => {
                        const newVariant = item.variants.find(
                          (v) => v.name === value
                        );
                        updateVariant(item.id, value);
                        if (newVariant) {
                          updatePrice(item.id, newVariant.price);
                        }
                      }}
                    >
                      <SelectTrigger className="w-full h-8 text-xs mt-2">
                        <SelectValue placeholder="Select variant" />
                      </SelectTrigger>
                      <SelectContent>
                        {item.variants.map((variant) => (
                          <SelectItem
                            key={variant.name}
                            value={variant.name}
                            className="text-xs"
                          >
                            {variant.name} - ${variant.price.toFixed(2)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </ScrollArea>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="px-4 mb-4 mt-auto w-[92%] mx-auto">
            <div className="mt-6 space-y-4">
              <Separator />
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Total Items</span>
                  <span>{cartLength()}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Subtotal</span>
                  <span>${calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium text-lg text-gray-900">
                  <span>Total</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 mt-6">
              <h4 className="font-medium text-lg text-gray-900">
                Payment Method
              </h4>
              <RadioGroup
                value={paymentMethod}
                onValueChange={setPaymentMethod}
                className="grid grid-cols-3 gap-4"
              >
                {["cash", "online", "later"].map((method) => (
                  <Label
                    key={method}
                    htmlFor={method}
                    className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      paymentMethod === method
                        ? "border-primary bg-primary/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <RadioGroupItem
                      value={method}
                      id={method}
                      className="sr-only"
                    />
                    {method === "cash" && <Banknote className="h-6 w-6 mb-2" />}
                    {method === "online" && (
                      <CreditCard className="h-6 w-6 mb-2" />
                    )}
                    {method === "later" && <Clock className="h-6 w-6 mb-2" />}
                    <span className="text-sm font-medium capitalize">
                      {method}
                    </span>
                  </Label>
                ))}
              </RadioGroup>
            </div>
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-6">
              Confirm Order
            </Button>
          </div>
        </div>

        {/* Order Summary Section Ends */}
      </div>
    </Layout>
  );
}
