'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface UMModalProps {
  isOpen: boolean;
  closeModal: () => void;
  title: string | React.ReactNode;
  children: React.ReactNode;
  handleOk?: () => void;
  showCancelButton?: boolean;
  showOkButton?: boolean;
  okText?: string;
  cancelText?: string;
}

const UMModal: React.FC<UMModalProps> = ({
  isOpen,
  closeModal,
  title,
  children,
  showCancelButton = true,
  showOkButton = true,
  okText = 'Ok',
  cancelText = 'Cancel',
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {/* Optional description, remove if not needed */}
          {/* <DialogDescription>Optional description here</DialogDescription> */}
        </DialogHeader>

        <div className='mt-2'>{children}</div>

        {(showCancelButton || showOkButton) && (
          <DialogFooter className='mt-4 flex justify-end gap-2'>
            {showCancelButton && (
              <Button variant='outline' onClick={closeModal}>
                {cancelText}
              </Button>
            )}
            {showOkButton && (
              <Button
                onClick={() => {
                  closeModal();
                }}
              >
                {okText}
              </Button>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UMModal;
