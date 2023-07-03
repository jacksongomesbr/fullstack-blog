import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function PUT(request, { params }) {
  const session = await getServerSession(authOptions);
  const { id } = params;
  const { title, content } = await request.json();
  const result = await prisma.post.update({
    where: {
      id: id,
    },
    data: {
      title: title,
      content: content,
      author: { connect: { email: session?.user?.email } },
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return NextResponse.json(result);
}

export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions);
  const { id } = params;
  const result = await prisma.post.delete({
    where: {
      id: id,
    },
  });
  return NextResponse.json(result);
}
