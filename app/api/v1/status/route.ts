import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const updatedAt = new Date().toISOString();

  const databaseVersionResult = await prisma.$queryRaw`SHOW server_version;`;
  const databaseVersionValue = (databaseVersionResult as any)[0].server_version;

  const databaseMaxConnectionsResult = await prisma.$queryRaw`SHOW max_connections;`;
  const databaseMaxConnectionsValue = (databaseMaxConnectionsResult as any)[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;
  const databaseOpenedConnectionsResult = await prisma.$queryRaw`SELECT count(*)::int FROM pg_stat_activity WHERE datname = ${databaseName};`;
  const databaseOpenedConnectionsValue = (databaseOpenedConnectionsResult as any)[0].count;

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

