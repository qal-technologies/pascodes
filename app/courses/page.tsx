'use client';

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Scrollable from "@/components/layout/Scrollable";
import {Separator} from "@chakra-ui/react";
import React from "react";

export default function Courses () {
    return (
        <Scrollable>
            <Navbar />

            <Separator borderColor="whiteAlpha.100" />
            <Footer />
        </Scrollable>
    );
}