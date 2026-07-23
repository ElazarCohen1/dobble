import { useState } from "react";

export default function Lobby() {
    const [name,setName] = useState("");
    const [gameId,setGameId] = useState("");
    const [loading,setLoading] = useState(false);

    // e is the res of the form
    const joinGame = (e) =>{
        setLoading(true);
        e.preventDefault(); 
        setTimeout(()=>{
            console.log(name,gameId);
            setLoading(false);

        },10000);
    }
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-100 to-fuchsia-100 flex items-center justify-center p-6">
        <div className="w-full max-w-lg rounded-3xl bg-white/70 backdrop-blur-xl shadow-2xl border border-white/60 p-8">
            <div className="flex justify-center mb-4">
            <div className="flex items-center gap-2 text-rose-500 text-3xl">
                <span>♥</span>
                <span>♥</span>
                <span>♥</span>
            </div>
            </div>

            <h1 className="text-4xl font-bold text-center text-rose-600">
            Dobble Love
            </h1>

            <p className="text-center text-gray-500 mt-3">
            Trouve le symbole commun avant ton adversaire.
            </p>

            <div className="mt-10 space-y-5">

            <form onSubmit={joinGame}>
                 <input
                    type="text"
                    name="firstName"
                    placeholder="Ton prénom"
                    onChange={(e)=> {setName(e.target.value)}}
                    className="w-full rounded-2xl border border-rose-200 bg-white px-5 py-3 outline-none focus:border-rose-400 transition"
                />

                <input
                    type="text"
                    name="id"
                    placeholder="Code de la partie"
                    onChange={(e)=> {setGameId(e.target.value)}}
                    className="w-full rounded-2xl border border-rose-200 bg-white px-5 py-3 outline-none focus:border-rose-400 transition"
                />

                <button type="submit" className="w-full rounded-2xl bg-rose-500 py-3 text-white font-semibold hover:bg-rose-600 transition shadow-lg">
                    {loading? "Chargement...":"Rejoindre la partie"}
                </button>
            </form>
           
            </div>

            <div className="mt-10 flex justify-center gap-2 text-rose-300 text-lg">
            <span>♡</span>
            <span>♡</span>
            <span>♡</span>
            </div>
        </div>
        </div>
    );
}