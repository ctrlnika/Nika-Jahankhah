"""Get your own Spotify refresh token locally; no credentials are saved."""
import base64
import getpass
import json
import secrets
import urllib.error
import urllib.parse
import urllib.request
import webbrowser
from http.server import BaseHTTPRequestHandler, HTTPServer

REDIRECT = "http://127.0.0.1:8888/callback"


def main():
    print("Add this exact Redirect URI to your Spotify app first: " + REDIRECT)
    client_id = input("Spotify Client ID: ").strip()
    client_secret = getpass.getpass("Spotify Client Secret (hidden): ").strip()
    if not client_id or not client_secret:
        raise SystemExit("Both values are required.")
    state = secrets.token_urlsafe(32)
    result = {}

    class Callback(BaseHTTPRequestHandler):
        def log_message(self, *_args):
            pass  # Never log an authorization code or callback URL.

        def do_GET(self):
            url = urllib.parse.urlparse(self.path)
            if url.path != "/callback":
                self.send_error(404)
                return
            query = urllib.parse.parse_qs(url.query)
            if not secrets.compare_digest(query.get("state", [""])[0], state):
                self.send_error(400, "Invalid authorization state. Restart setup.")
                result["error"] = "Authorization state did not match."
                return
            if "error" in query or not query.get("code"):
                self.send_error(400, "Spotify authorization was not completed.")
                result["error"] = "Spotify authorization was not completed."
                return
            result["code"] = query["code"][0]
            self.send_response(200)
            self.send_header("Content-Type", "text/plain; charset=utf-8")
            self.send_header("Cache-Control", "no-store")
            self.end_headers()
            self.wfile.write(b"Authorization received. Return to your terminal to finish.")

    authorize = "https://accounts.spotify.com/authorize?" + urllib.parse.urlencode({
        "client_id": client_id,
        "response_type": "code",
        "redirect_uri": REDIRECT,
        "scope": "user-read-currently-playing user-read-recently-played",
        "state": state,
    })
    with HTTPServer(("127.0.0.1", 8888), Callback) as server:
        server.timeout = 180
        print("Approve access in your browser. If it doesn't open, visit:\n" + authorize)
        webbrowser.open(authorize)
        while not result:
            server.handle_request()
            if not result:
                raise SystemExit("No callback received. Run this script again to retry.")
    if result.get("error"):
        raise SystemExit(result["error"])
    request = urllib.request.Request(
        "https://accounts.spotify.com/api/token",
        data=urllib.parse.urlencode({
            "grant_type": "authorization_code",
            "code": result["code"],
            "redirect_uri": REDIRECT,
        }).encode(),
        headers={
            "Authorization": "Basic " + base64.b64encode((client_id + ":" + client_secret).encode()).decode(),
            "Content-Type": "application/x-www-form-urlencoded",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            token = json.load(response).get("refresh_token")
    except urllib.error.HTTPError as error:
        raise SystemExit(f"Spotify token exchange failed (HTTP {error.code}). Check your app values and Redirect URI.") from None
    if not token:
        raise SystemExit("Spotify returned no refresh token. Recheck app permissions and retry.")
    print("\nCopy this into the server secret SPOTIFY_REFRESH_TOKEN:\n" + token)
    print("\nAlso set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in your hosting secret settings.")
    print("Keep all three server-side. Do not paste them into chat or commit them to source control.")


if __name__ == "__main__":
    main()
