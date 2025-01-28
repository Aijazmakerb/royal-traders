import { useState, useEffect, useMemo } from 'react'
import { Command } from 'cmdk'
import { Search } from 'lucide-react'
import { DialogTitle } from '@radix-ui/react-dialog'

export function SearchPalette({ items, onSelect }) {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState('')

    useEffect(() => {
        const down = (e) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    const filteredItems = useMemo(() => {
        return items?.flatMap(item =>
            item.variants.map(variant => ({
                ...item,
                variantName: variant.name,
                variantPrice: variant.price,
            }))
        ).filter(item =>
            item.name.toLowerCase().includes(value.toLowerCase()) ||
            item.variantName.toLowerCase().includes(value.toLowerCase())
        );
    }, [items, value]);

    const handleSelect = (item, variant) => {
        const newItemId = `${item.id}-${Date.now()}`;
        onSelect(item, variant)
        setOpen(false)

        // Trigger focus on quantity input
        setTimeout(() => {
            const quantityInput = document.querySelector(`[data-item-id="${newItemId}"] .quantity-input`)
            if (quantityInput) {
                quantityInput.focus()
            }
        }, 100)
    }

    return (
        <>
            <Command.Dialog
                open={open}
                onOpenChange={setOpen}
                label="Search products"
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-2xl w-full bg-white rounded-xl shadow-2xl border border-gray-200"
            >
                <DialogTitle className="sr-only">Search products</DialogTitle>
                <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
                    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                    <Command.Input
                        value={value}
                        onValueChange={setValue}
                        placeholder="Search products..."
                        className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>
                <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden">
                    <Command.Empty className="py-6 text-center text-sm">No products found.</Command.Empty>
                    {filteredItems?.map((item) => (
                        <Command.Item
                            key={`${item.id}-${item.variantName}`}
                            value={`${item.name} ${item.variantName}`}
                            onSelect={() => handleSelect(item, item.variants.find(v => v.name === item.variantName))}
                            className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:opacity-50 hover:bg-accent hover:text-accent-foreground"
                        >
                            <span className="flex-1">{item.name} - {item.variantName}</span>
                            <span className="text-muted-foreground">${item.variantPrice.toFixed(2)}</span>
                        </Command.Item>
                    ))}
                </Command.List>
            </Command.Dialog>
        </>
    )
}

