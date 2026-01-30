"use client";

import { useState, useMemo } from "react";
import BlogItem from "@/components/Blog/BlogItem";
import { TBlog } from "@/types/dataBlogType";

const categories = ["All", "Technology", "Startup", "Lifestyle"];

type TProps = {
    blogs: TBlog[];
    search: string; // only ONE search field
};

export default function BlogList({ blogs, search }: TProps) {
    const [menu, setMenu] = useState("All");

    // Normalized search text
    const searchText = search.toLowerCase();

    // Filtering logic (clean + readable)
    const filtered = useMemo(() => {
        return blogs.filter((item) => {
            const title = item.title?.toLowerCase() || "";
            const description = item.description?.toLowerCase() || "";
            const category = item.category || "Other";

            // Search filter
            const matchesSearch =
                !searchText ||
                title.includes(searchText) ||
                description.includes(searchText);

            // Category filter
            const matchesCategory = menu === "All" || category === menu;

            return matchesSearch && matchesCategory;
        });
    }, [blogs, searchText, menu]);

    if (filtered.length === 0) {
        return (
            <div className="text-center my-10 h-35">
                There are no blogs ...
            </div>
        );
    }

    return (
        <>
            {/* category buttons */}
            <div className="flex justify-center gap-6 my-10">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setMenu(cat)}
                        className={
                            menu === cat
                                ? "bg-black text-white py-1 px-4 rounded-sm cursor-pointer"
                                : "cursor-pointer"
                        }
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* blog list */}
            <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24">
                {filtered.map((item) => (
                    <BlogItem
                        key={item.id}
                        id={item.id!}
                        image={item.image || ""}
                        title={item.title || ""}
                        description={item.description || ""}
                        category={item.category || ""}
                    />
                ))}
            </div>
        </>
    );
}
