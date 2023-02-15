function generateId(): string {  
  return 'xxxx-xxxx-xxx-xxxx'.replace(/[x]/g, () => (
    Math.floor(Math.random() * 16).toString(16)
  ));  
}

export default generateId;
