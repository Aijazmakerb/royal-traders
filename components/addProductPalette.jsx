"use client"

import { useState, useEffect } from "react"
import { Command } from "cmdk"
import { DialogTitle } from "@radix-ui/react-dialog"
import { useForm, useFieldArray, Controller } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { categories } from "./utils/constants"

export function AddProductPalette() {
  const [open, setOpen] = useState(false)

  const { control, handleSubmit, register } = useForm({
    defaultValues: {
      id: "",
      name: "",
      category: "",
      variants: [{ name: "", price: "" }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  })

  useEffect(() => {
    const down = (e) => {
      if (e.key === "a" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const onSubmit = async (data) => {
    await fetch("/api/addtodb", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    setOpen(false)
    //refresh the products list
  }

  return (
    <>
      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Add Product"
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-2xl w-full bg-white rounded-xl shadow-2xl border border-gray-200"
      >
        <DialogTitle className="text-lg font-semibold p-4 border-b">Add New Product</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
          <div>
            <Label htmlFor="id">Product ID</Label>
            <Input id="id" {...register("id")} placeholder="Enter product id" />
          </div>
          <div>
            <Label htmlFor="name">Product Name</Label>
            <Input id="name" {...register("name")} placeholder="Enter product name" />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category, index) => (
                      <SelectItem key={index} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div>
            <Label>Variants</Label>
            {fields.map((field, index) => (
              <div key={field.id} className="flex space-x-2 mt-2">
                <Input {...register(`variants.${index}.name`)} placeholder="Variant name" />
                <Input
                  type="number"
                  {...register(`variants.${index}.price`, {
                    required: "Price is required",
                    valueAsNumber: true,
                    min: { value: 0, message: "Price must be a positive number" },
                  })}
                  placeholder="Price"
                  min="0"
                  step="0.01"
                />
                <Button type="button" onClick={() => remove(index)} variant="outline">
                  Remove
                </Button>
              </div>
            ))}
            <Button type="button" onClick={() => append({ name: "", price: "" })} className="mt-2" variant="outline">
              Add Variant
            </Button>
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Product</Button>
          </div>
        </form>
      </Command.Dialog>
    </>
  )
}

