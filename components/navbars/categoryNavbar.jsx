import { BookOpen, RotateCcw, Search } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Separator } from "../ui/separator"
import { categories } from "../utils/constants"

export default function CategoryNavbar({ products, setSearchQuery, searchQuery, setSelectedCategory, selectedCategory }) {

    const getCategoryProductCount = (category) => {
        return products?.filter((product) =>
            product.category === category
        ).length;
    };

    return (
        <header className="flex h-16 shrink-0 justify-between border-b px-4">
            <div className="flex items-center 2xl:gap-3 gap-2">
                <div className="border flex px-4 py-2 items-center gap-2 rounded-lg font-medium text-sm">
                    <BookOpen size={16} />
                    Recents
                </div>
                <Separator orientation="vertical" className="h-4" />
                <ul className="flex 2xl:gap-3 gap-2 text-sm font-medium">
                    <li onClick={() => setSelectedCategory("All")} className={`border cursor-pointer rounded-lg md:gap-1 gap-3 flex items-center px-3 py-2 ${selectedCategory === "All" ? "bg-[#1B2537] text-white" : ""}`}>
                        <span>All</span>
                        <span className={`text-[10px] font-bold leading-none p-[3px] rounded ${selectedCategory === "All" ? "bg-[#424f62]" : "bg-[#d9dce2]"}`}>
                            {products?.length}
                        </span>
                    </li>
                    {categories.map((category, index) => (
                        <li key={index} onClick={() => setSelectedCategory(category)} className={`border cursor-pointer rounded-lg md:gap-1 gap-3 flex items-center px-3 py-2 ${selectedCategory === category ? "bg-[#1B2537] text-white" : ""}`}>
                            <span>{category}</span>
                            <span className={`text-[10px] font-bold leading-none p-[3px] rounded ${selectedCategory === category ? "bg-[#424f62]" : "bg-[#d9dce2]"}`}>
                                {getCategoryProductCount(category)}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex items-center 2xl:gap-3 gap-2">
                <Button variant="outline">
                    <RotateCcw />
                    Refresh
                </Button>
                <Separator orientation="vertical" className="h-4" />
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <Input className="pl-10" placeholder="Search Products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
            </div>
        </header>
    )
}