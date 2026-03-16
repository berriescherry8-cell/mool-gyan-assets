
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type UploadStatus = 'uploading' | 'completed' | 'error';

interface Upload {
  id: string;
  fileName: string;
  progress: number;
  status: UploadStatus;
}

interface UploadsState {
  [key: string]: Upload;
}

interface UploadContextType {
  uploads: UploadsState;
  addUpload: (id: string, fileName: string) => void;
  updateUploadProgress: (id: string, progress: number) => void;
  finishUpload: (id: string, status: 'completed' | 'error') => void;
  clearUpload: (id: string) => void;
}

const UploadContext = createContext<UploadContextType | undefined>(undefined);

export function UploadProvider({ children }: { children: ReactNode }) {
  const [uploads, setUploads] = useState<UploadsState>({});

  const addUpload = (id: string, fileName: string) => {
    setUploads(prev => ({
      ...prev,
      [id]: { id, fileName, progress: 0, status: 'uploading' },
    }));
  };
  
  const updateUploadProgress = (id: string, progress: number) => {
    setUploads(prev => {
      if (!prev[id]) return prev;
      return {
        ...prev,
        [id]: { ...prev[id], progress },
      };
    });
  };

  const finishUpload = (id: string, status: 'completed' | 'error') => {
    setUploads(prev => {
      if (!prev[id]) return prev;
      return {
        ...prev,
        [id]: { ...prev[id], status, progress: status === 'completed' ? 100 : prev[id].progress },
      };
    });
    
    // Automatically clear successful uploads after a delay
    if (status === 'completed') {
        setTimeout(() => {
            clearUpload(id);
        }, 5000);
    }
  };

  const clearUpload = (id: string) => {
    setUploads(prev => {
        const newUploads = {...prev};
        delete newUploads[id];
        return newUploads;
    });
  }

  return (
    <UploadContext.Provider value={{ uploads, addUpload, updateUploadProgress, finishUpload, clearUpload }}>
      {children}
    </UploadContext.Provider>
  );
}

export function useUpload() {
  const context = useContext(UploadContext);
  if (context === undefined) {
    throw new Error('useUpload must be used within an UploadProvider');
  }
  return context;
}
