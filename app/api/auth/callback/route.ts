import { callback } from '@repo/ui/api/auth/callback';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
 return callback(request)
}