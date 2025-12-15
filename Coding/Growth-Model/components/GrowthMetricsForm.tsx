'use client'

import { useState, useEffect } from 'react'
import {
  Box,
  Heading,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  HStack,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Card,
  CardHeader,
  CardBody,
} from '@chakra-ui/react'
import { GrowthMetricsFormProps, GrowthData } from '../types/types'

const GrowthMetricsForm: React.FC<GrowthMetricsFormProps> = ({ growthData, onUpdate }) => {
  const [formData, setFormData] = useState<GrowthData>(growthData)
  const [monthCompletion, setMonthCompletion] = useState<number>(0)

  useEffect(() => {
    setFormData(growthData)
  }, [growthData])

  useEffect(() => {
    const calculateMonthCompletion = (): number => {
      const today = new Date();
      const currentDay = today.getDate();
      const totalDays = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
      return Math.round((currentDay / totalDays) * 100);
    }
    
    setMonthCompletion(calculateMonthCompletion());
  }, []);

  const handlePrimaryKPIChange = (field: keyof typeof formData.primaryKPIs, value: number) => {
    setFormData({
      ...formData,
      primaryKPIs: {
        ...formData.primaryKPIs,
        [field]: value
      }
    })
  }

  const handleLockedForecastChange = (field: keyof typeof formData.primaryKPIs.lockedForecasts, value: number) => {
    setFormData({
      ...formData,
      primaryKPIs: {
        ...formData.primaryKPIs,
        lockedForecasts: {
          ...formData.primaryKPIs.lockedForecasts,
          [field]: value
        }
      }
    })
  }

  const handleChannelMetricChange = (
    channel: keyof typeof formData.channels,
    metric: keyof typeof formData.channels.paid,
    field: 'locked' | 'percentage',
    value: number
  ) => {
    setFormData({
      ...formData,
      channels: {
        ...formData.channels,
        [channel]: {
          ...formData.channels[channel],
          [metric]: {
            ...formData.channels[channel][metric],
            [field]: value
          }
        }
      }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate(formData)
  }

  const renderChannelMetricsInputs = (channel: keyof typeof formData.channels) => {
    return (
      <VStack spacing={4} align="start" width="100%">
        <Card width="100%">
          <CardHeader bg="gray.700" color="white" borderTopRadius="md">
            <Heading size="md">MQLs</Heading>
          </CardHeader>
          <CardBody>
            <Grid templateColumns="1fr 1fr" gap={4}>
              <GridItem>
                <FormControl>
                  <FormLabel>Locked Forecast</FormLabel>
                  <Input
                    type="number"
                    value={formData.channels[channel].mqls.locked}
                    onChange={(e) => handleChannelMetricChange(channel, 'mqls', 'locked', Number(e.target.value))}
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel>% of locked forecast</FormLabel>
                  <Input
                    type="number"
                    value={formData.channels[channel].mqls.percentage}
                    onChange={(e) => handleChannelMetricChange(channel, 'mqls', 'percentage', Number(e.target.value))}
                    max={100}
                    min={0}
                  />
                </FormControl>
              </GridItem>
            </Grid>
          </CardBody>
        </Card>

        <Card width="100%">
          <CardHeader bg="gray.700" color="white" borderTopRadius="md">
            <Heading size="md">SQLs</Heading>
          </CardHeader>
          <CardBody>
            <Grid templateColumns="1fr 1fr" gap={4}>
              <GridItem>
                <FormControl>
                  <FormLabel>Locked Forecast</FormLabel>
                  <Input
                    type="number"
                    value={formData.channels[channel].sqls.locked}
                    onChange={(e) => handleChannelMetricChange(channel, 'sqls', 'locked', Number(e.target.value))}
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel>% of locked forecast</FormLabel>
                  <Input
                    type="number"
                    value={formData.channels[channel].sqls.percentage}
                    onChange={(e) => handleChannelMetricChange(channel, 'sqls', 'percentage', Number(e.target.value))}
                    max={100}
                    min={0}
                  />
                </FormControl>
              </GridItem>
            </Grid>
          </CardBody>
        </Card>

        <Card width="100%">
          <CardHeader bg="gray.700" color="white" borderTopRadius="md">
            <Heading size="md">SQOs</Heading>
          </CardHeader>
          <CardBody>
            <Grid templateColumns="1fr 1fr" gap={4}>
              <GridItem>
                <FormControl>
                  <FormLabel>Locked Forecast</FormLabel>
                  <Input
                    type="number"
                    value={formData.channels[channel].sqos.locked}
                    onChange={(e) => handleChannelMetricChange(channel, 'sqos', 'locked', Number(e.target.value))}
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel>% of locked forecast</FormLabel>
                  <Input
                    type="number"
                    value={formData.channels[channel].sqos.percentage}
                    onChange={(e) => handleChannelMetricChange(channel, 'sqos', 'percentage', Number(e.target.value))}
                    max={100}
                    min={0}
                  />
                </FormControl>
              </GridItem>
            </Grid>
          </CardBody>
        </Card>

        <Card width="100%">
          <CardHeader bg="gray.700" color="white" borderTopRadius="md">
            <Heading size="md">CWDs</Heading>
          </CardHeader>
          <CardBody>
            <Grid templateColumns="1fr 1fr" gap={4}>
              <GridItem>
                <FormControl>
                  <FormLabel>Locked Forecast</FormLabel>
                  <Input
                    type="number"
                    value={formData.channels[channel].cwds.locked}
                    onChange={(e) => handleChannelMetricChange(channel, 'cwds', 'locked', Number(e.target.value))}
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel>% of locked forecast</FormLabel>
                  <Input
                    type="number"
                    value={formData.channels[channel].cwds.percentage}
                    onChange={(e) => handleChannelMetricChange(channel, 'cwds', 'percentage', Number(e.target.value))}
                    max={100}
                    min={0}
                  />
                </FormControl>
              </GridItem>
            </Grid>
          </CardBody>
        </Card>
      </VStack>
    )
  }

  const renderLockedForecasts = () => {
    return (
      <Card width="100%" mb={8}>
        <CardHeader bg="gray.800" color="white" borderTopRadius="md">
          <Heading size="md">Locked Forecasts (Reference Goals)</Heading>
        </CardHeader>
        <CardBody>
          <Grid templateColumns="repeat(4, 1fr)" gap={6}>
            <GridItem>
              <FormControl>
                <FormLabel>MQLs</FormLabel>
                <Input
                  type="number"
                  value={formData.primaryKPIs.lockedForecasts.mqls}
                  onChange={(e) => handleLockedForecastChange('mqls', Number(e.target.value))}
                />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl>
                <FormLabel>SQLs</FormLabel>
                <Input
                  type="number"
                  value={formData.primaryKPIs.lockedForecasts.sqls}
                  onChange={(e) => handleLockedForecastChange('sqls', Number(e.target.value))}
                />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl>
                <FormLabel>SQOs</FormLabel>
                <Input
                  type="number"
                  value={formData.primaryKPIs.lockedForecasts.sqos}
                  onChange={(e) => handleLockedForecastChange('sqos', Number(e.target.value))}
                />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl>
                <FormLabel>CWDs</FormLabel>
                <Input
                  type="number"
                  value={formData.primaryKPIs.lockedForecasts.cwds}
                  onChange={(e) => handleLockedForecastChange('cwds', Number(e.target.value))}
                />
              </FormControl>
            </GridItem>
          </Grid>
        </CardBody>
      </Card>
    )
  }

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <Heading as="h2" size="lg" mb={6}>Growth Metrics Input</Heading>
      
      <Box mb={4} p={3} borderWidth="1px" borderRadius="md">
        <Text fontWeight="bold">Month Completion: {monthCompletion}%</Text>
        <Text fontSize="sm" color="gray.600">
          Percentages of goal higher than month completion will be highlighted in green, lower in red.
        </Text>
      </Box>
      
      <Card mb={8}>
        <CardHeader bg="gray.800" color="white" borderTopRadius="md">
          <Heading size="md">Primary KPIs</Heading>
        </CardHeader>
        <CardBody>
          <Grid templateColumns="repeat(4, 1fr)" gap={6}>
            <GridItem>
              <FormControl>
                <FormLabel>MQLs</FormLabel>
                <Input
                  type="number"
                  value={formData.primaryKPIs.mqls}
                  onChange={(e) => handlePrimaryKPIChange('mqls', Number(e.target.value))}
                />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl>
                <FormLabel>% of goal</FormLabel>
                <Input
                  type="number"
                  value={formData.primaryKPIs.lockedForecasts.mqls > 0 
                    ? Math.round((formData.primaryKPIs.mqls / formData.primaryKPIs.lockedForecasts.mqls) * 100) 
                    : 0}
                  isReadOnly
                  bg={formData.primaryKPIs.lockedForecasts.mqls > 0 
                    ? (Math.round((formData.primaryKPIs.mqls / formData.primaryKPIs.lockedForecasts.mqls) * 100) >= monthCompletion 
                      ? "green.100" 
                      : "red.100") 
                    : "gray.100"}
                />
              </FormControl>
            </GridItem>
            
            <GridItem>
              <FormControl>
                <FormLabel>SQLs</FormLabel>
                <Input
                  type="number"
                  defaultValue={formData.primaryKPIs.lockedForecasts.sqls > 0 
                    ? Math.round((formData.primaryKPIs.sqlsPercentage / 100) * formData.primaryKPIs.lockedForecasts.sqls)
                    : 0}
                  onChange={(e) => {
                    const actualValue = Number(e.target.value);
                    if (isNaN(actualValue)) return;
                    
                    const percentage = formData.primaryKPIs.lockedForecasts.sqls > 0
                      ? Math.round((actualValue / formData.primaryKPIs.lockedForecasts.sqls) * 100)
                      : 0;
                    
                    handlePrimaryKPIChange('sqlsPercentage', percentage);
                  }}
                />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl>
                <FormLabel>% of goal</FormLabel>
                <Input
                  type="number"
                  value={formData.primaryKPIs.sqlsPercentage}
                  isReadOnly
                  bg={formData.primaryKPIs.sqlsPercentage >= monthCompletion ? "green.100" : "red.100"}
                />
              </FormControl>
            </GridItem>
            
            <GridItem>
              <FormControl>
                <FormLabel>SQOs</FormLabel>
                <Input
                  type="number"
                  defaultValue={formData.primaryKPIs.lockedForecasts.sqos > 0
                    ? Math.round((formData.primaryKPIs.sqosPercentage / 100) * formData.primaryKPIs.lockedForecasts.sqos)
                    : 0}
                  onChange={(e) => {
                    const actualValue = Number(e.target.value);
                    if (isNaN(actualValue)) return;
                    
                    const percentage = formData.primaryKPIs.lockedForecasts.sqos > 0
                      ? Math.round((actualValue / formData.primaryKPIs.lockedForecasts.sqos) * 100)
                      : 0;
                    
                    handlePrimaryKPIChange('sqosPercentage', percentage);
                  }}
                />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl>
                <FormLabel>% of goal</FormLabel>
                <Input
                  type="number"
                  value={formData.primaryKPIs.sqosPercentage}
                  isReadOnly
                  bg={formData.primaryKPIs.sqosPercentage >= monthCompletion ? "green.100" : "red.100"}
                />
              </FormControl>
            </GridItem>
            
            <GridItem>
              <FormControl>
                <FormLabel>CWDs</FormLabel>
                <Input
                  type="number"
                  defaultValue={formData.primaryKPIs.lockedForecasts.cwds > 0
                    ? Math.round((formData.primaryKPIs.cwdsPercentage / 100) * formData.primaryKPIs.lockedForecasts.cwds)
                    : 0}
                  onChange={(e) => {
                    const actualValue = Number(e.target.value);
                    if (isNaN(actualValue)) return;
                    
                    const percentage = formData.primaryKPIs.lockedForecasts.cwds > 0
                      ? Math.round((actualValue / formData.primaryKPIs.lockedForecasts.cwds) * 100)
                      : 0;
                    
                    handlePrimaryKPIChange('cwdsPercentage', percentage);
                  }}
                />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl>
                <FormLabel>% of goal</FormLabel>
                <Input
                  type="number"
                  value={formData.primaryKPIs.cwdsPercentage}
                  isReadOnly
                  bg={formData.primaryKPIs.cwdsPercentage >= monthCompletion ? "green.100" : "red.100"}
                />
              </FormControl>
            </GridItem>
          </Grid>
        </CardBody>
      </Card>
      
      <Tabs variant="enclosed" colorScheme="blue" mb={8}>
        <TabList>
          <Tab>Paid Channels</Tab>
          <Tab>Referral Channels</Tab>
          <Tab>Organic & Other</Tab>
        </TabList>
        
        <TabPanels>
          <TabPanel>
            {renderChannelMetricsInputs('paid')}
          </TabPanel>
          <TabPanel>
            {renderChannelMetricsInputs('referral')}
          </TabPanel>
          <TabPanel>
            {renderChannelMetricsInputs('organic')}
          </TabPanel>
        </TabPanels>
      </Tabs>
      
      {renderLockedForecasts()}
      
      <Button type="submit" colorScheme="blue" size="lg">
        Update Growth Metrics
      </Button>
    </Box>
  )
}

export default GrowthMetricsForm 