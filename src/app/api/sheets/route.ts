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

    // Format the private key properly
    const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY
      .replace(/\\n/g, '\n')
      .replace(/"/g, '')
      .trim();

    // Ensure the private key has the correct format
    if (!privateKey.startsWith('-----BEGIN PRIVATE KEY-----')) {
      throw new Error('Private key is not properly formatted');
    }

    console.log('Private key format check:', {
      hasNewlines: privateKey.includes('\n'),
      hasQuotes: privateKey.includes('"'),
      length: privateKey.length,
      startsWithCorrectHeader: privateKey.startsWith('-----BEGIN PRIVATE KEY-----'),
      endsWithCorrectFooter: privateKey.endsWith('-----END PRIVATE KEY-----')
    });

    // Initialize the Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: privateKey,
        project_id: process.env.GOOGLE_SHEETS_PROJECT_ID,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    console.log('Attempting to fetch spreadsheet data...');
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
      range: process.env.GOOGLE_SHEETS_RANGE || 'Sheet1!A2:D',
    });

    console.log('Spreadsheet data received:', {
      hasValues: !!response.data.values,
      rowCount: response.data.values?.length || 0
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: 'No data found' }, { 
        status: 404,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      });
    }

    // Transform the data to match your dashboard structure
    const metrics = {
      MQLs: { current: 0, target: 0 },
      SQLs: { current: 0, target: 0 },
      SQOs: { current: 0, target: 0 },
      CWDs: { current: 0, target: 0 },
    };

    const channelMetrics = {
      MQLs: {
        'Paid Channels': { current: 0, target: 0 },
        'Referral Channels': { current: 0, target: 0 },
        'Organic & Other': { current: 0, target: 0 },
      },
      SQLs: {
        'Paid Channels': { current: 0, target: 0 },
        'Referral Channels': { current: 0, target: 0 },
        'Organic & Other': { current: 0, target: 0 },
      },
      SQOs: {
        'Paid Channels': { current: 0, target: 0 },
        'Referral Channels': { current: 0, target: 0 },
        'Organic & Other': { current: 0, target: 0 },
      },
      CWDs: {
        'Paid Channels': { current: 0, target: 0 },
        'Referral Channels': { current: 0, target: 0 },
        'Organic & Other': { current: 0, target: 0 },
      },
    };

    // Process the rows
    rows.forEach((row) => {
      const [metric, current, target] = row;
      
      // Process main metrics
      if (metrics[metric as keyof typeof metrics]) {
        metrics[metric as keyof typeof metrics] = {
          current: parseInt(current) || 0,
          target: parseInt(target) || 0,
        };
      }
      
      // Process channel metrics
      const [parentMetric, channel] = metric.split(' - ');
      if (channelMetrics[parentMetric as keyof typeof channelMetrics] && 
          channelMetrics[parentMetric as keyof typeof channelMetrics][channel as keyof typeof channelMetrics.MQLs]) {
        channelMetrics[parentMetric as keyof typeof channelMetrics][channel as keyof typeof channelMetrics.MQLs] = {
          current: parseInt(current) || 0,
          target: parseInt(target) || 0,
        };
      }
    });

    return NextResponse.json({ metrics, channelMetrics }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  } catch (error) {
    console.error('Error in Google Sheets API:', error);
    
    // Log more details about the error
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      
      // Additional error details for Google API errors
      if ('code' in error) {
        console.error('Error code:', (error as any).code);
      }
      if ('response' in error) {
        console.error('Error response:', (error as any).response?.data);
      }
    }

    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to fetch data from Google Sheets',
        details: error instanceof Error ? error.stack : undefined
      },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      }
    );
  }
} 