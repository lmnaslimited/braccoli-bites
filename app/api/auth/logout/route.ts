import { logout } from '@repo/ui/api/auth/logout';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  return logout(request)
}