import { google } from 'googleapis/build/src/index';
import { NextResponse } from 'next/server';

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

export async function GET() {
  try {
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    const range = process.env.GOOGLE_SHEETS_RANGE || 'Sheet1!A2:D'; // Adjust range as needed

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
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
    console.error('Error fetching Google Sheets data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data from Google Sheets' },
      { status: 500 }
    );
  }
} 