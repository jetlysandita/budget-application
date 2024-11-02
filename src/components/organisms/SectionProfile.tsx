import React, { useEffect } from 'react';
import Text from '../atoms/Text';
import { useSupabase } from '@/context/SupabaseContext';
import SectionBalance from './SectionBalance';
import { formatRupiah } from '@/utility/helpers';
import Flex from '../atoms/Flex';
import IconLogout from '../atoms/IconLogout';

const SectionProfile: React.FC = () => {
  const supabase = useSupabase();

  useEffect(() => {
    supabase.getUser();
  }, []);

  return (
    <>
      <Flex margin="10.32% 0 0" width="90.87%" justifyContent="space-between">
        <Text color="white" size="large">
          Hello, {supabase.user?.user_metadata.name || 'Member'}
        </Text>
        <IconLogout
          color="white"
          cursor="pointer"
          onClick={() => supabase.signOut()}
        />
      </Flex>
      <SectionBalance
        balance={formatRupiah(supabase.user?.accumulated_balance || 0)}
      />
    </>
  );
};

export default SectionProfile;
