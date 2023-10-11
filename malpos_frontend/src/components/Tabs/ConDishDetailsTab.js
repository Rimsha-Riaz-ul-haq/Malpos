// import React from "react";
// import { Container, Form, Row, Col, Button, Table } from "react-bootstrap";
// import { LabelField } from "../fields";
// import { Box, Label, Textarea } from "../elements";
// import ColorDivs from "./ColorDivs";
// import { FormLabel } from "react-bootstrap";
// import { useState } from "react";
// import SeachTextField from "../fields/SeachTextField";
// import CheckTextField from "../fields/CheckTextField";
// export default function ConDishDetailsTab() {
//   const [show, setShow] = useState(false);
//   const [imgfile, setImgFile] = useState([]);
//   const [value, setValue] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   const showDetails = () => {
//     setShow(!show);
//   };

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     const reader = new FileReader();

//     reader.onload = () => {
//       setImgFile([...imgfile, reader.result]);
//     };

//     reader.readAsDataURL(file);
//   };
//   const handleImageRemove = (index) => {
//     const newImgFile = [...imgfile];
//     newImgFile.splice(index, 1);
//     setImgFile(newImgFile);
//   };
//   const handleChange = (e) => {
//     const inputValue = e.target.value;
//     if (inputValue > 1) {
//       setErrorMessage(" Cannot be greater than 1");
//     } else {
//       setErrorMessage("");

//       setValue(inputValue);
//     }
//   };
//   return (
//     <div>
//       <Row>
//         <Col md={8}>
//           <Row>
//             <Col md={6}>
//               <LabelField
//                 type="text"
//                 label=" Name"
//                 fieldSize="w-100 h-md"
//                 required
//                 // value="Fish"
//               />
//             </Col>
//             <Col md={6}>
//               <LabelField type="text" label="Bardcode" fieldSize="w-100 h-md" />
//             </Col>
//             <Col md={6}>
//               <LabelField
//                 label=" Accounting Category"
//                 option={[
//                   "Select Category",
//                   "Sea food",
//                   "Expresso",
//                   "Ice drink",
//                   "Pizza",
//                 ]}
//                 fieldSize="w-100 h-md"
//               />
//             </Col>
//             <Col md={6}>
//               <LabelField
//                 label=" Category"
//                 option={[
//                   "Select Category",
//                   "Sea food",
//                   "Expresso",
//                   "Ice drink",
//                   "Pizza",
//                 ]}
//                 fieldSize="w-100 h-md"
//               />
//             </Col>

//             <Col md={6}>
//               <LabelField
//                 label="Station"
//                 option={["Select Station", "Kitchen", "Hotbar", "Shisha"]}
//                 fieldSize="w-100 h-md"
//               />
//             </Col>
//             <Col md={6}>
//               <LabelField
//                 type="number"
//                 placeholder="Default: 1"
//                 label="Maxium day of product return"
//                 fieldSize="w-100 h-md"
//                 onChange={handleChange}
//               />
//               {errorMessage && (
//                 <p className="error" style={{ color: "red", fontSize: "10px" }}>
//                   {errorMessage}
//                 </p>
//               )}
//             </Col>
//             <Col md={6}>
//               <LabelField
//                 type="number"
//                 placeholder="0"
//                 label="Cooking time"
//                 fieldSize="w-100 h-md"
//               />
//             </Col>
//             <Col md={6}>
//               <Label
//                 for="Description"
//                 style={{ color: "#403e57", fontSize: "14px" }}
//               >
//                 Description
//               </Label>
//               <textarea
//                 style={{ fontSize: "12px" }}
//                 id="description"
//                 className="form-control"
//                 rows={5}
//               ></textarea>
//             </Col>

//             <Col md={6}>
//               <LabelField
//                 label="Taxes"
//                 option={[
//                   "Select Tax",
//                   "VAT 15%",
//                   "VAT 20%",
//                   "Tobacco Tax 100%",
//                 ]}
//                 fieldSize="w-100 h-md"
//               />
//             </Col>
//             {/* <Col md={6}>
//               <LabelField
//                 label="Allergies"
//                 option={["Select", "Egg", "Fish", "Milk"]}
//                 fieldSize="w-100 h-md"
//               />
//             </Col> */}
//             {/* <Col md={6}>
//               <LabelField
//                 type="number"
//                 placeholder="0"
//                 label="Cooking time"
//                 fieldSize="w-100 h-md"
//                 disabled
//               />
//             </Col> */}
//             <Col md={6}>
//               <SeachTextField />
//             </Col>
//             {/* <Col md={6}>
//               <SeachTextField />
//             </Col> */}
//             {/* <Col md={6}>
//               <CheckTextField />
//             </Col> */}
//             {/* <Col md={6}>
//               <Textarea label="Description" />
//             </Col> */}
//             <Col md={6}>
//               <FormLabel>Hide</FormLabel>

