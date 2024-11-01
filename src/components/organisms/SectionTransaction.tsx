import React from 'react';
import Flex from '../atoms/Flex';
import Text from '../atoms/Text';
import IconAdd from '../atoms/IconAdd';

const SectionTransaction: React.FC = () => {
  return (
    <Flex
      margin="20px 0 0"
      direction="column"
      width="90.87%"
      gap="16px"
      height="53vh"
    >
      <Flex width="100%" justifyContent="space-between">
        <Text color="white" size="medium">
          Transactions
        </Text>
        <IconAdd color="white" cursor="pointer" />
      </Flex>
      <div
        style={{
          overflowY: 'auto',
          whiteSpace: 'nowrap',
          height: '100%',
          scrollBehavior: 'smooth',
          width: '100%',
        }}
      >
        <style jsx>{`
          /* Custom Scrollbar Styles */
          ::-webkit-scrollbar {
            width: 4px; /* Adjust height for horizontal scrollbar */
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
        <Flex gap="16px" direction="column" height="100%" width="100%">
          {[].map((_, index) => (
            <div
              key={index}
              style={{
                width: '100%',
                display: 'flex',
                background: 'white',
                alignItems: 'center',
                padding: '10px',
              }}
            >
              <Flex
                width="100%"
                direction="column"
                gap="5px"
                style={{ cursor: 'pointer' }}
              >
                <Text size="medium">LRT Ticket</Text>
                <Text size="small" width="100%" color="#8898AA">
                  Essentials
                </Text>
              </Flex>
              <Flex direction="column" gap="5px" style={{ cursor: 'pointer' }}>
                <Text color="red" textAlign="right">
                  - Rp 20.000
                </Text>
                <Text
                  size="small"
                  width="100%"
                  textAlign="right"
                  color="#8898AA"
                >
                  29 okt 2024
                </Text>
              </Flex>
            </div>
          ))}
        </Flex>
      </div>
    </Flex>
  );
};

export default SectionTransaction;
