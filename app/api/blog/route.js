import { NextResponse } from 'next/server';
import { writeFile, unlink, mkdir } from 'fs/promises';
import path from 'path';
import BlogModel from '../../lib/models/BlogModels';
import { ConnectDB } from '../../lib/config/ConnectDB';

let isDBConnected = false;

const LoadDB = async () => {
  if (!isDBConnected) {
    await ConnectDB();
    isDBConnected = true;
  }
};

// GET all blogs or a single blog by id
export async function GET(request) {
  await LoadDB();

  try {
    const blogId = request.nextUrl.searchParams.get("id");

    if (blogId) {
      const blog = await BlogModel.findById(blogId);

      if (!blog) {
        return NextResponse.json({ error: "Blog not found" }, { status: 404 });
      }

      return NextResponse.json({ blog }, { status: 200 });
    } else {
      const blogs = await BlogModel.find({});
      return NextResponse.json({ blogs }, { status: 200 });
    }
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}

// POST a new blog with image upload
export async function POST(request) {
  await LoadDB();

  try {
    const formData = await request.formData();
    const image = formData.get("image");

    // Validate image presence and type
    if (!image || typeof image === "string") {
      return NextResponse.json({ error: "Invalid or missing image" }, { status: 400 });
    }

    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validImageTypes.includes(image.type)) {
      return NextResponse.json({ error: "Unsupported image format" }, { status: 400 });
    }

    // Validate required fields
    const title = formData.get("title")?.trim();
    const description = formData.get("description")?.trim();
    const category = formData.get("category")?.trim();
    const author = formData.get("author")?.trim();
    const authorImg = formData.get("authorImg")?.trim() || ""; // optional

    if (!title || !description || !category || !author) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Prepare upload directory
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDir, { recursive: true });

    // Save image file
    const buffer = Buffer.from(await image.arrayBuffer());
    const ext = image.name?.split(".").pop() || "jpg";
    const timestamp = Date.now();
    const fileName = `${timestamp}.${ext}`;
    const filePath = path.join(uploadsDir, fileName);

    await writeFile(filePath, buffer);

    // Create blog document
    const blogData = {
      title,
      description,
      category,
      author,
      image: `/uploads/${fileName}`,
      authorImg,
    };

    await BlogModel.create(blogData);

    return NextResponse.json({ success: true, msg: "Blog Added" }, { status: 201 });
  } catch (err) {
    console.error("Error saving blog:", err);
    return NextResponse.json({ success: false, msg: "Failed to save blog" }, { status: 500 });
  }
}

// DELETE a blog by id and remove image file
export async function DELETE(request) {
  await LoadDB();

  try {
    const id = request.nextUrl.searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: "Missing blog ID" }, { status: 400 });
    }

    const blog = await BlogModel.findById(id);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Remove image file if exists
    if (blog.image) {
      const imagePath = path.join(process.cwd(), "public", blog.image.replace(/^\//, ""));
      try {
        await unlink(imagePath);
      } catch (unlinkError) {
        console.warn("Image file delete failed:", unlinkError);
        // Continue anyway
      }
    }

    // Delete blog from DB
    await BlogModel.findByIdAndDelete(id);

    return NextResponse.json({ success: true, msg: "Blog deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({ success: false, msg: "Failed to delete blog" }, { status: 500 });
  }
}
