import Box from '@/components/atoms/Box';
import Flex from '@/components/atoms/Flex';
import IconHome from '@/components/atoms/IconHome';
import IconReport from '@/components/atoms/IconReport';
import Text from '@/components/atoms/Text';
import MobileLayout from '@/components/layouts/MobileLayout';
import SectionMyIncome from '@/components/organisms/SectionMyIncome';
import SectionTransaction from '@/components/organisms/SectionTransaction';

export default function Index() {
  return (
    <MobileLayout
      backgroundImage="linear-gradient(#281483, #8F6ED5,#D782D9)"
      footer={
        <Flex width="100%" justifyContent="space-evenly" height="100%">
          <Flex
            style={{ cursor: 'pointer' }}
            direction="column"
            alignItems="center"
            height="100%"
            justifyContent="center"
          >
            <IconHome fill="white" />
            <Text color="white">Home</Text>
          </Flex>
          <Flex
            direction="column"
            alignItems="center"
            height="100%"
            justifyContent="center"
            style={{ cursor: 'pointer' }}
          >
            <IconReport fill="white" />
            <Text color="white">Report</Text>
          </Flex>
        </Flex>
      }
    >
      <Box margin="10.32% 0 0" width="90.87%">
        <Text color="white" size="large">
          Hello, Jetly sandita
        </Text>
      </Box>
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
          Rp 15.000.000
        </Text>
      </Flex>
      <SectionMyIncome />
      <SectionTransaction />
    </MobileLayout>
  );
}
