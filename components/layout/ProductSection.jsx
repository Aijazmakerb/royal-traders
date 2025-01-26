import { Card } from "../ui/card"
import { Button } from "../ui/button"
import Image from "next/image"
import { ContextMenuContent, ContextMenu, ContextMenuTrigger, ContextMenuItem } from "../ui/context-menu"
import { Folder, Trash2 } from "lucide-react";

export default function ProductSection({ products, addToCart }) {

    async function deleteFromDb(id) {
        await fetch(`/api/products?id=${id}`, { method: "DELETE" });
        //refresh the products list
    }

    return (
        <div className="flex flex-1 flex-col gap-4 h-full overflow-y-auto scrollbar-none">
            <div className="grid grid-cols-4 gap-6">
                {products.map((product, index) => (
                    <Card key={index} className="overflow-hidden relative">
                        <ContextMenu>
                            <ContextMenuTrigger>
                                <div className="relative h-[200px]">
                                    <Image
                                        src={"/placeholder.svg"}
                                        fill
                                        className="object-cover"
                                        alt="Product"
                                        draggable={false}
                                    />
                                    <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-xs">
                                        Available
                                    </div>
                                </div>
                            </ContextMenuTrigger>
                            <ContextMenuContent className="w-48">
                                <ContextMenuItem className="gap-2">
                                    <Folder className="text-muted-foreground" size={17} />
                                    <span>Update Product</span>
                                </ContextMenuItem>
                                <ContextMenuItem className="gap-2" onClick={() => deleteFromDb(product.id)}>
                                    <Trash2 className="text-muted-foreground" size={17} />
                                    <span>Delete Product</span>
                                </ContextMenuItem>
                            </ContextMenuContent>
                        </ContextMenu>
                        <div className="p-4">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center justify-between w-full">
                                    <h3 className="font-semibold">{product.name}</h3>
                                    <p className="text-sm text-gray-500">{product.variants.length > 1
                                        ? `From ₹${Math.min(...product.variants.map(v => v.price)).toFixed(2)}`
                                        : `₹${product.variants[0].price.toFixed(2)}`
                                    }</p>
                                </div>
                            </div>
                            <Button onClick={() => addToCart(product, product.variants[0])} className="w-full bg-[#1B2537]">Add to Cart</Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}