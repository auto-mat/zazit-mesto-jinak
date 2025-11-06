// Mock login data for testing and development

// Mock JWT tokens (format: header.payload.signature)
// These are example tokens, not real JWT tokens
// Access token expires in 1 year from now (exp: 1793968287 = 2026-11-06)
const mockAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImpvaG4ubm92YWsiLCJlbWFpbCI6ImpvaG4ubm92YWtAZW1haWwuY29tIiwiZXhwIjoxNzkzOTY4Mjg3fQ.mock_access_token_signature'
// Refresh token expires in 1 year from now (exp: 1793968287 = 2026-11-06)
const mockRefreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc5Mzk2ODI4N30.mock_refresh_token_signature'

// Mock user data
export const mockUser = {
  pk: 1,
  username: 'john.novak',
  email: 'john.novak@email.com',
  first_name: 'John',
  last_name: 'Novak',
}

export const mockUser2 = {
  pk: 2,
  username: 'helena.nova',
  email: 'helena.nova@email.com',
  first_name: 'Helena',
  last_name: 'Nova',
}

export const mockUser3 = {
  pk: 3,
  username: 'karel.novy',
  email: 'karel.novy@email.com',
  first_name: 'Karel',
  last_name: 'Novy',
}

// Mock login response
export const mockLoginResponse = {
  access: mockAccessToken,
  refresh: mockRefreshToken,
  user: mockUser,
}

export const mockLoginResponse2 = {
  access: mockAccessToken,
  refresh: mockRefreshToken,
  user: mockUser2,
}

export const mockLoginResponse3 = {
  access: mockAccessToken,
  refresh: mockRefreshToken,
  user: mockUser3,
}

// Mock refresh token response
// Access token with expiration in 1 hour (3600 seconds from now)
const futureExpiration = Math.floor(Date.now() / 1000) + 3600
const mockAccessTokenWithExpiration = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImpvaG4ubm92YWsiLCJlbWFpbCI6ImpvaG4ubm92YWtAZW1haWwuY29tIiwiZXhwIj${futureExpiration}fQ.mock_access_token_signature`

export const mockRefreshTokenResponse = {
  access: mockAccessTokenWithExpiration,
  access_expiration: new Date(futureExpiration * 1000).toISOString(),
}

// Mock password reset response
export const mockPasswordResetResponse = {
  detail: 'Password reset e-mail has been sent.',
}

// Mock login payloads for testing
export const mockLoginPayload = {
  username: 'john.novak',
  password: 'password123',
}

export const mockLoginPayload2 = {
  username: 'helena.nova',
  password: 'password456',
}

// Helper function to get mock login response by username
export const getMockLoginResponse = (username) => {
  const responses = {
    'john.novak': mockLoginResponse,
    'helena.nova': mockLoginResponse2,
    'karel.novy': mockLoginResponse3,
  }
  return responses[username] || mockLoginResponse
}

// Helper function to validate mock login payload
export const validateMockLogin = (payload) => {
  const validCredentials = {
    'john.novak': 'password123',
    'helena.nova': 'password456',
    'karel.novy': 'password789',
  }

  return validCredentials[payload.username] === payload.password
}

