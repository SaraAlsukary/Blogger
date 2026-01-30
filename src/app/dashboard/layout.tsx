import Dashboard from "@/components/Dashboard/Dashboard";


export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="flex ">
                <Dashboard>{children}</Dashboard>
            </div>
        </>
    )
}