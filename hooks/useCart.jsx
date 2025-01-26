import { useState } from "react";

const useCart = () => {
    const [cart, setCart] = useState([]);

    const addToCart = (product, selectedVariant) => {
        setCart((prev) => [
            ...prev,
            {
                id: `${product.id}-${Date.now()}`,
                name: product.name,
                category: product.category,
                quantity: product.category === "Rexine" ? "" : 1,
                selectedVariant: selectedVariant || product.variants[0],
                variants: product.variants,
            },
        ]);
    };
    const updateVariant = (id, variantName) => {
        setCart((prev) =>
            prev.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        selectedVariant: item.variants.find(
                            (v) => v.name === variantName
                        ),
                    }
                    : item
            )
        );
    };
    const removeItem = (id) => { setCart((prevCart) => prevCart.filter((item) => item.id !== id)); };
    const updatePrice = (id, newPrice) => {
        setCart((prev) =>
            prev.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        selectedVariant: {
                            ...item.selectedVariant,
                            price: parseFloat(newPrice),
                        },
                    }
                    : item
            )
        );
    };
    const updateQuantity = (id, value) => {
        setCart((prev) =>
            prev.map((item) => {
                if (item.id === id) {
                    return { ...item, quantity: value };
                }
                return item;
            })
        );
    };

    const clearCart = () => {
        setCart([])
    }

    return {
        cart,
        addToCart,
        updateVariant,
        removeItem,
        updatePrice,
        updateQuantity,
        clearCart
    };
};


export default useCart;