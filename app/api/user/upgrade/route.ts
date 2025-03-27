import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const userEmail = session.user.email;
    const user = await db.user.findUnique({ where: { email: userEmail } });

    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    // Alternar entre "admin" y "user"
    const newRole = user.role === "admin" ? "user" : "admin";

    await db.user.update({
      where: { email: userEmail },
      data: { role: newRole },
    });

    return NextResponse.json({ success: true, newRole });
  } catch (error) {
    console.error("Error al actualizar el rol:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
