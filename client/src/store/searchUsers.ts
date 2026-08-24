import { create } from "zustand";

type User = {
    id: number,
    fullName: string,
    email: string,
    imageUrl: string | null
}

type SearchUser = {
    searchUsers: User[],
    setSearchUsers: (users: User[]) => void;
}

type SelectedUser = {
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
};

interface ChatUserStore {
  users: User[];
  setUsers: (users: User[]) => void;
  addOrMoveUser: (user: User) => void;
  removeUser: (userId: number) => void
}

export const useSearchUser = create<SearchUser>((set) => ({
    searchUsers: [],
    setSearchUsers: (searchUsers) => set({searchUsers})
}))

export const useSelectedUser = create<SelectedUser>((set) => ({
  selectedUser: null,
  setSelectedUser: (user) => set({ selectedUser: user }),
}));

export const useChatUsers = create<ChatUserStore>((set) => ({
  users: [],

  setUsers: (users) => {set({ users });},

  addOrMoveUser: (user) => {
    set((state) => ({
      users: [
        user,
        ...state.users.filter((u) => u.id !== user.id),
      ],
    }));
  },
  removeUser: (userId) => {
    set((state) => ({
      users: state.users.filter((u) => u.id !== userId)
    }))
  }
}));