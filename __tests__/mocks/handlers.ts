import { http, HttpResponse } from "msw";

export const handlers = [
  // Auth endpoints
  http.post("/api/auth/login", async ({ request }) => {
    const { email, password } = await request.json();
    if (email === "test@example.com" && password === "password123") {
      return HttpResponse.json({
        id: "1",
        name: "Test User",
        email,
        plan: "FREE",
      });
    }
    return HttpResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }),

  http.post("/api/auth/register", async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json(
      {
        id: "1",
        name: body.name,
        email: body.email,
        createdAt: new Date().toISOString(),
      },
      { status: 201 }
    );
  }),

  http.post("/api/auth/logout", async () => {
    return HttpResponse.json({ message: "Logged out successfully" });
  }),

  http.get("/api/me", async () => {
    return HttpResponse.json({
      id: "1",
      name: "Test User",
      email: "test@example.com",
      plan: "FREE",
      monthlyUsage: 0,
      monthlyQuota: 10,
    });
  }),

  // Analysis endpoints
  http.post("/api/analysis", async () => {
    return HttpResponse.json({
      id: "mock-analysis-id",
      resultLabel: "REAL",
      score: 85,
      filename: "mock-image.jpg",
      createdAt: new Date().toISOString(),
      plan: "FREE",
    });
  }),

  http.get("/api/analysis", async ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const pageSize = parseInt(url.searchParams.get("pageSize") || "20");

    return HttpResponse.json({
      analyses: [],
      total: 0,
      page,
      pageSize,
    });
  }),

  // Plans endpoint
  http.get("/api/plans", async () => {
    return HttpResponse.json([
      {
        id: "1",
        name: "FREE",
        monthlyQuota: 10,
        priceCents: 0,
      },
    ]);
  }),
];
