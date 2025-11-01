import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Product from "@/models/Product";
import mongoose from "mongoose";


export async function PUT(req: Request, { params }: any) {
  try {
    await connectToDB();
    const { id } = await params; // Unwrap params
    const body = await req.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
    }

    const updated = await Product.findByIdAndUpdate(id, body, { new: true });

    if (!updated) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (error: any) {
    console.error("PUT /api/products/:id error:", error.message);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}


export async function DELETE(req: Request, { params }: any) {
  try {
    await connectToDB();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
    }

    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("DELETE /api/products/:id error:", error.message);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}

