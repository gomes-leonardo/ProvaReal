import { NextResponse } from "next/server";

/**
 * Endpoint de status
 * GET /api/status
 */
export async function GET() {
  return NextResponse.json(
    {
      status: "ok",
      message: "API is running",
      timestamp: new Date().toISOString(),
    },
    { status: 200 }
  );
}

