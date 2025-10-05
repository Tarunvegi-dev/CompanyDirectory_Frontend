import { Alert, AlertIcon, Badge, Box, Card, CardBody, CardHeader, Flex, Heading, Icon, SimpleGrid, Text, VStack, Spinner } from '@chakra-ui/react';
import { FaIndustry, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

const CompanyList = ({ companies, loadMore, hasMore, totalResults }) => {

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && hasMore) {
      loadMore();
    }
  }, [inView, hasMore, loadMore]);

  if (!companies.length) {
    return (
      <Alert status='info' mt={4}>
        <AlertIcon />
        No companies found matching the current filters.
      </Alert>
    );
  }

  return (
    <Box>
      <Heading size="lg" mb={4} color="teal.600">
        Results ({totalResults} total) - Showing {companies.length}
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {companies.map(company => (
          <Card key={company.id} borderWidth="1px" borderRadius="lg" overflow="hidden" shadow="lg" _hover={{ shadow: 'xl' }}>

            <CardHeader pb={0}>
              <Heading size="md" color="blue.600">{company.name}</Heading>
            </CardHeader>

            <CardBody>
              <VStack align="start" spacing={2}>

                <Flex align="center">
                  <Icon as={FaIndustry} color="teal.500" mr={2} />
                  <Text fontSize="sm">
                    Industry: <Badge colorScheme="purple">{company.industry}</Badge>
                  </Text>
                </Flex>

                <Flex align="center">
                  <Icon as={FaMapMarkerAlt} color="red.400" mr={2} />
                  <Text fontSize="sm">
                    Location: {company.location}
                  </Text>
                </Flex>

                <Flex align="center">
                  <Icon as={FaUsers} color="orange.400" mr={2} />
                  <Text fontSize="sm">
                    Employees: {company.employees.toLocaleString()}
                  </Text>
                </Flex>

              </VStack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
      <Box ref={ref} py={10} textAlign="center">
        {hasMore ? (
          <Spinner size="lg" color="blue.500" />
        ) : (
          <Text color="gray.500" mt={4}>— End of results —</Text>
        )}
      </Box>
    </Box>
  );
};

export default CompanyList;