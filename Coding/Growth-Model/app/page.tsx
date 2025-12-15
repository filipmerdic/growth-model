'use client'

import { useState, useEffect } from 'react'
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  Select, 
  Grid, 
  GridItem,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Button,
  useToast
} from '@chakra-ui/react'
import { format, getDaysInMonth, getDate } from 'date-fns'
import GrowthMetricsForm from '../components/GrowthMetricsForm'
import MetricsDisplay from '../components/MetricsDisplay'
import { GrowthData } from '../types/types'

export default function Home() {
  const toast = useToast()
  
  // Calculate month completion percentage based on current date
  const calculateMonthCompletion = (): number => {
    const today = new Date();
    const currentDay = getDate(today);
    const totalDays = getDaysInMonth(today);
    return Math.round((currentDay / totalDays) * 100);
  }

  const [monthCompletion, setMonthCompletion] = useState<number>(calculateMonthCompletion())
  const [selectedMonth, setSelectedMonth] = useState<string>("March 2025")
  
  // Update month completion whenever the component renders
  useEffect(() => {
    setMonthCompletion(calculateMonthCompletion());
  }, []);

  const [growthData, setGrowthData] = useState<GrowthData>({
    primaryKPIs: {
      mqls: 0,
      sqlsPercentage: 0,
      sqosPercentage: 0,
      cwdsPercentage: 0,
      lockedForecasts: {
        mqls: 985, // Sum of all channel MQLs (399 + 110 + 476)
        sqls: 402, // Sum of all channel SQLs (190 + 61 + 151)
        sqos: 209, // Sum of all channel SQOs (74 + 43 + 92)
        cwds: 100  // Example value for CWDs
      }
    },
    channels: {
      paid: {
        mqls: { locked: 399, percentage: 0 },
        sqls: { locked: 190, percentage: 0 },
        sqos: { locked: 74, percentage: 0 },
        cwds: { locked: 0, percentage: 0 }
      },
      referral: {
        mqls: { locked: 110, percentage: 0 },
        sqls: { locked: 61, percentage: 0 },
        sqos: { locked: 43, percentage: 0 },
        cwds: { locked: 0, percentage: 0 }
      },
      organic: {
        mqls: { locked: 476, percentage: 0 },
        sqls: { locked: 151, percentage: 0 },
        sqos: { locked: 92, percentage: 0 },
        cwds: { locked: 0, percentage: 0 }
      }
    }
  })

  const handleDataUpdate = (newData: GrowthData) => {
    setGrowthData(newData)
    toast({
      title: "Data updated",
      description: "Your growth metrics have been updated successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    })
  }

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]
  
  const years = [2024, 2025, 2026, 2027, 2028]
  
  const monthOptions = years.flatMap(year => 
    months.map(month => `${month} ${year}`)
  )

  return (
    <Container maxW="container.xl" py={8}>
      <Box className="draft-banner">DRAFT - DO NOT USE YET</Box>
      
      <Box className="header">
        <Grid templateColumns="repeat(2, 1fr)" gap={6} alignItems="center">
          <GridItem>
            <Heading as="h1" size="xl">Growth Model Dashboard</Heading>
          </GridItem>
          <GridItem textAlign="right">
            <HStack justifyContent="flex-end" alignItems="center">
              <Text fontSize="xl" fontWeight="bold">Month Completion:</Text>
              <Heading as="h1" size="xl" display="inline">{monthCompletion}%</Heading>
            </HStack>
          </GridItem>
        </Grid>
        
        <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={4}>
          <GridItem>
            <Text>Last Updated: {format(new Date(), 'MMMM d, yyyy')}</Text>
          </GridItem>
        </Grid>
      </Box>
      
      <Box className="month-selector" mt={8}>
        <FormControl>
          <FormLabel>Month to analyze</FormLabel>
          <Select 
            value={selectedMonth} 
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {monthOptions.map((month) => (
              <option key={month} value={month}>{month}</option>
            ))}
          </Select>
        </FormControl>
      </Box>
      
      <Grid templateColumns="repeat(1, 1fr)" gap={8}>
        <GridItem>
          <MetricsDisplay 
            growthData={growthData} 
            monthCompletion={monthCompletion}
            selectedMonth={selectedMonth}
          />
        </GridItem>
        
        <GridItem>
          <GrowthMetricsForm 
            growthData={growthData} 
            onUpdate={handleDataUpdate} 
          />
        </GridItem>
      </Grid>
    </Container>
  )
} 