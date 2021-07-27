export function getLocal() {
  try {
    const contacts = localStorage.getItem('contacts');
    return contacts ? JSON.parse(contacts) : null;
  } catch (error) {
    throw new Error();
  }
}

export function setLocal(contacts) {
  try {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  } catch (error) {
    throw new Error();
  }
}
