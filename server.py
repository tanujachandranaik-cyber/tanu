"""
Local Development Server for Tanuja M C Portfolio
Automatically serves files with correct MIME types, no-cache headers, and launches browser.
"""
import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class PortfolioHTTPHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def guess_type(self, path):
        # Ensure exact MIME types for all modern web assets
        if path.endswith('.css'):
            return 'text/css'
        elif path.endswith('.js'):
            return 'application/javascript'
        elif path.endswith('.html'):
            return 'text/html'
        elif path.endswith('.avif'):
            return 'image/avif'
        elif path.endswith('.jpg') or path.endswith('.jpeg'):
            return 'image/jpeg'
        elif path.endswith('.pdf'):
            return 'application/pdf'
        return super().guess_type(path)

    def end_headers(self):
        # Disable caching during local development so changes always display immediately
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

def run_server():
    os.chdir(DIRECTORY)
    global PORT
    for attempt_port in range(PORT, PORT + 20):
        try:
            with socketserver.TCPServer(("", attempt_port), PortfolioHTTPHandler) as httpd:
                PORT = attempt_port
                url = f"http://localhost:{PORT}"
                print("=" * 65)
                print(f"  [OK] Tanuja M C Portfolio Server is Live!")
                print(f"  [>>] URL: {url}")
                print(f"  [>>] Directory: {DIRECTORY}")
                print(f"  [>>] Serving with full CSS, JS, Fonts & Assets")
                print(f"  [>>] Press Ctrl+C to stop server at any time")
                print("=" * 65)
                webbrowser.open(url)
                httpd.serve_forever()
                break
        except OSError:
            continue

if __name__ == "__main__":
    try:
        run_server()
    except KeyboardInterrupt:
        print("\n[!] Server stopped successfully.")
        sys.exit(0)
