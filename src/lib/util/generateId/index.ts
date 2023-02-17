function generateId(): string {  
  if (!window?.crypto?.randomUUID) {
    return 'xxxx-xxxx-xxx-xxxx'.replace(/[x]/g, () => (
      Math.floor(Math.random() * 16).toString(16)
    ));
  }

  return crypto.randomUUID();
}

export default generateId;
