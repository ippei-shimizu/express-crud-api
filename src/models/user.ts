export interface User {
  id: number;
  name: string;
  email: string;
}

export let users: User[] = [
  { id: 1, name: "鈴木一郎", email: "suzuki@example.com" },
  { id: 2, name: "田中花子", email: "tanaka@example.com" },
];

export const UserModel = {
  findAll: (): User[] => {
    return users;
  },

  findById: (id: number): User | undefined => {
    return users.find((user) => user.id === id);
  },

  create: (userData: Omit<User, "id">): User => {
    const newId =
      users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;

    const newUser: User = { id: newId, ...userData };
    users.push(newUser);
    return newUser;
  },

  update: (id: number, userData: Omit<User, "id">): User | undefined => {
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) return undefined;

    const updatedUser = { id, ...userData };
    users[index] = updatedUser;
    return updatedUser;
  },

  delete: (id: number): User | undefined => {
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) return undefined;

    const deletedUser = users[index];
    users.splice(index, 1);
    return deletedUser;
  },
};
