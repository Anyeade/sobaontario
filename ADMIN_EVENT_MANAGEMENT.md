# Event Registration Management - Admin Guide

## Overview
The Event Registration Management system allows administrators to view, manage, and track all event registrations from SOBA Ontario members.

## Accessing the System
1. Login as an admin user
2. Navigate to the Admin Dashboard
3. Click on "Events" in the sidebar navigation or the "Event Registrations" card on the dashboard

## Features

### Dashboard Statistics
- **Total Registrations**: Shows the total number of event registrations across all events
- **Upcoming Events**: Shows the number of upcoming events (currently hardcoded to 3)
- **This Month**: Shows registrations made in the current month
- **Pending Review**: Shows registrations with "interested" status that need admin review

### Registration Management
- **View All Registrations**: See all event registrations in a table format
- **Filter by Event**: Filter registrations by specific events
- **Filter by Status**: Filter by registration status (interested, confirmed, cancelled)
- **Update Status**: Change registration status directly from the table
- **Delete Registrations**: Remove registrations if needed
- **Export to CSV**: Download registration data for external use

### Registration Statuses
- **Interested**: Member has expressed interest but not confirmed
- **Confirmed**: Registration is confirmed and member will attend
- **Cancelled**: Registration has been cancelled

## How Members Register
1. Members visit individual event pages (e.g., `/events/1`)
2. They click "Register Interest" button
3. System requires authentication
4. Registration is saved with "interested" status
5. Admin can then review and confirm registrations

## API Endpoints
- `GET /api/admin/event-registrations` - Fetch registrations with optional filters
- `GET /api/admin/event-registrations/stats` - Get registration statistics
- `PATCH /api/admin/event-registrations/[id]` - Update registration status
- `DELETE /api/admin/event-registrations/[id]` - Delete registration

## Database Schema
The system uses the `eventRegistrations` table with the following fields:
- `id`: Unique identifier
- `eventId`: ID of the event (matches hardcoded event IDs)
- `eventTitle`: Title of the event
- `memberEmail`: Email of the registered member
- `memberName`: Name of the registered member
- `memberId`: ID of the member (if available)
- `registrationDate`: When the registration was made
- `status`: Current status (interested/confirmed/cancelled)
- `notes`: Optional admin notes

## Security
- Only users with "admin" or "super_admin" roles can access the management system
- All API endpoints are protected with authentication checks
- Session validation is performed on each request

## Usage Tips
1. Regularly review "interested" registrations and confirm them
2. Use the export feature to create attendee lists for events
3. Update registration status to "confirmed" for verified attendees
4. Use "cancelled" status instead of deleting to maintain records
5. Add notes to registrations for additional context 