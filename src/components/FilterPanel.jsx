import { Box, FormControl, FormLabel, Heading, Input, Select, VStack } from '@chakra-ui/react';

const FilterPanel = ({ filters, updateFilter, uniqueOptions }) => {
  
  const handleInputChange = (e) => {
    updateFilter('name', e.target.value);
  };

  const handleDropdownChange = (e) => {
    updateFilter(e.target.name, e.target.value);
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" bg="white" shadow="md" position={{ md: 'sticky' }} top="4">
      <Heading size="md" mb={4} color="gray.700">🔍 Filter Options</Heading>
      
      <VStack spacing={4} align="stretch">
        
        <FormControl>
          <FormLabel>Search by Name</FormLabel>
          <Input
            placeholder="e.g., Global Logistics"
            value={filters.name}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Filter by Location</FormLabel>
          <Select
            name="location"
            value={filters.location}
            onChange={handleDropdownChange}
          >
            {uniqueOptions.locations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Filter by Industry</FormLabel>
          <Select
            name="industry"
            value={filters.industry}
            onChange={handleDropdownChange}
          >
            {uniqueOptions.industries.map(ind => (
              <option key={ind} value={ind}>{ind}</option>
            ))}
          </Select>
        </FormControl>
        
      </VStack>
    </Box>
  );
};

export default FilterPanel;