import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";

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
  return NextResponse.json(result);
}
