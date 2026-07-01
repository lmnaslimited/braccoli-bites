import { login } from '@repo/ui/api/auth/login';

export async function GET(request: Request) {
 return login(request)
}