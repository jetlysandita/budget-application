import Box from '@/components/atoms/Box';
import Button from '@/components/atoms/Button';
import Flex from '@/components/atoms/Flex';
import Text from '@/components/atoms/Text';
import MobileLayout from '@/components/layouts/MobileLayout';
import FormLogin from '@/components/organisms/FormLogin';
import FormRegister from '@/components/organisms/FormRegister';
import { useState } from 'react';

export default function Auth() {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <MobileLayout backgroundImage="linear-gradient(#1A174D, #172B4D)">
      <Box margin="10.32% 0 0" width="90.87%">
        <Text color="white" size="large">
          Budget Application
        </Text>
      </Box>
      <Box
        backgroundColor="#FFFF"
        width="90.87%"
        margin="10.32% 0 0"
        height="625px"
      >
        <Text
          color="#8898AA"
          size="small"
          width="100%"
          textAlign="center"
          margin="31px 0 0 0"
        >
          Access Your Account
        </Text>
        <Flex justifyContent="center" gap="12px" margin="12px 0 0 0">
          <Button
            theme={isRegister ? 'secondary' : 'primary'}
            onClick={() => setIsRegister(false)}
          >
            Sign In
          </Button>
          <Button
            theme={!isRegister ? 'secondary' : 'primary'}
            onClick={() => setIsRegister(true)}
          >
            Sign Up
          </Button>
        </Flex>
        {isRegister ? <FormRegister /> : <FormLogin />}
      </Box>
    </MobileLayout>
  );
}
