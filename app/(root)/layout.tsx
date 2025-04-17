import Navbar from "../../components/Navbar"

export default function Layout({children}:Readonly<{children: React.ReactMode}>){
    return (
        <main className="font-work-sans">
            <Navbar/>
            {children}
        </main>
    )}