import { MenuItem, Select, TextField } from "@mui/material";
import styles from "./src/styles/filter.module.css";
import { useState } from "react";

const Filter = ({ filterOptions, onFilterChange }) => {
  const [selectedOption, setSelectedOption] = useState("");
  
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    onFilterChange(event.target.value, searchQuery);
  };

  return (
    <div className={styles.container}>
      <Select
        value={selectedOption}
        onChange={handleOptionChange}
        displayEmpty
        className={styles.select}
      >
        <MenuItem value="">All</MenuItem>
        {filterOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default Filter;