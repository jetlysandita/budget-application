import React from 'react';
import Flex from '../atoms/Flex';
import Text from '../atoms/Text';
import IconSetting from '../atoms/IconSetting';

const SectionMyIncome: React.FC = () => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    <Flex margin="16px 0 0" direction="column" width="90.87%" gap="16px">
      <Flex width="100%" justifyContent="space-between">
        <Text color="white" size="medium">
          My Income (2024)
        </Text>
        <IconSetting color="white" cursor="pointer" />
      </Flex>
      <div
        style={{
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          width: '100%',
          scrollBehavior: 'smooth',
        }}
      >
        <style jsx>{`
          /* Custom Scrollbar Styles */
          ::-webkit-scrollbar {
            height: 4px; /* Adjust height for horizontal scrollbar */
          }
          ::-webkit-scrollbar-thumb {
            background: #ccc; /* Color of the scrollbar thumb */
            border-radius: 4px; /* Rounded corners for the thumb */
          }
          ::-webkit-scrollbar-thumb:hover {
            background: #aaa; /* Darker color on hover */
          }
          ::-webkit-scrollbar-track {
            background: transparent; /* Background color of the track */
          }
        `}</style>
        <Flex width="max-content" gap="16px">
          {months.map((month, index) => (
            <div key={index}>
              <Flex
                width="200px"
                height="100px"
                backgroundColor="white"
                padding="10px"
                direction="column"
                gap="20px"
                style={{ cursor: 'pointer' }}
              >
                <Text size="small">{month}</Text>
                <Text size="large" textAlign="center" width="100%">
                  Rp 15.000.000
                </Text>
              </Flex>
            </div>
          ))}
        </Flex>
      </div>
    </Flex>
  );
};

export default SectionMyIncome;
