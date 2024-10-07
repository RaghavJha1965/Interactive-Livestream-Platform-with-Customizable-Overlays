import axios from 'axios';

const API_URL = 'https://interactive-livestream-platform-with.onrender.com';

export const createOverlay = (overlayData) => axios.post(`${API_URL}/overlay`, overlayData);

export const getOverlays = () => axios.get(`${API_URL}/overlay`);

export const updateOverlay = (id, overlayData) => axios.put(`${API_URL}/overlay/${id}`, overlayData);

export const deleteOverlay = (id) => axios.delete(`${API_URL}/overlay/${id}`);
