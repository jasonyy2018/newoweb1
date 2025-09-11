from app import app
from flask import Request
from flask.testing import FlaskClient
import io

# Create a test client
with app.test_client() as client:
    # Test 1: Direct root access without headers
    print("Test 1: Direct access to /")
    response = client.get('/')
    print(f"Status: {response.status_code}")
    
    # Test 2: With Accept-Language header
    print("\nTest 2: With Accept-Language header")
    response = client.get('/', headers={'Accept-Language': 'en-US,en;q=0.9'})
    print(f"Status: {response.status_code}")
    print(f"Response data: {response.get_data(as_text=True)[:200]}")
    
    # Test 3: Check what get_locale returns
    print("\nTest 3: Testing get_locale function directly")
    with app.app_context():
        from flask import request
        from app import get_locale
        
        # Create a mock request with Accept-Language header
        environ = {
            'HTTP_ACCEPT_LANGUAGE': 'en-US,en;q=0.9',
            'REQUEST_METHOD': 'GET',
            'PATH_INFO': '/',
            'SERVER_NAME': 'localhost',
            'SERVER_PORT': '5000',
            'wsgi.version': (1, 0),
            'wsgi.url_scheme': 'http',
            'wsgi.input': io.BytesIO(b''),
            'wsgi.errors': io.StringIO(),
            'wsgi.multithread': False,
            'wsgi.multiprocess': False,
            'wsgi.run_once': False
        }
        
        with app.request_context(environ):
            try:
                locale = get_locale()
                print(f"Detected locale: {locale}")
            except Exception as e:
                print(f"Error in get_locale: {e}")
                import traceback
                traceback.print_exc()