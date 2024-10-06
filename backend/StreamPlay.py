from flask import Flask, jsonify, request
from pymongo import MongoClient

app = Flask(__name__)

# Set up MongoDB connection
client = MongoClient("mongodb://localhost:27017/")
db = client['overlay_db']
overlays = db['overlays']

@app.route('/overlay', methods=['POST'])
def create_overlay():
    data = request.json
    # Insert overlay data into the collection
    overlays.insert_one(data)
    return jsonify({"message": "Overlay created"}), 201

@app.route('/overlay', methods=['GET'])
def get_overlays():
    # Get all overlays
    all_overlays = list(overlays.find({}, {'_id': False}))
    return jsonify(all_overlays), 200

@app.route('/overlay/<overlay_id>', methods=['PUT'])
def update_overlay(overlay_id):
    data = request.json
    # Update the overlay
    overlays.update_one({'id': overlay_id}, {'$set': data})
    return jsonify({"message": "Overlay updated"}), 200

@app.route('/overlay/<overlay_id>', methods=['DELETE'])
def delete_overlay(overlay_id):
    # Delete the overlay
    overlays.delete_one({'id': overlay_id})
    return jsonify({"message": "Overlay deleted"}), 200

if __name__ == '__main__':
    app.run(debug=True)
