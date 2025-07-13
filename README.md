# Distributed Task Queue Image Resizer

A scalable, asynchronous image processing system built using **Node.js**, **Express**, **BullMQ**, **Redis**, **MongoDB**, and **Sharp**.

This project demonstrates a **distributed task queue architecture** where image uploads are handled via a REST API and processed in the background by a worker service.

---

## Tech Stack

- **Node.js + Express** — REST API for image upload and status
- **BullMQ + Redis** — Background job queue and task processing
- **MongoDB** — Track job state (`queued`, `in-progress`, `completed`, `failed`)
- **Sharp** — High-performance image resizing
- **Multer** — Handle image uploads
- **ESM Modules** — Clean modular structure using `type: module`

---

## Features

1. Upload image via API
2. Queue processing via Redis (non-blocking, async)
3. Background worker resizes the image
4. Real-time job status tracking via MongoDB
5. Easily scalable by adding more workers

## How to run and test:
1. Clone the repository
2. Run `npm i` in the terminal
3. Add your own .env file
4. Run the redis server: `sudo service redis-server start`
5. Run on terminal: `npm start`
6. Run on another terminal `node workers/imageWorkers.js`

## Endpoints:
POST `http://localhost:9300/job/upload-image` : 
      Headers: multipart/form-data
      Body: (key:image), file, value: input your image

GET `http://localhost:9300/job/status/<jobId>`
### Note: you will get job id from the response of the post endpoint

