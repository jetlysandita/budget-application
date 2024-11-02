import React from 'react';
import Text from '../atoms/Text';
import Flex from '../atoms/Flex';

// Define the props interface
interface SectionBalanceProps {
  balance: string; // The balance prop as a string
}

const SectionBalance: React.FC<SectionBalanceProps> = ({ balance }) => {
  return (
    <Flex
      margin="10.32% 0 0"
      direction="column"
      width="90.87%"
      alignItems="center"
      gap="16px"
    >
      <Text color="white" size="small">
        Balance
      </Text>
      <Text color="white" size="large">
        {balance}
      </Text>
    </Flex>
  );
};

export default SectionBalance;
