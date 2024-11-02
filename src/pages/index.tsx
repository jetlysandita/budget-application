import Flex from '@/components/atoms/Flex';
import IconHome from '@/components/atoms/IconHome';
import IconReport from '@/components/atoms/IconReport';
import Text from '@/components/atoms/Text';
import MobileLayout from '@/components/layouts/MobileLayout';
import SectionMyIncome from '@/components/organisms/SectionMyIncome';
import SectionProfile from '@/components/organisms/SectionProfile';
import SectionTransaction from '@/components/organisms/SectionTransaction';

export default function Index() {
  return (
    <MobileLayout
      backgroundImage="linear-gradient(#1A174D, #172B4D)"
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
      <SectionProfile />
      <SectionMyIncome />
      <SectionTransaction />
    </MobileLayout>
  );
}