//               <Form.Check type="switch" id="custom-switch" label="" />
//               <Box className="basicInfo-checkBoxes">
//                 <Form.Check type="checkbox" label="Gifts" />
//                 <Form.Check type="checkbox" label="Portion" />
//                 <Form.Check type="checkbox" label="Bundle" />
//                 <Form.Check type="checkbox" label="Can't be Discounted" />
//                 <Form.Check type="checkbox" label="Sold by Weight" />
//               </Box>
//             </Col>
//             <Col md={12}>
//               <Row>
//                 <Col md={6}>
//                   <Form>
//                     <Form.Group controlId="formFile">
//                       <Form.Label>Image</Form.Label>
//                       <Box className="pl-img">
//                         {imgfile.length === 0 ? (
//                           <>
//                             <input
//                               type="file"
//                               id="fileInput"
//                               accept=".jpg, .jpeg, .png"
//                               onChange={handleImageUpload}
//                             />
//                           </>
//                         ) : (
//                           <>
//                             {imgfile.map((elem, index) => (
//                               <span key={elem} style={{ display: "block" }}>
//                                 <button
//                                   onClick={() => handleImageRemove(index)}
//                                   style={{
//                                     float: "right",
//                                     marginBottom: "10px",
//                                   }}
//                                 >
//                                   ✖
//                                 </button>
//                                 <img
//                                   src={elem}
//                                   height="200"
//                                   width="200"
//                                   alt="med1"
//                                   style={{ float: "left", marginRight: "10px" }}
//                                 />
//                               </span>
//                             ))}
//                           </>
//                         )}
//                       </Box>
//                     </Form.Group>
//                   </Form>
//                 </Col>
//                 <Col md={6}>
//                   <ColorDivs />
//                 </Col>
//                 <Col md={12}>
//                   <FormLabel>According to Venue</FormLabel>
//                   <Form.Check
//                     type="switch"
//                     id="custom-switch"
//                     label=""
//                     onClick={showDetails}
//                   />
//                 </Col>
//                 {show ? (
//                   <div>
//                     <Col md={12}>
//                       <Table>
//                         <thead className="thead-recipe">
//                           <tr>
//                             <th>Name</th>
//                             <th>Price</th>
//                             <th className="">Inactive</th>
//                             <th className=""> Hide on e-menu</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           <tr>
//                             <td>Main</td>
//                             <td>
//                               <Col md={2}>
//                                 <input
//                                   className="conProduct-input"
//                                   type="number"
//                                   placeholder="0"
//                                 />
//                               </Col>
//                             </td>
//                             <td className="">
//                               {" "}
//                               <Form.Check type="checkbox" />
//                             </td>
//                             <td className="">
//                               {" "}
//                               <Form.Check type="checkbox" />
//                             </td>
//                           </tr>
//                           <tr>
//                             <td>B2</td>
//                             <td>
//                               <Col md={2}>
//                                 <input
//                                   className="conProduct-input"
//                                   type="number"
//                                   placeholder="0"
//                                 />
//                               </Col>
//                             </td>
//                             <td className="">
//                               <Form.Check type="checkbox" />
//                             </td>
//                             <td className="">
//                               {" "}
//                               <Form.Check type="checkbox" />
//                             </td>
//                           </tr>
//                           <tr>
//                             <td>Bakery</td>
//                             <td>
//                               <Col md={2}>
//                                 <input
//                                   className="conProduct-input"
//                                   type="number"
//                                   placeholder="0"
//                                 />
//                               </Col>
//                             </td>
//                             <td className="">
//                               <Form.Check type="checkbox" />
//                             </td>
//                             <td className="">
//                               {" "}
//                               <Form.Check type="checkbox" />
//                             </td>
//                           </tr>
//                         </tbody>
//                       </Table>
//                     </Col>
//                   </div>
//                 ) : (
//                   ""
//                 )}

