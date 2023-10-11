import React, { useState } from 'react'
import { Box } from '../elements'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faCaretDown, faMinus, faXmark } from '@fortawesome/free-solid-svg-icons'
import LabelField from './LabelField'
import { Form } from 'react-bootstrap'
export default function CheckTextField() {
    const [searchCheckTextOpen,searchCheckTextClose]= useState(false)
    const handleSeachCheckTextField = () =>
    {
        searchCheckTextClose(!searchCheckTextOpen)
    }
    return (
        <div>
            <Box className='seach-check-textfield-main'>
                <Box className='seach-check-textfield-filter'>
                    <Box className='seach-check-textfield-filter-items check-checkfield-filter-items'>
                      
                        <span onClick={handleSeachCheckTextField} className='filter-box-span span-val-p'>Select
                        <span className='filter-box-span-span'>hello <FontAwesomeIcon icon={faXmark}/> </span>
                        <span className='filter-box-span-span'>hello <FontAwesomeIcon icon={faXmark}/> </span>
                        {/* <span className='filter-box-span-span'>hello <FontAwesomeIcon icon={faXmark}/> </span>
                        <span className='filter-box-span-span'>hello <FontAwesomeIcon icon={faXmark}/> </span>
                        <span className='filter-box-span-span'>hello <FontAwesomeIcon icon={faXmark}/> </span>
                        <span className='filter-box-span-span'>hello <FontAwesomeIcon icon={faXmark}/> </span>
                        <span className='filter-box-span-span'>hello <FontAwesomeIcon icon={faXmark}/> </span>
                        <span className='filter-box-span-span'>hello <FontAwesomeIcon icon={faXmark}/> </span>
                        <span className='filter-box-span-span'>hello <FontAwesomeIcon icon={faXmark}/> </span>
                          */}
                         </span>
                         
                        
                        <span className='filter-box-span-caret'><FontAwesomeIcon icon={faAngleDown} /> </span>
                       {
                        searchCheckTextOpen?
                        <Box className="seach-check-textfield-select-opt">
                        <Box className="seach-check-textfield-select-opt-box">
                            <Box className="filter-box-checkbox-main">

                                <Box className="filter-box-checkbox-div">
                                    <Box className="filter-box-checkbox">
                                        <Form.Check type="checkbox" label="Terminal 1" />
                                    </Box>
                                </Box>
                                <Box className="filter-box-checkbox-div">
                                    <Box className="filter-box-checkbox">
                                        <Form.Check type="checkbox" label="Terminal 1" />
                                    </Box>
                                </Box>
                                
                            </Box>
                        </Box>
                    </Box>
                    :""
                       }
                       
                    </Box>
                   

                </Box>
            </Box>
        </div>
    )
}
