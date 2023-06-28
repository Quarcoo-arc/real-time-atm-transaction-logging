import { useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import searchIcon from "../../assets/searchIcon.svg";

const SearchBar = () => {
  const [searchString, setSearchString] = useState("");
  const handleChange = (e) => setSearchString(e.target.value);
  return (
    <Paper
      component="form"
      sx={{
        p: "20px",
        width: 360,
        height: "8rem",
        borderRadius: 50,
        display: "flex",
        background: "none",
        boxShadow: "none",
        border: "1px solid #FFFFFF",
        boxSizing: "border-box",
        "@media screen and (max-width: 768px)": {
          p: "10px 15px",
          width: 300,
          height: "6rem",
        },
        "@media screen and (max-width: 425px)": {
          height: "5rem",
        },
      }}
    >
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <img src={searchIcon} alt="Search" />
      </IconButton>
      <InputBase
        sx={{
          ml: 1,
          flex: 1,
          color: "white",
          "::placeholder": { color: "#CCCCCC !important" },
          fontWeight: 600,
          fontSize: 25,
          "@media screen and (max-width: 768px)": {
            fontSize: 20,
          },
        }}
        placeholder="Search"
        inputProps={{ "aria-label": "search" }}
        value={searchString}
        onChange={handleChange}
      />
    </Paper>
  );
};

export default SearchBar;
