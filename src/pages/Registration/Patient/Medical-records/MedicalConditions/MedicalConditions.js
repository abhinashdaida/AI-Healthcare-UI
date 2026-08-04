import { Formik } from "formik";
import { Box } from "@mui/material";
import React from "react";
import { medicalValidation } from "./validation";
import { initialValues } from "./constants";
import { Icon } from "@iconify/react";

const MedicalRecords = () => {

    const handleSubmit = (values) => {

        console.log(values);

    };

    return (

        <Formik

            initialValues={initialValues}

            validationSchema={medicalValidation}
            onSubmit={handleSubmit}

        >
            {({

                values,
                setFieldValue,
                handleSubmit

            }) => (

                <Box className="flex w-screen h-screen bg-white">
                    <Box className="w-[336px] h-[1024px] border-r">
                            {/* Sidebar */}
                    </Box>
                    <Box className="flex flex-col h-full">
                        <Box className="w-[1104px] h-[146px] border-b flex items-center pl-10">
                            <h2 className="text-lg font-semibold">Medical Records</h2>
                        </Box>
                        <Box className="w-[1104px] h-[82px] pt-6 pl-10 flex flex-col gap-1">
                            <h3 className="text-sm font-semibold">Medical Conditions</h3>
                            <p className="w-[328px] h-[32px] text-xs font-weight-[400] font-normal text-[#6B7280]">
                                Add your basic health information to help healthcare 
                                providers serve you better.
                            </p>
                        </Box>
                        <Box className="grid grid-cols-2 gap-x-10 gap-y-10 w-[1104px] h-[208px]">
                        </Box>
                        <Box className="border border-dashed rounded-xl w-[1098px] h-[156px]px-10 py-6 flex items-center justify-center">
                        Drag and Drop
                        </Box>
                        <Box className="flex w-[1104px] h-[40px] pl-[40px] pr-[40px] gap-[8px]">
                            <div className="w-[852px] h-[40px] rounded-lg px-[8px] pr-[14px] py-2 flex items-center gap-[8px] bg-[#F5FCFC]">
                                <Icon icon="tabler:lock" width={24} height={24} color="#175A5D" />
                                <p className="text-xs font-normal text-[#175A5D]">
                                    Your medical records are securely stored and used to provide better
                                    healthcare, faster diagnosis,and more personalized treatment.
                                </p>
                            </div>
                        </Box>
                    </Box>
                </Box>

            )}

        </Formik>

    );

};

export default MedicalRecords;