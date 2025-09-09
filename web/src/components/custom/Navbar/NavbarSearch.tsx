import React, { useEffect, useRef, useState } from 'react';

import { useQuery } from 'react-query';
import SearchBar from '../../lib/Form/SearchBar.tsx';
import { fetchSearchResults } from '../../../service/Search.service';
import { SearchResult } from '../../../types/Search.types';
import { MAX_SEARCH_RESULTS } from '../../../config/Search.config';
import {useNavigate} from "react-router";
import {useLang} from "../../../hooks/Language.hooks.ts";



const NavbarSearch: React.FC = () => {
  const navigate = useNavigate();
  const lang = useLang();

  const [search, setSearch] = useState('');
  const [showResults, setShowResults] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: results = [] } = useQuery<SearchResult[]>({
    queryKey: ['search', search],
    queryFn: () => fetchSearchResults(search),
    enabled: !!search,
    staleTime: 1000 * 60,
    keepPreviousData: true
  });

  function handleNavigate(result: SearchResult) {
    navigate("/" + result.file);
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const topResults = results.slice(0, MAX_SEARCH_RESULTS);
  const tooManyResults = results.length > MAX_SEARCH_RESULTS;

  return (
    <div className="relative w-full max-w-xl" ref={containerRef}>
      <SearchBar
        ref={inputRef}
        id="navbar-search"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setShowResults(true);
        }}
        onFocus={() => {
          if (results.length > 0) setShowResults(true);
        }}
        placeholder={lang('NAVBAR_SEARCH_PLACEHOLDER')}
      />

      {search && showResults && topResults.length > 0 && (
        <div className="absolute top-full mt-1 w-full bg-cards border border-borders shadow-lg rounded-md max-h-[40vh] overflow-auto z-50">
          <ul>
            {topResults.map((res) => (
              <li key={res.id}>
                <a
                  onClick={() => handleNavigate(res)}
                  className="block px-4 py-2 hover:bg-background text-sm text-text-primary cursor-pointer"
                >
                  <div className="font-medium">{res.title}</div>
                  <div className="text-text-secondary text-xs truncate">{res.content}</div>
                </a>
              </li>
            ))}
          </ul>
          {tooManyResults && (
            <div className="px-4 py-2 text-xs text-text-muted border-t border-borders">
              Too many results. Try narrowing your search.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NavbarSearch;
