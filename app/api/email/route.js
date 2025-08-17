import { NextResponse } from 'next/server';
import ConnectDB from '@/lib/config/ConnectDB';
import EmailModel from '@/lib/models/EmailModel';

const LoadDB = async () => {
  await ConnectDB();
};
LoadDB();

export async function POST(request) {
  try {
    // Parse form data correctly from the request
    const formData = await request.formData();

    // Get the email value from form data
    const email = formData.get('email');

    if (!email) {
      return NextResponse.json({ success: false, msg: 'Email is required' }, { status: 400 });
    }

    // Create new email document in DB
    await EmailModel.create({ email });

    return NextResponse.json({ success: true, msg: 'Email subscribed successfully' });
  } catch (error) {
    console.error('Error subscribing email:', error);
    return NextResponse.json({ success: false, msg: 'Failed to subscribe email' }, { status: 500 });
  }
}
export async function GET(request){
    const emails = await EmailModel.find({});
    return NextResponse.json({emails});

}
export async function DELETE(request){
  const id = await request.nextUrl.searchParams.get("id");
  await EmailModel.findByIdAndDelete(id);
  return NextResponse.json({success:true,msg:"Email Deleted"})

}
