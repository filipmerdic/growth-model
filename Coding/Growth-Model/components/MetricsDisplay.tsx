'use client'

import {
  Box,
  Heading,
  Grid,
  GridItem,
  Text,
  Card,
  CardHeader,
  CardBody,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Divider,
  VStack,
  HStack,
  Input,
  Flex,
} from '@chakra-ui/react'
import { MetricsDisplayProps } from '../types/types'
import { useState } from 'react'

const MetricsDisplay: React.FC<MetricsDisplayProps> = ({ 
  growthData, 
  monthCompletion,
  selectedMonth 
}) => {
  // State for editable values
  const [editableValues, setEditableValues] = useState({
    // Paid channels
    paidChannelsMqls: growthData.channels.paid.mqls.locked,
    paidChannelsSqls: growthData.channels.paid.sqls.locked,
    paidChannelsSqos: growthData.channels.paid.sqos.locked,
    paidChannelsCwds: growthData.channels.paid.cwds.locked,
    
    // Referral channels
    referralChannelsMqls: growthData.channels.referral.mqls.locked,
    referralChannelsSqls: growthData.channels.referral.sqls.locked,
    referralChannelsSqos: growthData.channels.referral.sqos.locked,
    referralChannelsCwds: growthData.channels.referral.cwds.locked,
    
    // Organic channels
    organicChannelsMqls: growthData.channels.organic.mqls.locked,
    organicChannelsSqls: growthData.channels.organic.sqls.locked,
    organicChannelsSqos: growthData.channels.organic.sqos.locked,
    organicChannelsCwds: growthData.channels.organic.cwds.locked,
  });

  const handleEditableChange = (field: string, value: string) => {
    setEditableValues({
      ...editableValues,
      [field]: value === '' ? 0 : parseInt(value, 10) || 0
    });
  };

  const formatPercentage = (value: number) => {
    return `${value}%`
  }

  // Calculate percentage of goal based on actual value and locked forecast
  const calculatePercentage = (actual: number, locked: number) => {
    if (locked === 0) return 0;
    return Math.round((actual / locked) * 100);
  }

  const renderPrimaryKPIs = () => {
    const { mqls, sqlsPercentage, sqosPercentage, cwdsPercentage, lockedForecasts } = growthData.primaryKPIs;
    
    // Calculate SQL, SQO, and CWD actual values based on percentages
    const sqlsActual = Math.round((sqlsPercentage / 100) * lockedForecasts.sqls);
    const sqosActual = Math.round((sqosPercentage / 100) * lockedForecasts.sqos);
    const cwdsActual = Math.round((cwdsPercentage / 100) * lockedForecasts.cwds);
    
    // Calculate MQL percentage
    const mqlsPercentage = calculatePercentage(mqls, lockedForecasts.mqls);

    return (
      <Card>
        <CardHeader bg="gray.800" color="white" borderTopRadius="md">
          <Heading size="md">Primary KPIs</Heading>
        </CardHeader>
        <CardBody>
          <Grid templateColumns="repeat(4, 1fr)" gap={6}>
            <GridItem>
              <Stat>
                <StatLabel>MQLs</StatLabel>
                <StatNumber>{mqls}</StatNumber>
              </Stat>
            </GridItem>
            <GridItem>
              <Stat>
                <StatLabel>% of goal</StatLabel>
                <StatNumber 
                  bg={mqlsPercentage >= monthCompletion ? "green.100" : "red.100"}
                  p={2}
                  borderRadius="md"
                >
                  {formatPercentage(mqlsPercentage)}
                </StatNumber>
              </Stat>
            </GridItem>
            
            <GridItem>
              <Stat>
                <StatLabel>SQLs</StatLabel>
                <StatNumber>{sqlsActual}</StatNumber>
              </Stat>
            </GridItem>
            <GridItem>
              <Stat>
                <StatLabel>% of goal</StatLabel>
                <StatNumber 
                  bg={sqlsPercentage >= monthCompletion ? "green.100" : "red.100"}
                  p={2}
                  borderRadius="md"
                >
                  {formatPercentage(sqlsPercentage)}
                </StatNumber>
              </Stat>
            </GridItem>
            
            <GridItem>
              <Stat>
                <StatLabel>SQOs</StatLabel>
                <StatNumber>{sqosActual}</StatNumber>
              </Stat>
            </GridItem>
            <GridItem>
              <Stat>
                <StatLabel>% of goal</StatLabel>
                <StatNumber 
                  bg={sqosPercentage >= monthCompletion ? "green.100" : "red.100"}
                  p={2}
                  borderRadius="md"
                >
                  {formatPercentage(sqosPercentage)}
                </StatNumber>
              </Stat>
            </GridItem>
            
            <GridItem>
              <Stat>
                <StatLabel>CWDs</StatLabel>
                <StatNumber>{cwdsActual}</StatNumber>
              </Stat>
            </GridItem>
            <GridItem>
              <Stat>
                <StatLabel>% of goal</StatLabel>
                <StatNumber 
                  bg={cwdsPercentage >= monthCompletion ? "green.100" : "red.100"}
                  p={2}
                  borderRadius="md"
                >
                  {formatPercentage(cwdsPercentage)}
                </StatNumber>
              </Stat>
            </GridItem>
          </Grid>
        </CardBody>
      </Card>
    )
  }

  const renderChannelMetrics = () => {
    return (
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        {/* MQLs Column */}
        <GridItem colSpan={1}>
          <Card height="100%">
            <CardHeader bg="gray.700" color="white" borderTopRadius="md">
              <Heading size="md">MQLs</Heading>
            </CardHeader>
            <CardBody>
              <VStack spacing={4} align="stretch">
                {/* Paid Channels */}
                <Box borderWidth="1px" borderRadius="md" p={4}>
                  <Flex justify="space-between" align="center" mb={3}>
                    <Text fontWeight="bold" fontSize="lg">Paid Channels</Text>
                    <Input 
                      value={editableValues.paidChannelsMqls}
                      onChange={(e) => handleEditableChange('paidChannelsMqls', e.target.value)}
                      size="sm"
                      width="80px"
                      textAlign="right"
                    />
                  </Flex>
                  <HStack justify="space-between" mb={3}>
                    <Text fontSize="md" color="gray.600">Locked Forecast</Text>
                    <Input 
                      value={growthData.channels.paid.mqls.locked}
                      size="sm"
                      width="80px"
                      textAlign="right"
                      isReadOnly
                    />
                  </HStack>
                  <HStack justify="space-between">
                    <Text fontSize="md" color="gray.600">% of locked forecast</Text>
                    <Text fontWeight="bold" fontSize="lg">{formatPercentage(growthData.channels.paid.mqls.percentage)}</Text>
                  </HStack>
                </Box>
                
                {/* Referral Channels */}
                <Box borderWidth="1px" borderRadius="md" p={4}>
                  <Flex justify="space-between" align="center" mb={3}>
                    <Text fontWeight="bold" fontSize="lg">Referral Channels</Text>
                    <Input 
                      value={editableValues.referralChannelsMqls}
                      onChange={(e) => handleEditableChange('referralChannelsMqls', e.target.value)}
                      size="sm"
                      width="80px"
                      textAlign="right"
                    />
                  </Flex>
                  <HStack justify="space-between" mb={3}>
                    <Text fontSize="md" color="gray.600">Locked Forecast</Text>
                    <Input 
                      value={growthData.channels.referral.mqls.locked}
                      size="sm"
                      width="80px"
                      textAlign="right"
                      isReadOnly
                    />
                  </HStack>
                  <HStack justify="space-between">
                    <Text fontSize="md" color="gray.600">% of locked forecast</Text>
                    <Text fontWeight="bold" fontSize="lg">{formatPercentage(growthData.channels.referral.mqls.percentage)}</Text>
                  </HStack>
                </Box>
                
                {/* Organic & Other */}
                <Box borderWidth="1px" borderRadius="md" p={4}>
                  <Flex justify="space-between" align="center" mb={3}>
                    <Text fontWeight="bold" fontSize="lg">Organic & Other</Text>
                    <Input 
                      value={editableValues.organicChannelsMqls}
                      onChange={(e) => handleEditableChange('organicChannelsMqls', e.target.value)}
                      size="sm"
                      width="80px"
                      textAlign="right"
                    />
                  </Flex>
                  <HStack justify="space-between" mb={3}>
                    <Text fontSize="md" color="gray.600">Locked Forecast</Text>
                    <Input 
                      value={growthData.channels.organic.mqls.locked}
                      size="sm"
                      width="80px"
                      textAlign="right"
                      isReadOnly
                    />
                  </HStack>
                  <HStack justify="space-between">
                    <Text fontSize="md" color="gray.600">% of locked forecast</Text>
                    <Text fontWeight="bold" fontSize="lg">{formatPercentage(growthData.channels.organic.mqls.percentage)}</Text>
                  </HStack>
                </Box>
              </VStack>
            </CardBody>
          </Card>
        </GridItem>

        {/* SQLs Column */}
        <GridItem colSpan={1}>
          <Card height="100%">
            <CardHeader bg="gray.700" color="white" borderTopRadius="md">
              <Heading size="md">SQLs</Heading>
            </CardHeader>
            <CardBody>
              <VStack spacing={4} align="stretch">
                {/* Paid Channels */}
                <Box borderWidth="1px" borderRadius="md" p={4}>
                  <Flex justify="space-between" align="center" mb={3}>
                    <Text fontWeight="bold" fontSize="lg">Paid Channels</Text>
                    <Input 
                      value={editableValues.paidChannelsSqls}
                      onChange={(e) => handleEditableChange('paidChannelsSqls', e.target.value)}
                      size="sm"
                      width="80px"
                      textAlign="right"
                    />
                  </Flex>
                  <HStack justify="space-between" mb={3}>
                    <Text fontSize="md" color="gray.600">Locked Forecast</Text>
                    <Input 
                      value={growthData.channels.paid.sqls.locked}
                      size="sm"
                      width="80px"
                      textAlign="right"
                      isReadOnly
                    />
                  </HStack>
                  <HStack justify="space-between">
                    <Text fontSize="md" color="gray.600">% of locked forecast</Text>
                    <Text fontWeight="bold" fontSize="lg">{formatPercentage(growthData.channels.paid.sqls.percentage)}</Text>
                  </HStack>
                </Box>
                
                {/* Referral Channels */}
                <Box borderWidth="1px" borderRadius="md" p={4}>
                  <Flex justify="space-between" align="center" mb={3}>
                    <Text fontWeight="bold" fontSize="lg">Referral Channels</Text>
                    <Input 
                      value={editableValues.referralChannelsSqls}
                      onChange={(e) => handleEditableChange('referralChannelsSqls', e.target.value)}
                      size="sm"
                      width="80px"
                      textAlign="right"
                    />
                  </Flex>
                  <HStack justify="space-between" mb={3}>
                    <Text fontSize="md" color="gray.600">Locked Forecast</Text>
                    <Input 
                      value={growthData.channels.referral.sqls.locked}
                      size="sm"
                      width="80px"
                      textAlign="right"
                      isReadOnly
                    />
                  </HStack>
                  <HStack justify="space-between">
                    <Text fontSize="md" color="gray.600">% of locked forecast</Text>
                    <Text fontWeight="bold" fontSize="lg">{formatPercentage(growthData.channels.referral.sqls.percentage)}</Text>
                  </HStack>
                </Box>
                
                {/* Organic & Other */}
                <Box borderWidth="1px" borderRadius="md" p={4}>
                  <Flex justify="space-between" align="center" mb={3}>
                    <Text fontWeight="bold" fontSize="lg">Organic & Other</Text>
                    <Input 
                      value={editableValues.organicChannelsSqls}
                      onChange={(e) => handleEditableChange('organicChannelsSqls', e.target.value)}
                      size="sm"
                      width="80px"
                      textAlign="right"
                    />
                  </Flex>
                  <HStack justify="space-between" mb={3}>
                    <Text fontSize="md" color="gray.600">Locked Forecast</Text>
                    <Input 
                      value={growthData.channels.organic.sqls.locked}
                      size="sm"
                      width="80px"
                      textAlign="right"
                      isReadOnly
                    />
                  </HStack>
                  <HStack justify="space-between">
                    <Text fontSize="md" color="gray.600">% of locked forecast</Text>
                    <Text fontWeight="bold" fontSize="lg">{formatPercentage(growthData.channels.organic.sqls.percentage)}</Text>
                  </HStack>
                </Box>
              </VStack>
            </CardBody>
          </Card>
        </GridItem>

        {/* SQOs Column */}
        <GridItem colSpan={1}>
          <Card height="100%">
            <CardHeader bg="gray.700" color="white" borderTopRadius="md">
              <Heading size="md">SQOs</Heading>
            </CardHeader>
            <CardBody>
              <VStack spacing={4} align="stretch">
                {/* Paid Channels */}
                <Box borderWidth="1px" borderRadius="md" p={4}>
                  <Flex justify="space-between" align="center" mb={3}>
                    <Text fontWeight="bold" fontSize="lg">Paid Channels</Text>
                    <Input 
                      value={editableValues.paidChannelsSqos}
                      onChange={(e) => handleEditableChange('paidChannelsSqos', e.target.value)}
                      size="sm"
                      width="80px"
                      textAlign="right"
                    />
                  </Flex>
                  <HStack justify="space-between" mb={3}>
                    <Text fontSize="md" color="gray.600">Locked Forecast</Text>
                    <Input 
                      value={growthData.channels.paid.sqos.locked}
                      size="sm"
                      width="80px"
                      textAlign="right"
                      isReadOnly
                    />
                  </HStack>
                  <HStack justify="space-between">
                    <Text fontSize="md" color="gray.600">% of locked forecast</Text>
                    <Text fontWeight="bold" fontSize="lg">{formatPercentage(growthData.channels.paid.sqos.percentage)}</Text>
                  </HStack>
                </Box>
                
                {/* Referral Channels */}
                <Box borderWidth="1px" borderRadius="md" p={4}>
                  <Flex justify="space-between" align="center" mb={3}>
                    <Text fontWeight="bold" fontSize="lg">Referral Channels</Text>
                    <Input 
                      value={editableValues.referralChannelsSqos}
                      onChange={(e) => handleEditableChange('referralChannelsSqos', e.target.value)}
                      size="sm"
                      width="80px"
                      textAlign="right"
                    />
                  </Flex>
                  <HStack justify="space-between" mb={3}>
                    <Text fontSize="md" color="gray.600">Locked Forecast</Text>
                    <Input 
                      value={growthData.channels.referral.sqos.locked}
                      size="sm"
                      width="80px"
                      textAlign="right"
                      isReadOnly
                    />
                  </HStack>
                  <HStack justify="space-between">
                    <Text fontSize="md" color="gray.600">% of locked forecast</Text>
                    <Text fontWeight="bold" fontSize="lg">{formatPercentage(growthData.channels.referral.sqos.percentage)}</Text>
                  </HStack>
                </Box>
                
                {/* Organic & Other */}
                <Box borderWidth="1px" borderRadius="md" p={4}>
                  <Flex justify="space-between" align="center" mb={3}>
                    <Text fontWeight="bold" fontSize="lg">Organic & Other</Text>
                    <Input 
                      value={editableValues.organicChannelsSqos}
                      onChange={(e) => handleEditableChange('organicChannelsSqos', e.target.value)}
                      size="sm"
                      width="80px"
                      textAlign="right"
                    />
                  </Flex>
                  <HStack justify="space-between" mb={3}>
                    <Text fontSize="md" color="gray.600">Locked Forecast</Text>
                    <Input 
                      value={growthData.channels.organic.sqos.locked}
                      size="sm"
                      width="80px"
                      textAlign="right"
                      isReadOnly
                    />
                  </HStack>
                  <HStack justify="space-between">
                    <Text fontSize="md" color="gray.600">% of locked forecast</Text>
                    <Text fontWeight="bold" fontSize="lg">{formatPercentage(growthData.channels.organic.sqos.percentage)}</Text>
                  </HStack>
                </Box>
              </VStack>
            </CardBody>
          </Card>
        </GridItem>

        {/* CWDs Column */}
        <GridItem colSpan={1}>
          <Card height="100%">
            <CardHeader bg="gray.700" color="white" borderTopRadius="md">
              <Heading size="md">CWDs</Heading>
            </CardHeader>
            <CardBody>
              <VStack spacing={4} align="stretch">
                {/* Paid Channels */}
                <Box borderWidth="1px" borderRadius="md" p={4}>
                  <Flex justify="space-between" align="center" mb={3}>
                    <Text fontWeight="bold" fontSize="lg">Paid Channels</Text>
                    <Input 
                      value={editableValues.paidChannelsCwds}
                      onChange={(e) => handleEditableChange('paidChannelsCwds', e.target.value)}
                      size="sm"
                      width="80px"
                      textAlign="right"
                    />
                  </Flex>
                  <HStack justify="space-between" mb={3}>
                    <Text fontSize="md" color="gray.600">Locked Forecast</Text>
                    <Input 
                      value={growthData.channels.paid.cwds.locked}
                      size="sm"
                      width="80px"
                      textAlign="right"
                      isReadOnly
                    />
                  </HStack>
                  <HStack justify="space-between">
                    <Text fontSize="md" color="gray.600">% of locked forecast</Text>
                    <Text fontWeight="bold" fontSize="lg">{formatPercentage(growthData.channels.paid.cwds.percentage)}</Text>
                  </HStack>
                </Box>
                
                {/* Referral Channels */}
                <Box borderWidth="1px" borderRadius="md" p={4}>
                  <Flex justify="space-between" align="center" mb={3}>
                    <Text fontWeight="bold" fontSize="lg">Referral Channels</Text>
                    <Input 
                      value={editableValues.referralChannelsCwds}
                      onChange={(e) => handleEditableChange('referralChannelsCwds', e.target.value)}
                      size="sm"
                      width="80px"
                      textAlign="right"
                    />
                  </Flex>
                  <HStack justify="space-between" mb={3}>
                    <Text fontSize="md" color="gray.600">Locked Forecast</Text>
                    <Input 
                      value={growthData.channels.referral.cwds.locked}
                      size="sm"
                      width="80px"
                      textAlign="right"
                      isReadOnly
                    />
                  </HStack>
                  <HStack justify="space-between">
                    <Text fontSize="md" color="gray.600">% of locked forecast</Text>
                    <Text fontWeight="bold" fontSize="lg">{formatPercentage(growthData.channels.referral.cwds.percentage)}</Text>
                  </HStack>
                </Box>
                
                {/* Organic & Other */}
                <Box borderWidth="1px" borderRadius="md" p={4}>
                  <Flex justify="space-between" align="center" mb={3}>
                    <Text fontWeight="bold" fontSize="lg">Organic & Other</Text>
                    <Input 
                      value={editableValues.organicChannelsCwds}
                      onChange={(e) => handleEditableChange('organicChannelsCwds', e.target.value)}
                      size="sm"
                      width="80px"
                      textAlign="right"
                    />
                  </Flex>
                  <HStack justify="space-between" mb={3}>
                    <Text fontSize="md" color="gray.600">Locked Forecast</Text>
                    <Input 
                      value={growthData.channels.organic.cwds.locked}
                      size="sm"
                      width="80px"
                      textAlign="right"
                      isReadOnly
                    />
                  </HStack>
                  <HStack justify="space-between">
                    <Text fontSize="md" color="gray.600">% of locked forecast</Text>
                    <Text fontWeight="bold" fontSize="lg">{formatPercentage(growthData.channels.organic.cwds.percentage)}</Text>
                  </HStack>
                </Box>
              </VStack>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    )
  }

  // Add a new function to render the locked forecasts section
  const renderLockedForecasts = () => {
    const { lockedForecasts } = growthData.primaryKPIs;
    
    return (
      <Card>
        <CardHeader bg="gray.800" color="white" borderTopRadius="md">
          <Heading size="md">Locked Forecasts (Reference Goals)</Heading>
        </CardHeader>
        <CardBody>
          <Grid templateColumns="repeat(4, 1fr)" gap={6}>
            <GridItem>
              <Stat>
                <StatLabel>MQLs</StatLabel>
                <StatNumber>{lockedForecasts.mqls}</StatNumber>
              </Stat>
            </GridItem>
            <GridItem>
              <Stat>
                <StatLabel>SQLs</StatLabel>
                <StatNumber>{lockedForecasts.sqls}</StatNumber>
              </Stat>
            </GridItem>
            <GridItem>
              <Stat>
                <StatLabel>SQOs</StatLabel>
                <StatNumber>{lockedForecasts.sqos}</StatNumber>
              </Stat>
            </GridItem>
            <GridItem>
              <Stat>
                <StatLabel>CWDs</StatLabel>
                <StatNumber>{lockedForecasts.cwds}</StatNumber>
              </Stat>
            </GridItem>
          </Grid>
        </CardBody>
      </Card>
    )
  }

  return (
    <Box>
      <Heading as="h2" size="lg" mb={6}>Growth Metrics Dashboard - {selectedMonth}</Heading>
      <Text mb={4}>Month Completion: {formatPercentage(monthCompletion)}</Text>
      
      <Box mb={8}>
        {renderPrimaryKPIs()}
      </Box>
      
      <Divider my={8} />
      
      <Box mb={8}>
        {renderChannelMetrics()}
      </Box>
      
      <Divider my={8} />
      
      <Box>
        {renderLockedForecasts()}
      </Box>
    </Box>
  )
}

export default MetricsDisplay 