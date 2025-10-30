# BookIt: Experiences & Slots (Temp README)

## Prerequisites
- Node.js 18+
- NPM (comes with Node)
- MongoDB Atlas account (free, cloud DB)

## 1. Clone & Directory Structure
The project is split into:
- `/bookit-backend` : Express.js server, MongoDB
- `/bookit-frontend` : React.js frontend (Vite + TailwindCSS)

Both must be in the same parent folder!

## 2. Backend Setup
```bash
cd bookit-backend
npm install
# Create .env file (see .env.example) and add your MongoDB URI
# Example .env:
# MONGO_URI=mongodb+srv://YOUR_USER:YOUR_PASS@cluster0.xxxxx.mongodb.net/bookit?retryWrites=true&w=majority
# PORT=5000
npm run seed # <== (optional) Seed demo data (experiences, promos)
npm run dev   # Starts server at http://localhost:5000
```
Server will auto-reload on changes.

## 3. Frontend Setup
```bash
cd bookit-frontend
npm install
npm run dev
```
It will print a local address, usually http://localhost:5173

## 4. Typical Local Flow
1. Open browser to frontend (http://localhost:5173)
2. Book experiences, apply promo codes, test full flow.

## 5. Common Issues
- **Mongo error:** Check your `.env` file and make sure MONGO_URI is correct, and your IP is whitelisted in MongoDB Atlas.
- **Port in use:** Change the `PORT` in backend `.env` and update API URLs in frontend as needed.

## 6. Production Deployment
- Deploy backend (Render/Railway/etc), frontend (Vercel/Netlify).
- Update API URLs in frontend to point to deployed backend.

## 7. Troubleshooting
- If slot booking errors appear, another user has booked that slot. Try a different time/date.
- Use browser dev tools and Node logs for live debugging.

---
**This project is fullstack, mobile-friendly, and ready for demonstration or extension!**
