# BookIt Backend

This is the backend for BookIt: Experiences & Slots.

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Configure environment**
   Copy `.env.example` to `.env` and fill in your MongoDB URI.

3. **Seed database**
   ```bash
   npm run seed
   ```

4. **Run server (dev mode):**
   ```bash
   npm run dev
   ```

## API Endpoints

- `GET /experiences` – List all experiences
- `GET /experiences/:id` – Experience details and slot availability
- `POST /bookings` – Place new booking (prevents double booking)
- `POST /promo/validate` – Validate promo code

## Deployment

- Set up MongoDB Atlas or compatible DB
- Set environment variables on your hosting platform (Render, Railway, etc.)
