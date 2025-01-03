import { MenuItem, Select } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styles from "@/styles/filter.module.css";
import { useState } from "react";

const theme = createTheme({
  components: {
    MuiSelect: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
        },
      },
    },
  },
});

const Filter = ({ filterOptions, onFilterChange }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    const selectedRole = event.target.value;
    setSelectedOption(selectedRole);
    onFilterChange(selectedRole);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.container}>
        <Select
          value={selectedOption}
          onChange={handleOptionChange}
          displayEmpty
          className={styles.select}
          variant="outlined"
        >
          <MenuItem value="">All</MenuItem>
          {filterOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </div>
    </ThemeProvider>
  );
};

export default Filter;
