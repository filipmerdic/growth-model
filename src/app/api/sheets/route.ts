import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Log environment variables (excluding sensitive data)
    console.log('Checking environment variables:');
    console.log('CLIENT_EMAIL exists:', !!process.env.GOOGLE_SHEETS_CLIENT_EMAIL);
    console.log('PRIVATE_KEY exists:', !!process.env.GOOGLE_SHEETS_PRIVATE_KEY);
    console.log('PROJECT_ID exists:', !!process.env.GOOGLE_SHEETS_PROJECT_ID);
    console.log('SPREADSHEET_ID exists:', !!process.env.GOOGLE_SHEETS_SPREADSHEET_ID);
    console.log('RANGE exists:', !!process.env.GOOGLE_SHEETS_RANGE);

    if (!process.env.GOOGLE_SHEETS_CLIENT_EMAIL) {
      throw new Error('GOOGLE_SHEETS_CLIENT_EMAIL is not defined');
    }
    if (!process.env.GOOGLE_SHEETS_PRIVATE_KEY) {
      throw new Error('GOOGLE_SHEETS_PRIVATE_KEY is not defined');
    }
    if (!process.env.GOOGLE_SHEETS_PROJECT_ID) {
      throw new Error('GOOGLE_SHEETS_PROJECT_ID is not defined');
    }
    if (!process.env.GOOGLE_SHEETS_SPREADSHEET_ID) {
      throw new Error('GOOGLE_SHEETS_SPREADSHEET_ID is not defined');
    }

    // Initialize the Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        project_id: process.env.GOOGLE_SHEETS_PROJECT_ID,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
      range: process.env.GOOGLE_SHEETS_RANGE || 'Sheet1!A2:D',
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: 'No data found' }, { status: 404 });
    }

    // Transform the data to match your dashboard structure
    const metrics = {
      MQLs: { current: 0, target: 0 },
      SQLs: { current: 0, target: 0 },
      SQOs: { current: 0, target: 0 },
      CWDs: { current: 0, target: 0 },
    };

    // Assuming the sheet has columns: Metric, Current, Target
    rows.forEach((row) => {
      const [metric, current, target] = row;
      if (metrics[metric as keyof typeof metrics]) {
        metrics[metric as keyof typeof metrics] = {
          current: parseInt(current) || 0,
          target: parseInt(target) || 0,
        };
      }
    });

    return NextResponse.json(metrics);
  } catch (error) {
    console.error('Error in Google Sheets API:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch data from Google Sheets' },
      { status: 500 }
    );
  }
} 