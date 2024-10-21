import React, { ReactNode } from 'react';

// Props for the Dialog component
interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

// Dialog component
export const Dialog: React.FC<DialogProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="dialog-overlay fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="dialog-content bg-white p-6 rounded-md shadow-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200 focus:outline-none"
        >
          ✖
        </button>
        {children}
      </div>
    </div>
  );
};

// DialogTrigger component for opening the dialog
export const DialogTrigger: React.FC<{ children: ReactNode; onClick: () => void }> = ({ children, onClick }) => (
  <button onClick={onClick} className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
    {children}
  </button>
);

// DialogContent component to wrap content inside the dialog
export const DialogContent: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div className="dialog-content">{children}</div>
);

// DialogHeader component for the dialog header
export const DialogHeader: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div className="dialog-header mb-4">{children}</div>
);

// DialogTitle component for the dialog title
export const DialogTitle: React.FC<{ children: ReactNode }> = ({ children }) => (
  <h2 className="dialog-title text-lg font-bold">{children}</h2>
);

// DialogDescription component for additional description text
export const DialogDescription: React.FC<{ children: ReactNode }> = ({ children }) => (
  <p className="dialog-description text-sm text-gray-600">{children}</p>
);

// DialogFooter component for action buttons in the dialog
export const DialogFooter: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div className="dialog-footer mt-4 flex justify-end space-x-2">{children}</div>
);
