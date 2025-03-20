# Growth Dashboard

A dashboard application to track marketing performance metrics against monthly goals.

## Features

- Track 4 key marketing metrics: MQLs, SQLs, SQOs, and CWDs
- Set and update targets for each metric
- View progress as a percentage of the target
- Monitor current month progress
- Responsive design for desktop and mobile
- Data persists in local storage

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd growth-dashboard
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3131](http://localhost:3131) in your browser to see the dashboard

## Usage

### Viewing Metrics

The dashboard displays four key marketing metrics:
- MQLs
- SQLs
- SQOs
- CWDs

Each metric card shows:
- Current value
- Target value
- Progress as a percentage of the target

### Updating Metrics

1. Click the "Edit" button on any metric card
2. Enter the new current value and/or target value
3. Click "Save" to update the metric

### Month Progress

The Month Progress card shows how much of the current month has elapsed as a percentage.

### Resetting Data

Click the "Reset All Metrics" button in the header to reset all metrics to zero.

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- Chart.js
- date-fns

## License

This project is licensed under the MIT License.
