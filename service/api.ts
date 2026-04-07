import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.1.5:8000/api/', // Thay đổi URL này thành URL của backend của bạn.
    // Nếu bạn chạy trên Android emulator, localhost trên thiết bị là 10.0.2.2, không phải 127.0.0.1.
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;