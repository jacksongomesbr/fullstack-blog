import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  const session = await getServerSession(authOptions);
  const { id } = params;
  const result = await prisma.post.update({
    where: {
      id: id,
    },
    data: {
      published: true,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  revalidatePath("/");
  return NextResponse.json(result);
}
