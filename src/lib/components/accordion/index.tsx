import classnamesUtil from 'classnames';
import { ReactNode, useCallback, useState } from 'react';
import AnimateHeight from 'react-animate-height';

import styles from './style.module.scss';
import { ChevronDownIcon } from '../icon';
import { Card } from '../cards/card';

export interface AccordionItem {
  id: string;
  question: string;
  icon?: ReactNode;
  answer: ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  classNames?: {
    questionWrapper?: string;
    buttonWrapper?: string;
    wrapper?: string;
    question?: string;
    answer?: string;
    icon?: string;
    markdown?: string;
  };
  multiple?: boolean;
  onClick?: (item: AccordionItem) => void;
  variant?: 'default' | 'bordered';
  renderAnswer?: (answer: ReactNode) => ReactNode;
};

const Accordion = ({
  items = [],
  classNames = {},
  variant = 'default',
  multiple = false,
  onClick,
  renderAnswer,
}: AccordionProps) => {
  const [selectedQuestionId, setSelectedQuestionId] = useState<(string[])>([]);
  const isDefaultVariant = variant === 'default';

  const handleClick = useCallback((questionData:  AccordionItem) => {
    const { id } = questionData;
    if (selectedQuestionId.includes(id)) {
      if (!multiple) {
        setSelectedQuestionId([]);
        return
      }

      setSelectedQuestionId((selectedItems) => 
        selectedItems.filter((selectedId) => selectedId !== id)
      );
    } else {
      onClick?.(questionData);
      setSelectedQuestionId((selectedIds) => [
        id, ...multiple ? selectedIds : [],
      ]);
    }
  }, [multiple, onClick, selectedQuestionId]);

  return (
    <div
      className={
        classnamesUtil(
          {
            'br8': !isDefaultVariant,
            [styles.wrapperBordered]: !isDefaultVariant,
          }
        )
      }
    >
      {items.map((questionData) => {
        const { question, answer, id, icon } = questionData;
        const isOpen = selectedQuestionId.includes(id);

        return (
          <div
            key={id}
            className={classnamesUtil(
              classNames?.questionWrapper,
              styles.container,
              { [styles.containerBordered]: !isDefaultVariant }
            )}
          >
            <Card
              title={question}
              titleVariant="small"
              density='compact'
              icon={icon}
              classNames={{
                icon: classnamesUtil(
                  classNames?.icon,
                  styles.icon,
                  'tc-neutral-800',
                ),
                buttonWrapper: classnamesUtil(
                  'py8 my8',
                  classNames?.buttonWrapper,
                  styles.buttonWrapper, {
                    [styles.buttonWrapperDefault]: isDefaultVariant,
                  },
                ),
                wrapper: classnamesUtil(
                  classNames?.wrapper,
                'bg-transparent br0 py0',
                  { 'pl0': isDefaultVariant },
                ),
                title: classnamesUtil(
                  classNames?.question,
                  styles.question,
                  { [styles.questionOpen]: isOpen }
                ),
                ...classNames,
              }}
              dropShadow={false}
              onClick={() => handleClick(questionData)}
              aria-expanded={isOpen}
              actionIcon={
                <ChevronDownIcon
                  className={classnamesUtil(styles.chevron, {
                    [styles.chevronOpen]: isOpen
                  })}
                  size={20}
                  noMargin
                />
              }
            />

            <AnimateHeight
              duration={300}
              height={isOpen ? 'auto' : 0}
            >
              <div 
                className={classnamesUtil(
                  classNames?.answer,
                  'tc-neutral-700 pr16 pb24', 
                  { 
                    'pl16': !isDefaultVariant,
                    [styles?.answerIcon]: !isDefaultVariant && icon,
                    [styles?.answerIconDefault]: isDefaultVariant && icon,
                  },
                )}
              >
                  {renderAnswer ? renderAnswer(answer) : answer}
              </div>
            </AnimateHeight>
          </div>
        );
      })}
    </div>
  );
};

export { Accordion };