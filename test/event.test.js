// const request = require('supertest');
// const app = require('../app'); // pastikan ini ekspor express app kamu

// describe('GET /api/events', () => {
//   it('should return status 200 and array of events', async () => {
//     const response = await request(app).get('/api/events');
//     expect(response.statusCode).toBe(200);
//     expect(Array.isArray(response.body)).toBe(true);
//   });
// });

const request = require('supertest');
const app = require('../app');
const Event = require('../models/Event');

describe('GET /api/events', () => {
  beforeAll(async () => {
    await Event.create([
      { 
        name: 'Konser Jazz', 
        date: new Date('2023-12-31'), 
        location: 'Jakarta',
        price: 200000,
        ticketsAvailable: 100
      },
      { 
        name: 'Tech Conference', 
        date: new Date('2023-11-15'), 
        location: 'Bandung',
        price: 500000,
        ticketsAvailable: 50
      }
    ]);
  });

  afterAll(async () => {
    // Clean up
    await Event.deleteMany();
  });

  it('should return status 200 and array of events', async () => {
    const response = await request(app).get('/api/events');
    
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(2);
  });

  it('should return correct event structure', async () => {
    const response = await request(app).get('/api/events');
    
    expect(response.body[0]).toEqual(
      expect.objectContaining({
        name: expect.any(String),
        location: expect.any(String),
        price: expect.any(Number),
        ticketsAvailable: expect.any(Number)
      })
    );
  });

  it('should return empty array when no events exist', async () => {
    await Event.deleteMany();
    const response = await request(app).get('/api/events');
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });
});