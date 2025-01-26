import React, { useState } from "react"
import Image from "next/image"
import { Minus, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function OrderSummary({ cart }) {

    return (
        <div className="flex flex-col h-full">
            <div className="p-4 flex-1 overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="font-semibold">Order Summary</h2>
                    <div className="text-sm text-gray-500">#812309</div>
                </div>

                <div className="space-y-4">
                    {cart.map((item) => (
                        <div key={item.id} className="flex gap-3">
                            <div className="flex-1">
                                <div className="flex justify-between">
                                    <div>
                                        <h3 className="font-medium">{item.name} ({item.quantity})</h3>
                                        <p className="text-sm text-gray-500">
                                            Notes: {item.notes} • Size: {item.size}
                                        </p>
                                    </div>
                                    <p className="font-medium">${(item.selectedVariant.price * item.quantity).toFixed(2)}</p>
                                </div>
                                <div className="flex items-center gap-2 mt-2">

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Order Summary Footer */}
            {/* <div className="border-t p-4">
            <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span>Taxes</span>
                    <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>${discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium pt-2 border-t">
                    <span>Total Payment</span>
                    <span>${total.toFixed(2)}</span>
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Order Type</span>
                    <Select defaultValue="dine-in">
                        <SelectTrigger className="w-[140px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="dine-in">Dine-in</SelectItem>
                            <SelectItem value="takeaway">Takeaway</SelectItem>
                            <SelectItem value="delivery">Delivery</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Select Table</span>
                    <Select defaultValue="A-128">
                        <SelectTrigger className="w-[140px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="A-128">A-128</SelectItem>
                            <SelectItem value="B-101">B-101</SelectItem>
                            <SelectItem value="C-234">C-234</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="rounded-lg border p-3 flex items-start gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                        <Image
                            src="/placeholder.svg"
                            alt="Discount"
                            width={24}
                            height={24}
                        />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium">10% Discount</p>
                        <p className="text-xs text-gray-500">Minimum Buy $50.00</p>
                    </div>
                </div>

                <Button className="w-full bg-[#1B2537]">
                    Confirm Payment
                </Button>
            </div>
        </div> */}
        </div>
    )
}

