import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  const LFrappeUrl = process.env.NEXT_PUBLIC_FRAPPE_URL;
  const { origin } = new URL(request.url);
  const LRefreshToken = request.cookies.get('refresh_token')?.value;

  // Frappe rotates refresh tokens during token renewal.
  // Revoke the latest refresh token during logout to prevent
  // future access token generation from a leaked token.
  if (LRefreshToken) {
    try {
      await fetch(
        `${LFrappeUrl}/api/method/frappe.integrations.oauth2.revoke_token`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            token: LRefreshToken,
          }).toString(),
        }
      );
    } catch (error) {
      console.error('Refresh token revocation failed:', error);
    }
  }
  const LdResponse = NextResponse.redirect(new URL('/', origin));
  LdResponse.cookies.delete('website_session');
  LdResponse.cookies.delete('refresh_token');
  
  return LdResponse;
}
