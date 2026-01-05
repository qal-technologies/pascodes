"use client";

import {Box} from '@chakra-ui/react';
import React from 'react';

export interface SectionProp {
    children?: React.ReactNode;
    direction?: 'row' | 'column';
    wrap?: boolean;
    bgColor?: string | any;
    padding?: number | string;
    id?: string | any;
    py?: number | string;
    px?: number | string;
    pt?: number | string;
    pb?: number | string;
    type?: 'roundedTop' | 'rounded' | 'plain' | 'roundedBottom';
}
export default function Section ({children, direction = 'column', wrap = true, bgColor, padding = 10, py, px, pt, pb, type = 'plain', id}: SectionProp) {
    return (
        <Box
            id={id}
            borderRadius={type === 'rounded' ? '16px' :
                type === 'roundedTop' ? '16px 16px 0 0'
                    : type === 'roundedBottom' ? '0 0 16px 16px'
                        : '0'}
            bg={bgColor || 'black'}
            padding={padding}
            py={py || padding}
            px={px || padding}
            pt={pt || padding}
            pb={pb || padding}
            alignItems={'center'}
            justifyContent={'center'}
            gap={10}
            flexWrap={wrap ? 'wrap' : 'nowrap'}
            flex={1}
            flexDirection={direction}
            width="100%"
        >
            {children}
        </Box>
    );
}