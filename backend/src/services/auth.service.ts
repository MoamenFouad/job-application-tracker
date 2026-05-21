// ده الـ service bta3 el auth - hena bteegy el business logic bta3et el auth
export const registerUser = async (email: string, password: string, name: string): Promise<void> => {
  // todo: hash password, create user in DB
};

export const loginUser = async (email: string, password: string): Promise<void> => {
  // todo: find user, compare password, return JWT
};
