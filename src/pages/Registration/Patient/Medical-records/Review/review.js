import React from "react";
import { Box } from "@mui/material";

import Sidebar from "../../components/layout/SiderBar";
import FormHeader from "../../components/layout/FormHeader";
import Footer from "../../components/layout/Footer";

import ReviewAccordion from "./ReviewAccordion";
import ReviewCard from "./ReviewCard";

import {
    basicDetails,
    locationDetails,
    emergencyDetails,
    physicalDetails,
    healthDetails,
} from "./reviewConstants";

const Review = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex justify-center p-3">
            <div className="w-full max-w-350 bg-white flex min-h-172.5">

                <Sidebar />

                <main className="flex-1 flex flex-col">

                    <FormHeader
                        title="Review"
                        subtitle="Review all the information before submitting your profile."
                    />

                    <div className="flex-1 px-10 pt-4 pb-6">

                        {/* Personal Information */}
                        <ReviewAccordion
                            title="Personal Information"
                            defaultExpanded={true}
                        >
                            <Box className="grid grid-cols-2 gap-6">

                                <ReviewCard
                                    title="Basic Details"
                                    headerIcon="tabler:user"
                                    data={basicDetails}
                                />

                                <ReviewCard
                                    title="Location"
                                    headerIcon="tabler:map-pin"
                                    data={locationDetails}
                                />

                                <ReviewCard
                                    title="Emergency Contact"
                                    headerIcon="tabler:phone"
                                    data={emergencyDetails}
                                />

                                <ReviewCard
                                    title="Physical Profile"
                                    headerIcon="tabler:ruler-2"
                                    data={physicalDetails}
                                />

                                <ReviewCard
                                    title="Health Overview"
                                    headerIcon="tabler:activity-heartbeat"
                                    data={healthDetails}
                                />

                            </Box>
                        </ReviewAccordion>

                        {/* Medical Records */}
                        <ReviewAccordion title="Medical Records">
                            <Box className="py-6 text-sm text-[#6B7280]">
                                Medical Records information will be displayed here.
                            </Box>
                        </ReviewAccordion>

                        {/* Insurance */}
                        <ReviewAccordion title="Insurance">
                            <Box className="py-6 text-sm text-[#6B7280]">
                                Insurance information will be displayed here.
                            </Box>
                        </ReviewAccordion>

                    </div>

                    <Footer />

                </main>

            </div>
        </div>
    );
};

export default Review;
