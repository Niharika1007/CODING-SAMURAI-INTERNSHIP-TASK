import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URL } from "../../api";

const fallbackCities = ["Bhimavaram, IN", "Tiruvuru, IN", "Mylavaram, IN"];

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = async (inputValue) => {
    if (!inputValue) return { options: [] };

    const url = `${GEO_API_URL}/cities?namePrefix=${inputValue}&countryIds=IN`;
    const response = await fetch(url, geoApiOptions);
    const result = await response.json();

    let options = result.data.map(city => ({
      value: `${city.latitude} ${city.longitude}`,
      label: `${city.name}, ${city.region}, ${city.countryCode}`,
    }));

    // If no matches, add fallback if input matches
    if (options.length === 0) {
      const match = fallbackCities.find(f => f.toLowerCase().startsWith(inputValue.toLowerCase()));
      if (match) options = [{ value: "0 0", label: match }];
    }

    return { options };
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <AsyncPaginate
      placeholder="Search for Indian city"
      debounceTimeout={500}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
