// @jsxRuntime classic
// @jsxFrag React.Fragment
// @ts-nocheck
"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
let baseurl = "https://hp-api.onrender.com/api/characters";

export default function Dashboard() {
  const [characters, setCharacters] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  async function getCharacters() {
    const res = await axios.get(baseurl);
    return res.data;
  }

  useEffect(() => {
    async function fetchCharacters() {
      const data = await getCharacters();
      setCharacters(data);
    }
    fetchCharacters();
  }, []);

  // Filter characters based on search query
  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="align-center">
      <div className="bg-slate-500 m-10 h-12 flex items-center justify-center text-lg">
        Harry Potter Character API
      </div>
      <div className="mb-10">
        <input
          className="h-10 w-[100%] text-black"
          placeholder="Search for character here........."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap gap-4">
        {filteredCharacters.map((character, index) => (
          <>
            <Link key={index} href={`/dashboard/${character.id}`}>
              <div className="border h-96 w-80">
                <p>{character.name}</p>
                <p>{character.dateOfBirth}</p>
                {character.image ? (
                  <img
                    src={character.image}
                    alt={character.name}
                    className="h-52 w-48 bg-cover"
                  />
                ) : (
                  <div className="h-52 w-48 flex items-center justify-center bg-gray-200 text-black">
                    No Image Available
                  </div>
                )}
              </div>
            </Link>
          </>
        ))}
      </div>
    </div>
  );
}
