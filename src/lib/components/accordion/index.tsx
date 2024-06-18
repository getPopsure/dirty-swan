import classnamesUtil from 'classnames';
import { ReactNode, useCallback, useState } from 'react';
import AnimateHeight from 'react-animate-height';

import styles from './style.module.scss';
import { ChevronDownIcon } from '../icon';
import { Card } from '../cards/card';
import { Markdown } from '../markdown';

export interface AccordionItem {
  id: string;
  question: string;
  icon?: ReactNode;
  answer: string;
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
};

const Accordion = ({
  items = [],
  classNames = {},
  variant = 'default',
  multiple = false,
  onClick,
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
          styles.wrapper,
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
                  'tc-grey-700'
                ),
                buttonWrapper: classnamesUtil(
                  classNames?.buttonWrapper,
                  styles.buttonWrapper,
                  { 'py8': isDefaultVariant, },
                ),
                wrapper: classnamesUtil(
                  classNames?.wrapper,
                  'bg-transparent br0',
                  { 'pl0': isDefaultVariant },
                ),
                title: classnamesUtil(
                  classNames?.question,
                  'tc-grey-700 fw-bold'
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
                  color="grey-700"
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
                  'tc-grey-600 p16 pl0', 
                  { 'pl16': !isDefaultVariant },
                )}
              >
                  {typeof answer === 'string' ? (
                    <Markdown className={classNames.markdown}>{answer}</Markdown>
                  ) : (
                    answer
                  )}
              </div>
            </AnimateHeight>
          </div>
        );
      })}
    </div>
  );
};

export { Accordion };