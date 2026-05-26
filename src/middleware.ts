import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // #region agent log
  fetch("http://127.0.0.1:7508/ingest/89111af3-c42c-4e1f-860d-2f18eb98b7c8", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Debug-Session-Id": "4dfaf1",
    },
    body: JSON.stringify({
      sessionId: "4dfaf1",
      runId: "post-fix",
      hypothesisId: "H1-framework",
      location: "src/middleware.ts:middleware",
      message: "request reached Next.js middleware",
      data: { path: request.nextUrl.pathname },
      timestamp: Date.now(),
    }),
  }).catch(() => {});
  // #endregion

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
