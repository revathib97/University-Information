import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { MenuItem, Select } from "@mui/material";


function TableData() {
  const [tableData, setTable] = useState([]);
  const [sorting, setSorting] = useState({ key: "name", ascending: true })
  const [countriesList, setcountriesList] = useState([]);
  const [filterCountryData, setFilterCountryData] = useState([]);
  const [selectedCountry, setSelectedCountry]= useState('');

  useEffect(() => {
    fetch('http://universities.hipolabs.com/search?country')
      .then((res) => res.json())
      .then((response) => {
        setTable(response);
        setFilterCountryData(response);
        setcountriesList([...new Set(response.map(e => e.country))])

      })

  }, [])

  const sortingOnClickHandler = (key, ascending) => {

    
    const jsonData = [...filterCountryData]
    const tableSort = jsonData.sort((a, b) => {
      return a[sorting.key].localeCompare(b[sorting.key]);
    })
    setFilterCountryData(
      sorting.ascending ? tableSort : tableSort.reverse()
    );
    setSorting({ key: key, ascending: ascending });
  }

  const handleCountryChange = (countryName) => {
    setSelectedCountry(countryName);
    const tData = tableData.filter(c => c.country.includes(countryName));
    setFilterCountryData(tData);
  }

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ cursor: 'pointer' }} onClick={() => sortingOnClickHandler("name", !sorting.ascending)}>Name</TableCell>
            <TableCell>
              <Select
                style={{ width: "100%" }}
                value={selectedCountry}
                onChange={e => handleCountryChange(e.target.value)}
                name="country"
              >
                {countriesList.map((country, index) => {
                  return (
                    <MenuItem key={index} value={country}>{country}</MenuItem>
                  )
                })}
              </Select>
            </TableCell>
            <TableCell>Country Code</TableCell>
            <TableCell>Domains</TableCell>
            <TableCell>Web_pages</TableCell>
            <TableCell>state_province</TableCell>

          </TableRow>
        </TableHead>

        <TableBody>
          {filterCountryData.map((data, index) => {
            return (
              <TableRow key={index + 1}>

                <TableCell>{data.name}</TableCell>
                <TableCell>{data.country}</TableCell>
                <TableCell>{data.alpha_two_code}</TableCell>
                <TableCell>{data.domains}</TableCell>
                <TableCell>{data.web_pages}</TableCell>
                <TableCell>{data.state_province}</TableCell>

              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </>
  )
}
export default TableData;
