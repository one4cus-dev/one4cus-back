// src\lib\revalidate-frontend.ts
//this function will be used to trigger frontend revalidation for specific pages when data changes on the backend. It will call a Next.js API route that we will create later to handle the revalidation logic.
import { appConfig } from "../config/app-config.js";

type RevalidatePayload = {
  type: "services" | "service" | "deals" | "deal" | "home" | "all";
  slug?: string;
};

export async function revalidateFrontend(payload: RevalidatePayload) {
  const url = appConfig.integrations.frontendRevalidationUrl;
  const secret = appConfig.integrations.frontendRevalidationSecret;

  if (!url || !secret) {
    console.warn("[frontend-revalidate] Missing env variables.");
    return;
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        secret,
        ...payload,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();

      console.error(
        "[frontend-revalidate] Failed:",
        response.status,
        errorText
      );

      return;
    }

    const result = await response.json();
    console.log("[frontend-revalidate] Success:", result);
  } catch (error) {
    console.error("[frontend-revalidate] Request error:", error);
  }
}