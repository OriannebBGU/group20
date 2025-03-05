import pytest
from flask import Flask, json
from pages.RegistrationPet import registrationpet

@pytest.fixture
def client():
    """Create a test client for the Flask app."""
    app = Flask(__name__)
    app.register_blueprint(registrationpet)
    app.config['TESTING'] = True

    with app.test_client() as client:
        yield client

def test_successful_pet_registration(mocker, client):
    """Test successful pet registration."""
    mock_insert_pet = mocker.patch("registrationpet.insert_pet", return_value=None)  # Mock DB insertion

    payload = {
        "petName": "Bella",
        "ownerEmail": "user@example.com",
        "type": "Dog",
        "gender": "Female"
    }

    response = client.post('/register-pet', data=json.dumps(payload), content_type='application/json')

    assert response.status_code == 200
    assert response.get_json()["message"] == "Pet successfully registered!"
    mock_insert_pet.assert_called_once_with({
        "petName": "bella",  # The function lowercases the name
        "ownerEmail": "user@example.com",
        "type": "Dog",
        "gender": "Female"
    })

def test_missing_fields(client):
    """Test missing fields return a 400 error."""
    payload = {
        "petName": "Bella",
        "type": "Dog"
    }

    response = client.post('/register-pet', data=json.dumps(payload), content_type='application/json')

    assert response.status_code == 400
    assert "error" in response.get_json()

def test_invalid_json(client):
    """Test non-JSON requests return a 400 error."""
    response = client.post('/register-pet', data="not json", content_type='text/plain')

    assert response.status_code == 400
    assert response.get_json()["error"] == "Invalid request format. Expected JSON."

def test_server_error(mocker, client):
    """Simulate a server error during pet registration."""
    mocker.patch("registrationpet.insert_pet", side_effect=Exception("Database error"))

    payload = {
        "petName": "Bella",
        "ownerEmail": "user@example.com",
        "type": "Dog",
        "gender": "Female"
    }

    response = client.post('/register-pet', data=json.dumps(payload), content_type='application/json')

    assert response.status_code == 500
    assert "error" in response.get_json()
    assert "Database error" in response.get_json()["error"]
