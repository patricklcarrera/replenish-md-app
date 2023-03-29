import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export default function Search({searchTerm, changeSearch}){
    
    const handleChange = (e) => {
        changeSearch(e.target.value);
    }


    const tailwindSearchBar = 
    <div className="flex justify-center">
    <div className="relative w-1/2">
    <input className="bg-gray-100 rounded-full py-2 px-4 pl-10 block w-full appearance-none leading-normal focus:outline-none focus:shadow-outline-blue" type="text" onChange={handleChange} value={searchTerm} placeholder="Search" />
    <div className="absolute top-0 left-0 mt-2 ml-3">
    </div>
  </div>
  </div>
    return (
      <div>{tailwindSearchBar}</div>
        // <InputGroup className="mb-3" style={{"padding": "10px", "width" : "50%", "margin": "auto"}}>
        //   <InputGroup.Text id="inputGroup-sizing-default">
        //     Search
        //   </InputGroup.Text>
        //   <Form.Control
        //     aria-label="Default"
        //     aria-describedby="inputGroup-sizing-default"
        //     value={searchTerm}
        //     type="text"
        //     placeholder='Search product'
        //     onChange={handleChange}
        //   />
        // </InputGroup>

    )
}