import React, { useEffect } from 'react';
import Text from '../atoms/Text';
import Box from '../atoms/Box';
import { useSupabase } from '@/context/SupabaseContext';
import SectionBalance from './SectionBalance';
import { formatRupiah } from '@/utility/helpers';

const SectionProfile: React.FC = () => {
  const supabase = useSupabase();

  useEffect(() => {
    supabase.getUser();
  }, []);

  return (
    <>
      <Box margin="10.32% 0 0" width="90.87%">
        <Text color="white" size="large">
          Hello, {supabase.user?.user_metadata.name}
        </Text>
      </Box>
      <SectionBalance
        balance={formatRupiah(supabase.user?.accumulated_balance || 0)}
      />
    </>
  );
};

export default SectionProfile;
