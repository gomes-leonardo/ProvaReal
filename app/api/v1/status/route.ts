import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET() {
  const updatedAt = new Date().toISOString();

  const databaseVersionResult = await prisma.$queryRaw`SHOW server_version;`;
  const databaseVersionValue = (databaseVersionResult as [{ server_version: string }])[0].server_version;

  const databaseMaxConnectionsResult = await prisma.$queryRaw`SHOW max_connections;`;
  const databaseMaxConnectionsValue = (databaseMaxConnectionsResult as [{ max_connections: string }])[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;
  const databaseOpenedConnectionsResult = await prisma.$queryRaw`SELECT count(*)::int FROM pg_stat_activity WHERE datname = ${databaseName};`;
  const databaseOpenedConnectionsValue = (databaseOpenedConnectionsResult as [{ count: number }])[0].count;

  return NextResponse.json(
    {
      updated_at: updatedAt,
      dependencies: {
        database: {
          version: databaseVersionValue,
          max_connections: parseInt(databaseMaxConnectionsValue),
          opened_connections: databaseOpenedConnectionsValue,
        },
      },
    },
    { status: 200 }
  );
}

