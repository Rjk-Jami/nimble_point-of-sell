import { useState, useRef } from 'react';
import axios from 'axios';

const useSearch = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResultsFound, setNoResultsFound] = useState(false);
  const searchInputRef = useRef(null);

  const handleSearch = async () => {
    const searchLetter = searchInputRef.current.value;
    if (searchLetter) {
      setNoResultsFound(true);
      setLoading(true);

      try {
        const response = await axios.get(`http://localhost:5000/getCollegesByAlphabet/${searchLetter}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    }
  };

  console.log(searchResults);

  return { searchResults, loading, noResultsFound, handleSearch , searchInputRef};
};

export default useSearch;
