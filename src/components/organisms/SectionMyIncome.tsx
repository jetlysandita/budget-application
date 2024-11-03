import React, { useEffect, useState } from 'react';
import Flex from '../atoms/Flex';
import Text from '../atoms/Text';
import IconSetting from '../atoms/IconSetting';
import { useSupabase } from '@/context/SupabaseContext';
import { formatRupiah } from '@/utility/helpers';
import Modal from '../atoms/Modal';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

interface SelectedIncome {
  id: number;
  income: number;
  month: number;
  monthName: string;
}
const SectionMyIncome: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState<number>(currentYear);
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [isShowConfig, setIsShowConfig] = useState<boolean>(false);
  const [selectedIncome, setSelectedIncome] = useState<SelectedIncome | null>(
    null,
  );
  const supabase = useSupabase();

  useEffect(() => {
    if (selectedYear) {
      supabase.getMonthlyIncome(year);
    }
  }, [selectedYear]);

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
          My Income ({selectedYear})
        </Text>
        <IconSetting
          color="white"
          cursor="pointer"
          onClick={() => setIsShowConfig(true)}
        />
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
            <div
              key={index}
              onClick={() => {
                const montlyIncome = supabase.monthlyIncome[index];
                setSelectedIncome({
                  id: montlyIncome.id,
                  income: montlyIncome.income,
                  month: index + 1,
                  monthName: month,
                });
              }}
            >
              <Flex
                width="200px"
                height="100px"
                backgroundColor="linear-gradient(#A4C8E1, #6B9ACB)"
                padding="10px"
                direction="column"
                gap="20px"
                style={{ cursor: 'pointer', borderRadius: 5 }}
              >
                <Text size="small" color="#101820">
                  {month}
                </Text>
                <Text
                  size="large"
                  textAlign="center"
                  width="100%"
                  color="#101820"
                >
                  {formatRupiah(supabase.monthlyIncome[index].income || 0)}
                </Text>
              </Flex>
            </div>
          ))}
        </Flex>
      </div>
      <Modal
        title={`Change Year`}
        isOpen={isShowConfig}
        onClose={() => {
          setIsShowConfig(false);
          setSelectedYear(year);
        }}
      >
        <Input
          type="number"
          value={year.toString()}
          onChange={(e) => setYear(e.target.valueAsNumber)}
        />
        <Button
          onClick={() => {
            setIsShowConfig(false);
            setSelectedYear(year);
          }}
        >
          Submit
        </Button>
      </Modal>
      {selectedIncome !== null && (
        <Modal
          title={`Update Income ${selectedIncome?.monthName}`}
          isOpen={selectedIncome !== null}
          onClose={() => {
            if (supabase.user?.id) {
              supabase.upsertMonthlyIncome({
                id: selectedIncome.id,
                month: selectedIncome.month,
                income: selectedIncome.income,
                user_id: supabase.user.id,
                year: selectedYear,
              });
            }
            setSelectedIncome(null);
          }}
        >
          <Input
            type="number"
            value={selectedIncome?.income.toString()}
            onChange={(e) =>
              setSelectedIncome(() => {
                return {
                  id: selectedIncome.id,
                  income: e.target.valueAsNumber,
                  month: selectedIncome.month,
                  monthName: selectedIncome.monthName,
                };
              })
            }
          />
          <Button
            onClick={() => {
              if (supabase.user?.id) {
                supabase.upsertMonthlyIncome({
                  id: selectedIncome.id,
                  month: selectedIncome.month,
                  income: selectedIncome.income,
                  user_id: supabase.user.id,
                  year: selectedYear,
                });
              }
            }}
          >
            Submit
          </Button>
        </Modal>
      )}
    </Flex>
  );
};

export default SectionMyIncome;
