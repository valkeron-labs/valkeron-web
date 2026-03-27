import {NextRequest, NextResponse} from 'next/server';
import {revalidatePath} from 'next/cache';

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');

  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({revalidated: false, message: 'Invalid secret'}, {status: 401});
  }

  revalidatePath('/blog');
  revalidatePath('/en/blog');
  revalidatePath('/es/blog');

  return NextResponse.json({revalidated: true});
}
