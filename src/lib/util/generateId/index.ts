function generateId(): string {
  if (typeof window !== "undefined" && window?.crypto?.getRandomValues) {
    return (
      `${[1e7]}-${1e3}-${4e3}-${8e3}-${1e11}`).replace(/[018]/g,
      (c: any) =>
        (((c ^ window.crypto.getRandomValues(new Uint8Array(1))[0]) & 15) >> c / 4).toString(16)
    );
  }

  return 'xxxx-xxxx-xxx-xxxx'.replace(/[x]/g, () => (
    Math.floor(Math.random() * 16).toString(16)
  ));
}

export default generateId;
