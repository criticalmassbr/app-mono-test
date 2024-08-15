import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        cookies().delete("auth_token");
        redirect("/login");
    } catch (error) {
        return NextResponse.json({}, { status: 500, statusText: error instanceof Error ? error.message : "Error not mapped" });
    }
}