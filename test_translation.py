from app import app

# Test with different language parameters using test client
with app.test_client() as client:
    # Test English translation
    response = client.get('/?lang=en')
    print("English version:")
    print(response.get_data(as_text=True)[:500] + "...")
    
    print("\n" + "="*50 + "\n")
    
    # Test Japanese translation  
    response = client.get('/?lang=ja')
    print("Japanese version:")
    print(response.get_data(as_text=True)[:500] + "...")