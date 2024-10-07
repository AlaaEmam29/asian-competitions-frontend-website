import { getCountries } from "@/services/countries";
import { usePaginationStore } from "@/stores/pagination";
import { useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useCallback } from "react";
import { useCategoryStore } from "@/stores/category";

const useCountriesList = () => {
  const queryClient = useQueryClient();
  const { selectedCategory } = useCategoryStore();
  const {
    currentPage,
    setHasPreviousPage,
    setHasNextPage,
    hasPreviousPage,
    hasNextPage,
  } = usePaginationStore();

  const {
    data,
    error,
    fetchNextPage,
    fetchPreviousPage,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    status,
    hasNextPage: queryHasNextPage,
    hasPreviousPage: queryHasPreviousPage,
  } = useInfiniteQuery({
    queryKey: ["countries", currentPage, selectedCategory],
    queryFn: async ({ pageParam = 1 }) => {
      const result = await getCountries({ page: pageParam });
      if (selectedCategory !== 0) {
        result.data = result.data.filter(
          (country: any) => country.continent_id === selectedCategory
        );
      }
      console.log(result, "result" , selectedCategory)
      return result;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination?.has_more
        ? lastPage.pagination.current_page + 1
        : undefined,
    getPreviousPageParam: (firstPage) =>
      firstPage.pagination?.current_page > 1
        ? firstPage.pagination.current_page - 1
        : undefined,
  });

  const handleEmptyData = useCallback(() => {
    if (data && data.pages[data.pages.length - 1].data.length === 0 && queryHasNextPage) {
      fetchNextPage(); 
    }
  }, [data, fetchNextPage, queryHasNextPage]);

  useEffect(() => {
    handleEmptyData();
  }, [handleEmptyData]);

  useEffect(() => {
    if (data) {
      const lastPage = data.pages[data.pages.length - 1];
      const firstPage = data.pages[0];

      if (lastPage.pagination?.has_more !== hasNextPage) {
        setHasNextPage(lastPage.pagination?.has_more || false);
      }

      if ((firstPage.pagination?.current_page > 1) !== hasPreviousPage) {
        setHasPreviousPage(firstPage.pagination?.current_page > 1 || false);
      }
    }
  }, [data, hasNextPage, hasPreviousPage, setHasNextPage, setHasPreviousPage]);

  return {
    data,
    error,
    fetchNextPage,
    fetchPreviousPage,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    status,
    hasNextPage: queryHasNextPage && hasNextPage,
    hasPreviousPage: queryHasPreviousPage && hasPreviousPage,
  };
};

export default useCountriesList;
