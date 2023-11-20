const isLoggedIn = () => {
    return !!localStorage.getItem('authToken');
  };
  
  export { isLoggedIn };
  