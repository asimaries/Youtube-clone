

export default function useLocalStorage() {

  // get item(name): data and setItem(name, data) 
  const getLocalItem = (name: string) => {
    const data = localStorage.getItem(name)
    return data ? JSON.parse(data) : null;
  }
  const removeLocalItem = (name: string) => {
    localStorage.removeItem(name)
  }
  const setLocalItem = (name: string, data: any) => {
    return localStorage.setItem(name, JSON.stringify(data))
  }
  return { getLocalItem, setLocalItem, removeLocalItem }
}
