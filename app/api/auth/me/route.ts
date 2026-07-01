import { verfyAuthenticity } from '@repo/ui/api/auth/verify-authenticity';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(request: NextRequest) {
   return verfyAuthenticity(request)
  }