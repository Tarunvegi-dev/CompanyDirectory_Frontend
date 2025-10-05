import { Alert, AlertIcon, Box, Grid, GridItem, Heading, Spinner } from '@chakra-ui/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import companyData from '../assets/data.json';
import CompanyList from './CompanyList.jsx';
import FilterPanel from './FilterPanel.jsx';

const DirectoryContainer = () => {
  const [companies, setCompanies] = useState([]);
  const [filters, setFilters] = useState({ name: '', location: 'All', industry: 'All' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const ITEMS_PER_PAGE = 15;

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      try {
        setCompanies(companyData);
        setLoading(false);
      } catch (e) {
        setError("Failed to load company data.");
        setLoading(false);
      }
    }, 500);
  }, []);

  const { filteredCompanies, uniqueOptions } = useMemo(() => {
    const { name, location, industry } = filters;

    let currentList = companies;

    const filteredList = currentList.filter(company => {
      if (name && !company.name.toLowerCase().includes(name.toLowerCase())) {
        return false;
      }
      if (location !== 'All' && company.location !== location) {
        return false;
      }
      if (industry !== 'All' && company.industry !== industry) {
        return false;
      }
      return true;
    });

    const uniqueLocations = ['All', ...new Set(companyData.map(c => c.location))];
    const uniqueIndustries = ['All', ...new Set(companyData.map(c => c.industry))];

    const startIndex = 0;
    const endIndex = currentPage * ITEMS_PER_PAGE;
    const visibleCompanies = filteredList.slice(startIndex, endIndex);

    setHasMore(visibleCompanies.length < filteredList.length);

    return {
      filteredCompanies: visibleCompanies,
      uniqueOptions: { locations: uniqueLocations, industries: uniqueIndustries },
      totalFiltered: filteredList.length
    };
  }, [companies, filters, currentPage]);

  const updateFilter = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const loadMore = useCallback(() => {
    if (hasMore) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  }, [hasMore]);

  if (error) {
    return (
      <Alert status='error' m={4}><AlertIcon />Error: {error}</Alert>
    );
  }

  if (loading) {
    return (
      <Box textAlign="center" py={10}>
        <Spinner size="xl" color="teal.500" thickness="4px" />
        <Heading size="md" mt={4}>Loading Company Data... ⏳</Heading>
      </Box>
    );
  }

  return (
    <Grid
      templateColumns={{ base: '1fr', md: '250px 1fr' }}
      gap={6}
      p={5}
      maxW="6xl"
      mx="auto"
    >

      <GridItem>
        <FilterPanel
          filters={filters}
          updateFilter={updateFilter}
          uniqueOptions={uniqueOptions}
        />
      </GridItem>

      <GridItem>
        <CompanyList
          companies={filteredCompanies}
          loadMore={loadMore}
          hasMore={hasMore}
          totalResults={filteredCompanies.length}
        />
      </GridItem>
    </Grid>
  );
};

export default DirectoryContainer;