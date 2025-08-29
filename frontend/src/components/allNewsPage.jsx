import { useParams } from "react-router-dom";
import NewsCard from "./NewsCard";

export default function AllNewsPage({ allNoticias }) {
    return(
        <div>
            <div className="w-full bg-red-700 py-3 shadow-md">
                <h1 className="text-2xl font-bold text-white text-center">
                    Todas las noticias
                </h1>
            </div>
           
            <div className="p-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {allNoticias.map((n) => (
                        <NewsCard key={n.id} {...n} />
                    ))}
                </div>
            </div>
        </div>
    );
}