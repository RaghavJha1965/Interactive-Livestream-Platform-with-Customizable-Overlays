# Interactive-Livestream-Platform-with-Customizable-Overlays
### **API Documentation for Flask Backend**

#### **Base URL**: 
This is the base URL where the Flask backend is deployed, e.g., 
```
https://your-backend-url.com/
```

### **1. Create an Overlay**
- **Endpoint**: `POST /overlay`
- **Description**: This endpoint allows the creation of a new overlay with text, image, position, and size.
  
#### **Request:**
- **Method**: `POST`
- **Content-Type**: `application/json`
- **Body**:
```json
{
  "text": "Sample Text", 
  "image": "data:image/png;base64,iVBORw...", 
  "x": 100, 
  "y": 50, 
  "width": 200, 
  "height": 150
}
```
- **Field Descriptions**:
  - `text`: Text that will appear on the overlay.
  - `image`: A base64-encoded string for the image to be used as an overlay.
  - `x`: Initial x-coordinate of the overlay.
  - `y`: Initial y-coordinate of the overlay.
  - `width`: The width of the overlay.
  - `height`: The height of the overlay.

#### **Response:**
- **Status**: `201 Created`
- **Content-Type**: `application/json`
- **Response Body**:
```json
{
  "id": "overlay12345",
  "text": "Sample Text",
  "image": "data:image/png;base64,iVBORw...",
  "x": 100,
  "y": 50,
  "width": 200,
  "height": 150
}
```

---

### **2. Get All Overlays**
- **Endpoint**: `GET /overlay`
- **Description**: Retrieve all saved overlays from the database.

#### **Request:**
- **Method**: `GET`
- **No Request Body**

#### **Response:**
- **Status**: `200 OK`
- **Content-Type**: `application/json`
- **Response Body**:
```json
[
  {
    "id": "overlay12345",
    "text": "Sample Text",
    "image": "data:image/png;base64,iVBORw...",
    "x": 100,
    "y": 50,
    "width": 200,
    "height": 150
  },
  {
    "id": "overlay67890",
    "text": "Another Overlay",
    "image": null,
    "x": 150,
    "y": 75,
    "width": 250,
    "height": 175
  }
]
```

---

### **3. Update an Overlay**
- **Endpoint**: `PUT /overlay/<id>`
- **Description**: Update an existing overlay's position, size, or content.

#### **Request:**
- **Method**: `PUT`
- **Content-Type**: `application/json`
- **URL Parameters**: 
  - `id`: The unique ID of the overlay to update.
- **Body**:
```json
{
  "text": "Updated Text",
  "x": 200,
  "y": 100,
  "width": 300,
  "height": 200
}
```

#### **Response:**
- **Status**: `200 OK`
- **Content-Type**: `application/json`
- **Response Body**:
```json
{
  "id": "overlay12345",
  "text": "Updated Text",
  "x": 200,
  "y": 100,
  "width": 300,
  "height": 200
}
```

---

### **4. Delete an Overlay**
- **Endpoint**: `DELETE /overlay/<id>`
- **Description**: Deletes a specific overlay.

#### **Request:**
- **Method**: `DELETE`
- **URL Parameters**: 
  - `id`: The unique ID of the overlay to delete.
- **No Request Body**

#### **Response:**
- **Status**: `204 No Content`
- **No Response Body**

---

### **User Documentation**

#### **Setup Instructions**:

1. **Frontend (React) Setup**:
   - Make sure you have **Node.js** and **npm** installed.
   - Clone the repository and navigate to the frontend project directory.
     ```bash
     git clone https://github.com/your-repo-url
     cd livestream-overlay-app
     ```
   - Install the required dependencies:
     ```bash
     npm install
     ```
   - Update the API URL in `api.js` to point to the backend URL:
     ```javascript
     const API_URL = "https://your-backend-url.com";
     ```
   - Run the development server:
     ```bash
     npm run dev
     ```
   - To build the frontend for production, run:
     ```bash
     npm run build
     ```

2. **Backend (Flask) Setup**:
   - Ensure you have **Python 3** and **pip** installed.
   - Clone the repository and navigate to the backend directory.
     ```bash
     git clone https://github.com/your-repo-url
     cd backend
     ```
   - Create a virtual environment and activate it:
     ```bash
     python -m venv venv
     source venv/bin/activate  # On Windows: .\venv\Scripts\activate
     ```
   - Install the required dependencies:
     ```bash
     pip install -r requirements.txt
     ```
   - Start the Flask server:
     ```bash
     flask --app StreamPlay run
     ```
   - Your Flask app will run at `http://127.0.0.1:5000/`.

---

#### **How to Use the App**:

1. **Access the Frontend**:

2. **Input RTSP Stream URL**:
   - In the input field, enter the RTSP stream URL (e.g., `rtsp://your-rtsp-url`).

3. **Add Overlays**:
   - **Text Overlays**: Enter the text in the overlay input field and click **"Add Overlay"** to place the text on the video.
   - **Image Overlays**: Use the file input to upload an image that will be overlaid on the video.

4. **Manage Overlays**:
   - **Move and Resize**: Click and drag the overlay to reposition it. Use the bottom-right corner of the overlay to resize it.
   - **Delete Overlays**: Each overlay has a **"Delete"** button to remove it.

5. **Save and Retrieve Overlays**:
   - When an overlay is created, its position and size are saved automatically.
   - The next time the app loads, saved overlays will be fetched from the backend and applied to the video.

6. **Use Cases**:
   - This application can be used to monitor livestreams while adding custom annotations or graphics.
   - It's ideal for event streaming, live commentary, or security footage with added instructions or labels.
