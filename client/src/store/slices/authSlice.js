

const createAuthSlice = (set) => ({
  userInfo: null,
  setUserInfo: (userInfo) => set({ userInfo }),
});

export default createAuthSlice;
