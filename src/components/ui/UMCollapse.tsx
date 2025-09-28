'use client';

import * as React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export type ItemProps = {
  key: string;
  label: string;
  children: React.ReactNode;
  isTaken?: boolean; // optional extra flag if needed
};

type UMCollapseProps = {
  items: ItemProps[];
  defaultActiveKey?: string[];
  onChange?: (openKeys: string[]) => void;
};

const UMCollapse: React.FC<UMCollapseProps> = ({ items, defaultActiveKey = [], onChange }) => {
  const [openItems, setOpenItems] = React.useState<string[] | undefined>(defaultActiveKey);

  const handleValueChange = (keys: string[]) => {
    setOpenItems(keys);
    if (onChange) {
      onChange(keys);
    }
  };

  return (
    <Accordion type='multiple' value={openItems} onValueChange={handleValueChange}>
      {items.map((item) => (
        <AccordionItem key={item.key} value={item.key}>
          <AccordionTrigger>{item.label}</AccordionTrigger>
          <AccordionContent>{item.children}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default UMCollapse;