//                 <Col md={12}>
//                   <Row>
//                     <Col md={4}>
//                       <LabelField
//                         type="number"
//                         placeholder="0"
//                         label="Cost Price"
//                         fieldSize="w-100 h-md"
//                         disabled
//                       />
//                     </Col>
//                     <Col md={4}>
//                       <LabelField
//                         type="number"
//                         placeholder="0"
//                         label="Extra cost Price"
//                         fieldSize="w-100 h-md"
//                       />
//                     </Col>
//                     <Col md={4}>
//                       <LabelField
//                         type="number"
//                         placeholder="0"
//                         label="Sale Price"
//                         fieldSize="w-100 h-md"
//                       />
//                     </Col>
//                   </Row>
//                 </Col>
//               </Row>
//             </Col>
//           </Row>
//         </Col>
//       </Row>
//     </div>
//   );
// }

import React from "react";
import { Container, Form, Row, Col, Button, Table } from "react-bootstrap";
import { LabelField } from "../fields";
import { Box, Label } from "../elements";
import ColorDivs from "./ColorDivs";
import { FormLabel } from "react-bootstrap";
import { useState } from "react";
import MultiSelectField from "../fields/MultiSelectField";
import MultiSelectDiets from "../fields/MultiSelectDiets";
import MultiSelectTax from "../fields/MultiSelectTax";

