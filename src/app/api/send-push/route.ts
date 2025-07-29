import { NextRequest, NextResponse } from "next/server";
import admin from "@/lib/firebaseAdmin";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const message = {
      notification: {
        title: body.title || "Default Title",
        body: body.body || "Default Body",
      },
      token: body.token,
      data: {
        target: body.data?.target || "",
        userId: body.data?.userId || "",
      },
    };

    const response = await admin.messaging().send(message);
    console.log("Push notification sent successfully:", JSON.stringify(response));
    return NextResponse.json({ success: true, response });
  } catch (error: any) {
    console.error("Push notification error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
