"use client";

import React, { FormEvent, useState } from "react";
import Header from "./Header";
import BlogList from "./Blog/BlogList";
import Loading from "./Loading";
export type TBlog = {
    id:number;
    title: string | null;
    description: string | null;
    category: string | null;
    author: string | null;
    date: string | null;
    image: string | null;
};
const Main = ({ blogs }: { blogs: TBlog[] }) => {
    const [searchInput, setSearchInput] = useState("");
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const searchHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);
        setTimeout(() => {
            setSearch(searchInput);
            setLoading(false);
        }, 400);
    };

    const clearSearch = () => {
        setLoading(true);
        setTimeout(() => {
            setSearch("");
            setLoading(false);
        }, 300);
    };

    return (
        <div >
            <div className="py-5 px-5 md:px-12 lg:px-28">
                <Header />

                <div className="text-center my-8">
                    <h1 className="text-3xl sm:text-5xl font-medium">Latest Blogs</h1>

                    <p className="mt-10 max-w-[740px] m-auto text-xs sm:text-base">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit...
                    </p>

                    <form
                        onSubmit={searchHandler}
                        className="flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-black shadow-[-7px_7px_0px_#000000]"
                    >
                        <input
                            type="text"
                            value={searchInput}
                            placeholder="Search...."
                            className="pl-4 outline-none"
                            onChange={(e) => {
                                const value = e.target.value;
                                setSearchInput(value);
                                if (value === "") {
                                    clearSearch();
                                }
                            }}
                        />

                        <button
                            type="submit"
                            className="border-l border-black py-4 px-4 sm:px-8 hover:bg-gray-600 hover:text-white cursor-pointer duration-200 active:bg-gray-600 active:text-white"
                        >
                            Search
                        </button>
                    </form>

                </div>
            </div>

            {/* filtered blogs */}
            {!loading ? (
                <BlogList blogs={blogs} search={search} />
            ) : (
                <Loading />
            )}
        </div>
    );
};

export default Main;
