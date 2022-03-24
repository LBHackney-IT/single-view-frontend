export interface CreateProcess {
  targetID: string;
  relatedEntities: string[];
  formData: object;
  documents: string[];
}

export interface UpdateProcess {
  formData: object;
  documents: string[];
}

export interface Process {
  id: string;
  targetId: string;
  relatedEntities: string[];
  formData: object;
  documents: string[];
  processName: string;
  currentState: ProcessState;
  previousStates: ProcessState[];
  etag?: string;
}

export interface ProcessState {
  state: string;
  permittedTriggers: string[];
  assignment: string;
  processData: {
    formData: object;
    documents: string[];
  };
  createdAt: string;
  updatedAt: string;
}
