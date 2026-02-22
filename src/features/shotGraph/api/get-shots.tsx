import { api } from '@/lib/api-client';
import type { Shot } from '@/types/shot';
import { useQuery } from '@tanstack/react-query';

export const getShots = async ({
  startDate,
  endDate,
}: {
  startDate?: Date;
  endDate?: Date;
}): Promise<{ shots: Shot[] }> => {
  if (!startDate || !endDate) {
    return api.get(`/shots/latest`);
  }

  return api.get(
    `/rounds/${startDate.toISOString()}/${endDate.toISOString()}`,
    {},
  );
};

export const useShots = (params: { startDate?: Date; endDate?: Date }) => {
  return useQuery({
    queryKey: ['shots', params.startDate, params.endDate],
    queryFn: () => getShots(params),
  });
};
