import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/prismicio';

export default async function middleware(request : NextRequest) {
    return;
}

export const config = {
    matcher: [
        {
            source: "/((?!_next|.well-known|api|slice-simulator|favicon.ico|images|video|[^.]+\\..+).*)",
            missing: [
                { type: "header", key: "next-action" },
            ]
        }
    ],
};