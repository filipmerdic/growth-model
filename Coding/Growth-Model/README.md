# Growth Model Dashboard

A modern web application for tracking and analyzing growth metrics across different channels and KPIs.

## Features

- Track monthly completion percentages
- Set start and end dates for tracking periods
- Monitor primary KPIs (MQLs, SQLs, SQOs, CWDs)
- Track metrics across different channels:
  - Paid Channels
  - Referral Channels
  - Organic & Other
- Input and track locked forecasts and percentage completions
- Select specific months for analysis

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Chakra UI for styling
- date-fns for date handling
- Chart.js for data visualization

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/growth-model.git
cd growth-model
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3333](http://localhost:3333) in your browser to see the application

## Project Structure

- `/app` - Next.js app directory with pages and layouts
- `/components` - React components
- `/types` - TypeScript type definitions
- `/public` - Static assets

## Usage

1. Set the month completion percentage, start date, and end date
2. Select the month to analyze from the dropdown
3. Input your growth metrics in the form
4. View the updated dashboard with your metrics

## License

MIT 