export default function ConDishDetailsTab() {
  const [show, setShow] = useState(false);
  const [imgfile, setImgFile] = useState([]);
  const [value, setValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const showDetails = () => {
    setShow(!show);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImgFile([...imgfile, reader.result]);
    };

    reader.readAsDataURL(file);
  };
  const handleImageRemove = (index) => {
    const newImgFile = [...imgfile];
    newImgFile.splice(index, 1);
    setImgFile(newImgFile);
  };
  const handleChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue > 1) {
      setErrorMessage(" Cannot be greater than 1");
    } else {
      setErrorMessage("");

      setValue(inputValue);
    }
  };
  return (
    <div>
      <Row>
        <Col md={8}>
          <Row>
            <Col md={6}>
              <LabelField
                type="text"
                label=" Name"
                fieldSize="w-100 h-md"
                required
                // value="Fish"
              />
            </Col>
            <Col md={6}>
              <LabelField type="text" label="Bardcode" fieldSize="w-100 h-md" />
            </Col>
            <Col md={6}>
              <LabelField
                label=" Accounting Category"
                option={[
                  "Select Category",
                  "Sea food",
                  "Expresso",
                  "Ice drink",
                  "Pizza",
                ]}
                fieldSize="w-100 h-md"
              />
            </Col>
            <Col md={6}>
              <LabelField
                label=" Category"
                option={[
                  "Select Category",
                  "Sea food",
                  "Expresso",
                  "Ice drink",
                  "Pizza",
                ]}
                fieldSize="w-100 h-md"
              />
            </Col>

            <Col md={6}>
              <LabelField
                label="Station"
                option={["Select Station", "Kitchen", "Hotbar", "Shisha"]}
                fieldSize="w-100 h-md"
              />
            </Col>
            <Col md={6}>
              <LabelField
                type="number"
                placeholder="Default: 1"
                label="Maximum days of product return"
                fieldSize="w-100 h-md"
                onChange={handleChange}
              />
              {errorMessage && (
                <p className="error" style={{ color: "red", fontSize: "10px" }}>
                  {errorMessage}
                </p>
              )}
            </Col>
            <Col md={6}>
              <LabelField
                type="number"
                placeholder="0"
                label="Cooking time"
                fieldSize="w-100 h-md"
              />
            </Col>
            <Col md={6}>
              <Label
                for="Description"
                style={{ color: "#403e57", fontSize: "14px" }}
              >
                Description
              </Label>
              <textarea
                style={{ fontSize: "12px" }}
                id="description"
                className="form-control"
                rows={5}
              ></textarea>
            </Col>

            <Col md={6}>
              {/* <LabelField
                label="Taxes"
                option={[
                  "Select Tax",
                  "VAT 15%",
                  "VAT 20%",
                  "Tobacco Tax 100%",
                ]}
                fieldSize="w-100 h-md"
              /> */}
              <MultiSelectTax />
            </Col>
            <Col md={6}>
              {/* <LabelField
                label="Allergies"
                option={["Select", "Egg", "Fish", "Milk"]}
                fieldSize="w-100 h-md"
              /> */}
              <MultiSelectField />
            </Col>
            <Col md={6}>
              {/* <LabelField
                label="Diets"
                option={["Select", "Halal", "Kosher", "Vegetarian", "Spicy"]}
                fieldSize="w-100 h-md"
              /> */}
              <MultiSelectDiets />
            </Col>

            <Col md={6}>
              <FormLabel>Inactive</FormLabel>
              <Form.Check type="switch" id="custom-switch" label="" />
              <Box className="basicInfo-checkBoxes">
                <Form.Check type="checkbox" label="Gifts" />
                <Form.Check type="checkbox" label="Portion" />
                <Form.Check type="checkbox" label="Bundle" />
                <Form.Check type="checkbox" label="Can't be Discounted" />
                <Form.Check type="checkbox" label="Sold by Weight" />
              </Box>
            </Col>
            <Col md={12}>
              <Row>
                <Col md={6}>
                  <Form>
                    <Form.Group controlId="formFile">
                      <Form.Label>Image</Form.Label>
                      <Box className="pl-img">
                        {imgfile.length === 0 ? (
                          <>
                            <input
                              type="file"
                              id="fileInput"
                              accept=".jpg, .jpeg, .png"
                              onChange={handleImageUpload}
                            />
                          </>
                        ) : (
                          <>
                            {imgfile.map((elem, index) => (
                              <span key={elem} style={{ display: "block" }}>
                                <button
                                  onClick={() => handleImageRemove(index)}
                                  style={{
                                    float: "right",
                                    marginBottom: "10px",
                                  }}
                                >
                                  ✖
                                </button>
                                <img
                                  src={elem}
                                  height="200"
                                  width="200"
                                  alt="med1"
                                  style={{ float: "left", marginRight: "10px" }}
                                />
                              </span>
                            ))}
                          </>
                        )}
                      </Box>
                    </Form.Group>
                  </Form>
                </Col>
                <Col md={6}>
                  <ColorDivs />
                </Col>
                <Col md={12}>
                  <FormLabel>According to Venue</FormLabel>
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label=""
                    onClick={showDetails}
                  />
                </Col>
                {show ? (
                  <div>
                    <Col md={12}>
                      <Table>
                        <thead className="thead-recipe">
                          <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th className="">Inactive</th>
                            <th className=""> Hide on e-menu</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Main</td>
                            <td>
                              <Col md={2}>
                                <input
                                  className="conProduct-input"
                                  type="number"
                                  placeholder="0"
                                />
                              </Col>
                            </td>
                            <td className="">
                              {" "}
                              <Form.Check type="checkbox" />
                            </td>
                            <td className="">
                              {" "}
                              <Form.Check type="checkbox" />
                            </td>
                          </tr>
                          <tr>
                            <td>B2</td>
                            <td>
                              <Col md={2}>
                                <input
                                  className="conProduct-input"
                                  type="number"
                                  placeholder="0"
                                />
                              </Col>
                            </td>
                            <td className="">
                              <Form.Check type="checkbox" />
                            </td>
                            <td className="">
                              {" "}
                              <Form.Check type="checkbox" />
                            </td>
                          </tr>
                          <tr>
                            <td>Bakery</td>
                            <td>
                              <Col md={2}>
                                <input
                                  className="conProduct-input"
                                  type="number"
                                  placeholder="0"
                                />
                              </Col>
                            </td>
                            <td className="">
                              <Form.Check type="checkbox" />
                            </td>
                            <td className="">
                              {" "}
                              <Form.Check type="checkbox" />
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </Col>
                  </div>
                ) : (
                  ""
                )}

                <Col md={12}>
                  <Row>
                    <Col md={4}>
                      <LabelField
                        type="number"
                        placeholder="0"
                        label="Cost Price"
                        fieldSize="w-100 h-md"
                        disabled
                      />
                    </Col>
                    <Col md={4}>
                      <LabelField
                        type="number"
                        placeholder="0"
                        label="Extra cost Price"
                        fieldSize="w-100 h-md"
                      />
                    </Col>
                    <Col md={4}>
                      <LabelField
                        type="number"
                        placeholder="0"
                        label="Sale Price"
                        fieldSize="w-100 h-md"
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
